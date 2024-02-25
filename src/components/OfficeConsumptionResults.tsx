import { FaBoltLightning, FaFire, FaPeopleGroup } from "react-icons/fa6";
import { Pie } from "react-chartjs-2";

type ConsumptionCardProps = {
    title: string;
    value: string;
    icon: React.ReactNode;
};

const ConsumptionCard = ({ title, value, icon }: ConsumptionCardProps) => {
    return (
        <div className="bg-neutral w-full flex flex-col justify-between px-4 py-6 pb-10 rounded-md text-white h-[200px]">
            <h5 className="font-medium mb-4 justify-start text-sm">{title}</h5>
            <div className="flex items-center justify-between w-full">
                <h4 className="font-bold text-2xl text-accent">{value}</h4>
                {icon}
            </div>
        </div>
    );
};

const OfficeConsumptionResults = ({ officeData }: { officeData: IOfficeData | undefined }) => {
    if (!officeData) {
        return null;
    }

    return (
        <div className="flex mb-10 w-full space-x-4">
            {/* <div className="bg-neutral flex flex-col justify-center items-center px-4 py-6 rounded-md">
                <h5 className="font-medium text-white mb-4 justify-start text-center">
            Energy consumption (kWh/sqft):{" "}
                    {officeData.total_consumption_per_sqft.toFixed(2)}
                </h5>
                <div
                    className="radial-progress text-success"
                    style={{
                        "--value": (officeData.cons_per_sqft_score / 5) * 100,
                        "--thickness": "3px",
                        "--size": "170px",
                    }}
                    role="progressbar"
                >
                    {officeData.cons_per_sqft_score}
                </div>
            </div>
            <div className="bg-neutral flex flex-col justify-center items-center px-4 py-6 rounded-md">
                <h5 className="font-medium text-white mb-4 justify-start text-center">
            Total energy consumption (kWh):{" "}
                    {officeData.total_electricity_consumed.toFixed(2)}
                </h5>
            </div> */}
            <div className="w-1/2 h-fit">
                <div className="join join-horizontal gap-3 mb-3 w-full">
                    <ConsumptionCard
                        title="Total energy consumption (kWh)"
                        value={officeData.total_electricity_consumed.toFixed(2)}
                        icon={<FaFire className="text-5xl text-accent" />}
                    />
                    <ConsumptionCard
                        title="Total energy consumption (kWh)"
                        value={officeData.total_electricity_consumed.toFixed(2)}
                        icon={<FaFire className="text-5xl text-accent" />}
                    />
                </div>
                <div className="join join-horizontal gap-3 w-full">
                    <ConsumptionCard
                        title="Energy consumption per employee (kWh/sqft)"
                        value={officeData.total_consumption_per_sqft.toFixed(2)}
                        icon={<FaBoltLightning className="text-5xl text-accent" />}
                    />

                    <ConsumptionCard
                        title="Energy consumption per sqft (kWh/sqft)"
                        value={officeData.total_consumption_per_sqft.toFixed(2)}
                        icon={<FaPeopleGroup className="text-5xl text-accent" />}
                    />
                </div>
            </div>
            <div className="w-1/2 h-[416px] bg-neutral rounded-md flex justify-center p-6 px-4">
                <Pie
                    data={{
                        labels: ["Electricity", "Gas"],
                        datasets: [
                            {
                                label: "Energy consumption",
                                data: [officeData.total_electricity_consumed, officeData.total_gas_consumed],
                                backgroundColor: ["#FF6384", "#36A2EB"],
                                hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                                
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            legend: {
                                labels: {
                                    color: "#fff"
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default OfficeConsumptionResults;