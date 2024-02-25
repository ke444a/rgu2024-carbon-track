import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../config/api";

type Props = {
    setChartData: Dispatch<SetStateAction<IEmployeeData[]>>;
};

const EmployeeCsvForm = ({ setChartData }: Props) => {
    const [file, setFile] = useState<File | null>(null);
    const { mutate } = useMutation({
        mutationFn: async () => {
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await api
                    .post("/api/employees", formData)
                    .then((res) => res.data);
                setChartData(res);
            }
        },
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate();
    };

    return (
        <div className="mb-10">
            <h4 className="text-3xl font-bold mb-2">Commute Information</h4>
            <p className="text-lg mb-6">
          Provide your employees' commute information and get handy carbon
          insights!
            </p>
            <div className="divider mb-6 max-w-screen-lg" />
            <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                <input
                    type="file"
                    className="file-input file-input-bordered file-input-primary w-full max-w-md rounded-md file:text-white"
                    onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                            setFile(files[0]);
                        }
                    }}
                />
                <button className="btn btn-primary text-white rounded-md max-w-screen-lg">
            Submit
                </button>
            </form>
        </div>
    );
};

export default EmployeeCsvForm;