import React, { Component } from "react";
import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

export default function Article() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://www.mastrosoft.com.ar/api/public/neumaticos/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })

            .catch((error) => console.error("Error =>", error));
    }, []);

    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            marca: marca,
            modelo: modelo,
        };

        console.table(formData);
        // Aquí puedes enviar los datos del formulario a un servidor o realizar otras acciones con ellos.
    };

    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-8 mx-auto">
                    <div className="card-header text-center mt-3">
                        <h1>Article Details</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit} method="POST">
                            {data.map((item) => (
                                <div key={item.id}>
                                    <div className="mb-5">
                                        <label className="form-label">
                                            Marca
                                        </label>
                                        <input
                                            name={marca}
                                            className="form-control"
                                            defaultValue={item.marca}
                                            onChange={(e) =>
                                                setMarca(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label className="form-label">
                                            Modelo
                                        </label>
                                        <input
                                            name={modelo}
                                            className="form-control"
                                            defaultValue={item.modelo}
                                            onChange={(e) =>
                                                setModelo(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label className="form-label">
                                            Medida
                                        </label>
                                        <input
                                            name="medida"
                                            className="form-control"
                                            defaultValue={item.medida}
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label className="form-label">
                                            Proveedor
                                        </label>
                                        <input
                                            name="proveedor"
                                            className="form-control"
                                            defaultValue={item.cod_Proveedor}
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label className="form-label">
                                            Cantidad
                                        </label>
                                        <input
                                            name="cantidad"
                                            className="form-control"
                                            defaultValue={item.cantidad}
                                        />
                                    </div>
                                    <button
                                        className="btn btn-info btn-block w-100"
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
            </div>
            <div className="row m-5 text-center">
                <Link to={`/`}>Back</Link>
            </div>
        </div>
    );
}
