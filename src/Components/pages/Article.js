import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://www.mastrosoft.com.ar/api/public/neumaticos";

export default function Article() {
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        const apiUrl = `${API_URL}/${id}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const Options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        };

        try {
            const apiUrl = `${API_URL}/update/${id}`;
            const result = await fetch(apiUrl, Options).then((d) => d.json());

            const notify = () => toast(result);
            notify();
        } catch (error) {
            console.log(error);
        }
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
                                    <label className="form-label">Codigo</label>
                                    <input
                                        type="text"
                                        name="cod_Articulo"
                                        className="form-control"
                                        defaultValue={data.cod_Articulo}
                                        onChange={handleChange}
                                    />
                                </div>
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
                                <div className="mb-5">
                                    <label className="form-label">
                                        Proveedor
                                    </label>
                                    <input
                                        type="text"
                                        name="cod_Proveedor"
                                        className="form-control"
                                        defaultValue={data.cod_Proveedor}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-5">
                                    <label className="form-label">
                                        Cantidad
                                    </label>
                                    <input
                                        type="number"
                                        name="cantidad"
                                        className="form-control"
                                        defaultValue={data.cantidad}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>
                                <button
                                    className="btn btn-info btn-block w-100"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="row m-5 text-center">
                        <Link className="btn btn-danger btn-sm" to={`/`}>
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
