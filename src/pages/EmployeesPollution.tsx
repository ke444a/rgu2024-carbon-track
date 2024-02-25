import { useState } from "react";
import EmployeeBarChart from "../components/EmployeeBarChart";
import EmployeePollutionTable from "../components/EmployeePollutionTable";
import EmployeeCsvForm from "../components/EmployeeCsvForm";

const EmployeesPollution = () => {
    const [chartData, setChartData] = useState<IEmployeeData[]>([]);

    return (
        <>
            <EmployeeCsvForm setChartData={setChartData} />
            <EmployeeBarChart chartData={chartData} />
            <EmployeePollutionTable chartData={chartData} />
        </>
    );
};

export default EmployeesPollution;