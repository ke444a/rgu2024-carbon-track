interface IEmployeeData {
    name: string;
    pollution: number;
    pollution_score: number;
    location: string;
}

interface IOfficeData {
    total_electricity_consumed: number;
    total_gas_consumed: number;
    total_electricity_paid: number;
    total_gas_paid: number;
    total_consumption_per_sqft: number;
    total_employee_wasted: number;
    total_area: number;
    total_employees: number;
    cons_per_employee: number;
    cons_per_sqft_score: number;
    bills: IBill[];
}

interface IBill {
    date: string;
    electricity_cons: number;
    gas_cons: number;
    electricity_cost: number;
    gas_cost: number;
}

interface ICarData {
    date: string;
    car: string;
    miles_per_gallon: number;
    distance: number;
    fuel_type: string;
    emission_val: number;
}

interface IFlightData {
    date: string;
    duration: number;
    employees_num: number;
    emission_val: number;
    distance: number;
}

interface ITrainData {
    date: string;
    duration: number;
    employees_num: number;
    emission_val: number;
    distance: number;
}

interface ITravelData {
    car_data: ICarData[];
    flight_data: IFlightData[];
    train_data: ITrainData[];
    total_emission_car: number;
    total_emission_flight: number;
    total_emission_train: number;
}
