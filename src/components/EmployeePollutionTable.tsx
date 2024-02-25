import { processBorderColor } from "../utils/processBorderColor";
import { processPollutionScore } from "../utils/processPollutionScore";

const EmployeePollutionTable = ({ chartData }: { chartData: IEmployeeData[] }) => {
    if (chartData.length === 0) {
        return null;
    }

    return (
        <div className="overflow-x-auto mt-10">
            <table className="table text-base">
                <thead className="text-base">
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Recommendation</th>
                    </tr>
                </thead>
                <tbody>
                    {chartData.map((data, index) => (
                        <tr key={index} className="hover">
                            <td>{data.name}</td>
                            <td>{data.location}</td>
                            <td
                                className="font-bold"
                                style={{ color: processBorderColor(data.pollution_score) }}
                            >
                                {processPollutionScore(data.pollution_score)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeePollutionTable;