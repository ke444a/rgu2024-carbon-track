import { Bar, Line } from "react-chartjs-2";

const TravelBarChart = ({ travelData }: { travelData: ITravelData | undefined }) => {
    if (!travelData) {
        return null;
    }

    const carData = travelData.car_data.reduce((acc, car) => {
        if (!acc[car.car]) {
            acc[car.car] = 0;
        }
        acc[car.car] += car.emission_val;
        return acc;
    }, {} as Record<string, number>);

    // Create object with the emission values and the distance for each flight, sorted by distance
    const flightData = travelData.flight_data.reduce((acc, flight) => {
        acc[flight.distance] = flight.emission_val / flight.employees_num;
        return acc;
    }, {} as Record<number, number>);
    Object.keys(flightData).sort((a, b) => Number(a) - Number(b));
    
    const trainData = travelData.train_data.reduce((acc, train) => {
        acc[train.distance] = train.emission_val / train.employees_num;
        return acc;
    }, {} as Record<number, number>);
    Object.keys(trainData).sort((a, b) => Number(a) - Number(b));

    return (
        <>
            <Bar
                datasetIdKey="car_model_emission"
                className="mb-8 max-w-lg"
                data={{
                    labels: Object.keys(carData),
                    datasets: [
                        {
                            label: "Car Emissions",
                            data: Object.values(carData),
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                        },
                    ],
                }}
            />
            <Line
                className="mb-8 max-w-lg"
                data={{
                    labels: Object.keys(flightData),
                    datasets: [
                        {
                            label: "Flight Emissions Per Employee",
                            data: Object.values(flightData),
                            backgroundColor: "rgba(255, 206, 86, 0.2)",
                            borderColor: "rgba(255, 206, 86, 1)",
                            borderWidth: 1,
                        },
                    ],
                }}
            />
            <Line
                className="mb-8 max-w-lg"
                data={{
                    labels: Object.keys(trainData),
                    datasets: [
                        {
                            label: "Train Emissions Per Employee",
                            data: Object.values(trainData),
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                        },
                    ],
                }}
            />
        </>
    );
};

export default TravelBarChart;