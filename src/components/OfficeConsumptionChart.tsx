import { Line } from "react-chartjs-2";

type Props = {
    bills: IBill[] | undefined;
}

const OfficeConsumptionChart = ({ bills }: Props) => {
    if (!bills) {
        return null;
    }

    return (
        <>
            <Line
                className="mb-10"
                datasetIdKey="consumption"
                data={{
                    labels: bills.map((bill) => bill.date),
                    datasets: [
                        {
                            label: "Electricity Consumption",
                            data: bills.map((bill) => bill.electricity_cons),
                            borderColor: "rgba(0, 123, 255, 1)",
                            backgroundColor: "rgba(0, 123, 255, 0.1)",
                        },
                        {
                            label: "Gas Consumption",
                            data: bills.map((bill) => bill.gas_cons),
                            borderColor: "rgba(255, 193, 7, 1)",
                            backgroundColor: "rgba(255, 193, 7, 0.1)",
                        },
                    ],
                }}
            />
            <Line
                datasetIdKey="cost"
                data={{
                    labels: bills.map((bill) => bill.date),
                    datasets: [
                        {
                            label: "Electricity Cost",
                            data: bills.map((bill) => bill.electricity_cost),
                            borderColor: "rgba(0, 123, 255, 1)",
                            backgroundColor: "rgba(0, 123, 255, 0.1)",
                        },
                        {
                            label: "Gas Cost",
                            data: bills.map((bill) => bill.gas_cost),
                            borderColor: "rgba(255, 193, 7, 1)",
                            backgroundColor: "rgba(255, 193, 7, 0.1)",
                        },
                    ],
                }}
            />
        </>
    );
};

export default OfficeConsumptionChart;