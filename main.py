from typing import Annotated
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from io import StringIO
import googlemaps
from dotenv import load_dotenv
import os

app = FastAPI()
load_dotenv()

gmaps = googlemaps.Client(key=os.getenv('GOOGLE_MAPS_API_KEY'))

WALKING_CO2_PER_METER = 0
TRANSIT_CO2_PER_METER = 0.08
DRIVE_CO2_PER_METER = 0.164
PASSENGES_NUMBER = 30

CO2_PER_EMPLOYEE_PER_YEAR = 181
THRESHOLD_CONS_PER_SQFT = 60
GALLON_TO_LITRE = 4.546

DIESEL_CO2_PER_LITRE = 2.7
PETROL_CO2_PER_LITRE = 2.3

SHORT_FLIGHT_AVERAGE_CO2 = 0.22
MEDIUM_FLIGHT_AVERAGE_CO2 = 0.16

TRAIN_C02_PER_KM = 0.04


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def assign_grade_to_commute(emission_value: float) -> int:
    if emission_value / 60 <= 492:
        return 1
    elif 493 <= emission_value / 60 <= 1300:
        return 2
    elif 1301 <= emission_value / 60 <= 3200:
        return 3
    else:
        return 4


def calculate_transit_info(location1, location2):
    transit_directions = gmaps.directions(
        origin=location1,
        destination=location2,
        mode="transit"
    )

    if transit_directions:
        transit_legs = transit_directions[0]["legs"][0]
        transit_duration_seconds = transit_legs["duration"]["value"]
        return transit_duration_seconds
    else:
        return 0


def calculate_emission_for_travel(origin, destination, mode):
    directions = gmaps.directions(origin=origin, destination=destination, mode=mode)
    if directions:
        distance = directions[0]["legs"][0]["distance"]["value"]
        if mode == "walking":
            return 0
        elif mode == "transit":
            return distance * TRANSIT_CO2_PER_METER* 60 / PASSENGES_NUMBER
        else:
            return distance * DRIVE_CO2_PER_METER * 60
    else:
        return -1

def calculate_pollution_score(origin, destination, mode):
    emission_val = calculate_emission_for_travel(origin, destination, mode)
    return assign_grade_to_commute(emission_val)

def calculate_distance_between(location1, location2):
    directions = gmaps.directions(origin=location1, destination=location2, mode="driving")
    if directions:
        distance = directions[0]["legs"][0]["distance"]["value"]
        return distance
    else:
        return float('inf')


@app.post("/api/employees/")
async def upload_employee_travel_data(file: Annotated[UploadFile, Form()]):
    df = pd.read_csv(StringIO(file.file.read().decode('utf-8')))
    name_location_dict = df.to_dict(orient='records')
    name_pollution = []
    origin_name = "29 Albyn Pl, Aberdeen AB10 1YL"
    for record in name_location_dict:
        # distance = gmaps.directions(origin=origin_name, destination=record['Location'], mode="driving")
        emission_val = 0
        if record["Mode of Transport"] == "car":
            directions = gmaps.directions(origin=origin_name, destination=record['Location'], mode="driving")
            distance = directions[0]["legs"][0]["distance"]["value"]
            emission_val = calculate_emission_for_travel(origin_name, record['Location'], "driving")
        elif record["Mode of Transport"] == "bus":
            directions = gmaps.directions(origin=origin_name, destination=record['Location'], mode="transit")
            distance = directions[0]["legs"][0]["distance"]["value"]
            emission_val = calculate_emission_for_travel(origin_name, record["Location"], "transit")

        name_pollution.append(
            {
                "name": record["Name"],
                "location": record["Location"],
                "mode": record["Mode of Transport"],
                "emission_val": emission_val,
                "pollution_score": assign_grade_to_commute(emission_val),
            }
        )

    # Filter out the records with score less than or equal to 2
    name_pollution_filtered = [record for record in name_pollution if record['pollution_score'] > 2]
    distances = []
    transit_infos = []
    for record1, record2 in zip(name_pollution_filtered, name_pollution_filtered[1:]):
        print(record1, record2)
        distance = calculate_distance_between(record1['location'], record2['location'])
        transit_info = calculate_transit_info(record1['location'], record2['location'])
        if distance < 2000:
            distances.append((record1['name'], record2['name'], distance))
            transit_infos.append((record1['name'], record2['name'], transit_info))

    carpool_matches = [match for match in distances if match[2] < 2000]
    transit_matches = [match for match in transit_infos if match[2] < 1800]

    suggestions_carpool = []
    for match in carpool_matches:
        suggestions_carpool.append(
            {
                "name1": match[0],
                "name2": match[1],
                "distance": match[2],
            }
        )

    suggestions_transit = []
    for match in transit_matches:
        suggestions_transit.append(
            {
                "name1": match[0],
                "name2": match[1],
                "transit_time": match[2],
            }
        )

    content = {
        "suggestions_carpool": suggestions_carpool,
        "suggestions_transit": suggestions_transit,
        "pollution_data": name_pollution,
    }
    content_json = jsonable_encoder(content)
    return JSONResponse(content=content_json, status_code=200)
        
    # content_json = jsonable_encoder(name_pollution)
    # return JSONResponse(content=content_json, status_code=200)


@app.post("/api/office/")
async def upload_office_data(
    file: Annotated[UploadFile, Form()],
    total_area: Annotated[int, Form()],
    total_employees: Annotated[int, Form()],
):
    df = pd.read_csv(StringIO(file.file.read().decode('utf-8')))
    bill_dict = df.to_dict(orient='records')
    bill_data = [{
        "date": record['Month'],
        "electricity_cons": record['Electricity Consumption'],
        "gas_cons": record['Gas Consumption '],
        "electricity_cost": record['Electricity Cost'],
        "gas_cost": record['Gas Cost']
    } for record in bill_dict]

    total_electricity_consumed = sum([record['Electricity Consumption'] for record in bill_dict])
    total_gas_consumed = sum([record['Gas Consumption '] for record in bill_dict])
    total_electricity_paid = sum([record['Electricity Cost'] for record in bill_dict])
    total_gas_paid = sum([record['Gas Cost'] for record in bill_dict])

    total_employee_wasted = total_employees * CO2_PER_EMPLOYEE_PER_YEAR
    total_consumption_per_sqft = (total_electricity_consumed + total_gas_consumed) / total_area
    cons_per_sqft_score = round(total_consumption_per_sqft / THRESHOLD_CONS_PER_SQFT * 5, 1)

    office_data = {
        "total_electricity_consumed": total_electricity_consumed,
        "total_gas_consumed": total_gas_consumed,
        "total_electricity_paid": total_electricity_paid,
        "total_gas_paid": total_gas_paid,
        "total_consumption_per_sqft": total_consumption_per_sqft,
        "total_employee_wasted": total_employee_wasted,
        "total_area": total_area,
        "total_employees": total_employees,
        "cons_per_employee": (total_electricity_consumed + total_gas_consumed) / total_employees,
        "cons_per_sqft_score": cons_per_sqft_score,
        "bills": bill_data,
    }

    office_data_json = jsonable_encoder(office_data)
    return JSONResponse(content=office_data_json, status_code=200)


@app.post("/api/travel/")
async def upload_travel_data(
    car_file: Annotated[UploadFile, Form()],
    flight_file: Annotated[UploadFile, Form()],
    train_file: Annotated[UploadFile, Form()],
):
    car_df = pd.read_csv(StringIO(car_file.file.read().decode('utf-8')))
    flight_df = pd.read_csv(StringIO(flight_file.file.read().decode('utf-8')))
    train_df = pd.read_csv(StringIO(train_file.file.read().decode('utf-8')))
    car_dict = car_df.to_dict(orient='records')
    flight_dict = flight_df.to_dict(orient='records')
    train_dict = train_df.to_dict(orient='records')

    car_data = []
    for record in car_dict:
        directions = gmaps.directions(origin=record['Origin'], destination=record['Destination'], mode="driving")
        distance = directions[0]["legs"][0]["distance"]["value"] / 1000
        emission_coeff = DIESEL_CO2_PER_LITRE if record['Fuel Type'] == "Diesel" else PETROL_CO2_PER_LITRE
        emission_val = distance / record['Mpg'] * GALLON_TO_LITRE * emission_coeff
        car_data.append(
            {
                "date": record['Date'],
                "car": record['Brand'],
                "origin": record['Origin'],
                "destination": record['Destination'],
                "miles_per_gallon": record['Mpg'],
                "fuel_type": record['Fuel Type'],
                "distance": distance,
                "emission_val": emission_val,
            }
        )

    flight_data = []
    for record in flight_dict:
        distance = record['Distance ']
        emission_coeff = SHORT_FLIGHT_AVERAGE_CO2 * distance if record['Duration (mins)'] <= 90 else MEDIUM_FLIGHT_AVERAGE_CO2 * distance

        flight_data.append({
            "date": record['Date'],
            "duration": record['Duration (mins)'],
            "distance": distance,
            "employees_num": record['Number Of Employees'],
            "emission_val": emission_coeff * record['Number Of Employees']
        })

    train_data = []
    for record in train_dict:        
        train_data.append({
            "date": record['Date'],
            "duration": record['Duration (mins)'],
            "distance": record['Distance '],
            "employees_num": record['Number of Employees'],
            "emission_val": TRAIN_C02_PER_KM * record['Distance '] * record['Number of Employees']
        })

    travel_data = {
        "car_data": car_data,
        "flight_data": flight_data,
        "train_data": train_data,
        "total_emission_car": sum([record['emission_val'] for record in car_data]),
        "total_emission_flight": sum([record['emission_val'] for record in flight_data]),
        "total_emission_train": sum([record['emission_val'] for record in train_data]),
    }
    travel_data_json = jsonable_encoder(travel_data)
    return JSONResponse(content=travel_data_json, status_code=200)
