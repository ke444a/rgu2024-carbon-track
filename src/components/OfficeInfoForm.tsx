import { FaUserGroup } from "react-icons/fa6";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { Dispatch, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../config/api";

type Props = {
    setOfficeData: Dispatch<React.SetStateAction<IOfficeData | undefined>>;
}

const CompanyInfoForm = ({ setOfficeData }: Props) => {
    const [officeInfo, setOfficeInfo] = useState({
        employees: "",
        area: "",
        file: null as File | null,
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: async () => {
            const formData = new FormData();
            formData.append("total_employees", officeInfo.employees);
            formData.append("total_area", officeInfo.area);
            formData.append("file", officeInfo.file as File);
            const res = await api
                .post("/api/office", formData)
                .then((res) => res.data);
            setOfficeData(res);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };

    return (
        <form className="flex flex-col space-y-6 mb-10" onSubmit={handleSubmit}>
            {/* <div className="flex flex-col">
                <h4 className="text-lg font-bold">Bill Information</h4>
                <div className="join join-horizontal space-x-6">
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Your electricity bill (£)?</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaMoneyBillWave className="text-xl opacity-70" />
                            <input
                                type="text"
                                placeholder="£1000"
                                className="input input-bordered w-full max-w-xs placeholder:italic grow"
                            />
                        </div>
                    </label>
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">
                  Your electricity consumption (kWh)?
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaBoltLightning className="text-xl opacity-70" />
                            <input
                                type="text"
                                placeholder="1000 kWh"
                                className="input input-bordered w-full max-w-xs placeholder:italic"
                            />
                        </div>
                    </label>
                </div>
                <div className="join join-horizontal space-x-6">
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Your electricity bill (£)?</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaMoneyBillWave className="text-xl opacity-70" />
                            <input
                                type="text"
                                placeholder="£1000"
                                className="input input-bordered w-full max-w-xs placeholder:italic grow"
                            />
                        </div>
                    </label>
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">
                  Your electricity consumption (kWh)?
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaFire className="text-xl opacity-70" />
                            <input
                                type="text"
                                placeholder="1000 kWh"
                                className="input input-bordered w-full max-w-xs placeholder:italic"
                            />
                        </div>
                    </label>
                </div>
            </div>
            <div className="divider max-w-screen-lg" /> */}
            <div className="flex flex-col">
                <h4 className="text-3xl font-bold mb-2">Office Information</h4>
                <p className="text-lg mb-6">Provide your office information and get handy carbon insights!</p>
                <div className="join join-horizontal space-x-6">
                    {/* <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Your total number of cars?</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCar className="text-xl opacity-70" />
                            <input
                                type="text"
                                placeholder="10 cars"
                                className="input input-bordered w-full max-w-xs placeholder:italic grow"
                            />
                        </div>
                    </label> */}
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">
                Your total number of employees?
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaUserGroup className="text-xl opacity-70" />
                            <input
                                type="text"
                                placeholder="100 employees"
                                className="input input-bordered w-full max-w-xs placeholder:italic grow"
                                value={officeInfo.employees}
                                onChange={(e) =>
                                    setOfficeInfo({ ...officeInfo, employees: e.target.value })
                                }
                            />
                        </div>
                    </label>
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Your office area (sqft)?</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <HiBuildingOffice2 className="text-xl opacity-70" />
                            <input
                                type="text"
                                placeholder="10000 sqft"
                                className="input input-bordered w-full max-w-xs placeholder:italic"
                                value={officeInfo.area}
                                onChange={(e) =>
                                    setOfficeInfo({ ...officeInfo, area: e.target.value })
                                }
                            />
                        </div>
                    </label>
                </div>
                {/* <div className="join join-horizontal space-x-6"> */}
                {/* <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">
                  Your electricity consumption (kWh)?
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaFire className="text-xl opacity-70" />
                            <input
                                type="text"
                                placeholder="1000 kWh"
                                className="input input-bordered w-full max-w-xs placeholder:italic"
                            />
                        </div>
                    </label> */}
                {/* </div> */}
            </div>
            <div className="divider max-w-screen-lg" />
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Upload your bills info</span>
                </div>
                <input
                    type="file"
                    className="file-input file-input-bordered file-input-primary w-full max-w-md rounded-md file:text-white"
                    onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                            setOfficeInfo({ ...officeInfo, file: files[0] });
                        }
                    }}
                />
            </label>
            <button className="btn btn-outline hover:text-white transition-colors max-w-screen-lg rounded-md">
        Submit
            </button>
        </form>
    );
};

export default CompanyInfoForm;