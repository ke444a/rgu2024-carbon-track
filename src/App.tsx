import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    LineElement,
    PointElement,
    ArcElement
} from "chart.js";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import CompanyPollution from "./pages/OfficePollution";
import EmployeesPollution from "./pages/EmployeesPollution";
import TravelPollution from "./pages/TravelPollution";

ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend, PointElement, LineController, LineElement, LinearScale, ArcElement);

const App = () => {
    // const libraries = useMemo<Libraries[]>(() => ["places"], []);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
        libraries: ["places"]
    });
    if (!isLoaded) {
        return null;
    }

    return (
        <>
            <Navbar />
            <div className="max-w-[90%] mx-auto py-10">
                <Routes>
                    <Route path="/commute" element={<EmployeesPollution />} />
                    <Route path="/office" element={<CompanyPollution />} />
                    <Route path="/travel" element={<TravelPollution />} />
                </Routes>
            </div>
        </>
    );
};

export default App;
