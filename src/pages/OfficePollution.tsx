import OfficeInfoForm from "../components/OfficeInfoForm";
import OfficeConsumptionChart from "../components/OfficeConsumptionChart";
import OfficeConsumptionResults from "../components/OfficeConsumptionResults";
import { useState } from "react";


const OfficePollution = () => {
    const [officeData, setOfficeData] = useState<IOfficeData>();

    return (
        <>
            <OfficeInfoForm setOfficeData={setOfficeData} />
            <OfficeConsumptionResults officeData={officeData} />
            <OfficeConsumptionChart bills={officeData?.bills} />
        </>
    );
};

export default OfficePollution;