import { useState } from "react";
import TravelPollutionForm from "../components/TravelPollutionForm";
import TravelBarChart from "../components/TravelBarChart";

const TravelPollution = () => {
    const [travelData, setTravelData] = useState<ITravelData>();
    
    return (
        <>
            <TravelPollutionForm setTravelData={setTravelData} />
            <TravelBarChart travelData={travelData} />
        </>
    );
};

export default TravelPollution;