import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://www.mastrosoft.com.ar/api/public/neumaticos";

export default function NewArticle() {
    useEffect(() => {
        setData({
            marca: "",
            modelo: "",
            medida: "",
            image: "",
        });
    }, []);
    const [data, setData] = useState({});

    const notify = (result) =>
        toast.success(result, {
            autoClose: 3000,
            success: setTimeout(() => {
                window.location = "/";
            }, 3200),
        });

    const handleButton = () => {
        let btn = document.getElementById("button");
        btn.textContent = "Saving !";
        btn.setAttribute("disabled", "disabled");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleButton();

        const Options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        };

        try {
            const apiUrl = `${API_URL}/new`;
            const result = await fetch(apiUrl, Options).then((d) => d.json());

            notify(result);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };
    return (
        <div className="container">
            <ToastContainer />
            <div className="row">
                <div className="card col-md-8 mx-auto">
                    <div className="card-header text-center mt-3">
                        <h1>Edit Article</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit} method="POST">
                            <div>
                                <div className="mb-5">
                                    <label className="form-label">Marca</label>
                                    <input
                                        type="text"
                                        name="marca"
                                        className="form-control"
                                        defaultValue={data.marca}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-5">
                                    <label className="form-label">Modelo</label>
                                    <input
                                        type="text"
                                        name="modelo"
                                        className="form-control"
                                        defaultValue={data.modelo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-5">
                                    <label className="form-label">Medida</label>
                                    <input
                                        type="text"
                                        name="medida"
                                        className="form-control"
                                        defaultValue={data.medida}
                                        onChange={handleChange}
                                    />
                                </div>
                                <hr />
                                <button
                                    className="btn btn-info btn-block w-100"
                                    type="submit"
                                    id="button"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="row m-5 text-center">
                        <div className="col-md-4 mx-auto">
                            <Link
                                className="btn btn-danger btn-sm w-100"
                                to={`/`}
                            >
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
