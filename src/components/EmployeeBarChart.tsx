import { Bar } from "react-chartjs-2";
import { processBgColor } from "../utils/processBgColor";
import { processBorderColor } from "../utils/processBorderColor";

const EmployeeBarChart = ({ chartData }: { chartData: IEmployeeData[] }) => {
    if (chartData.length === 0) {
        return null;
    }

    return (
        <Bar 
            datasetIdKey="travel"
            data={{
                labels: chartData.map((data) => data.name),
                datasets: [
                    {
                        label: "Pollution",
                        data: chartData.map((data) => data.pollution),
                        backgroundColor: chartData.map((data) => processBgColor(data.pollution_score)),
                        borderColor: chartData.map((data) => processBorderColor(data.pollution_score)),
                        borderWidth: 1,
                    }
                ]
            }}
        />
    );
};

export default EmployeeBarChart;