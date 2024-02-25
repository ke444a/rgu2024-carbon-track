import { FaCar, FaPlaneDeparture, FaTrain } from "react-icons/fa6";
import { Dispatch, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../config/api";

type Props = {
    setTravelData: Dispatch<React.SetStateAction<ITravelData | undefined>>;
};

const TravelPollutionForm = ({ setTravelData }: Props) => {
    const [files, setFiles] = useState<File[]>([]);

    const { mutate, isLoading }  = useMutation({
        mutationFn: async () => {
            const formData = new FormData();
            formData.append("car_file", files[0]);
            formData.append("flight_file", files[1]);
            formData.append("train_file", files[2]);
            const res = await api.post("/api/travel", formData);
            setTravelData(res.data);
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (files.length < 3) {
            return;
        }
        mutate();
    };

    return (
        <div className="mb-10">
            <h4 className="text-3xl font-bold mb-2">Travel Information</h4>
            <p className="text-lg mb-6">
          Provide your travel information and get handy carbon insights!
            </p>
            <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                <div className="join join-horizontal gap-10">
                    <div className="flex items-center">
                        <FaCar className="text-5xl mr-2" />
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">
                    Upload your car commute data
                                </span>
                            </div>
                            <input
                                type="file"
                                accept=".csv"
                                className="file-input file-input-bordered w-full max-w-xs"
                                onChange={(e) => {
                                    if (e.target && e.target.files) {
                                        setFiles([...files, e.target.files[0]]);
                                    }
                                }}
                            />
                        </label>
                    </div>
                    <div className="flex items-center">
                        <FaPlaneDeparture className="text-5xl mr-2" />
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">
                    Upload your flight commute data
                                </span>
                            </div>
                            <input
                                type="file"
                                accept=".csv"
                                className="file-input file-input-bordered w-full max-w-xs"
                                onChange={(e) => {
                                    if (e.target && e.target.files) {
                                        setFiles([...files, e.target.files[0]]);
                                    }
                                }}
                            />
                        </label>
                    </div>
                    <div className="flex items-center">
                        <FaTrain className="text-5xl mr-2" />
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">
                    Upload your train commute data
                                </span>
                            </div>
                            <input
                                type="file"
                                accept=".csv"
                                className="file-input file-input-bordered w-full max-w-xs"
                                onChange={(e) => {
                                    if (e.target && e.target.files) {
                                        setFiles([...files, e.target.files[0]]);
                                    }
                                }}
                            />
                        </label>
                    </div>
                </div>
                <div className="divider" />
                <button className="btn btn-primary text-white max-w-screen-lg">Submit</button>
            </form>
        </div>
    );
};

export default TravelPollutionForm;