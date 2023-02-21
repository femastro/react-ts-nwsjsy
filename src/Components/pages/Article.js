import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Article() {
    const API_URL = "http://www.mastrosoft.com.ar/api/public/neumaticos/";

    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(API_URL + id)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => console.error("Error =>", error));
    }, []);

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(JSON.stringify(data));
        try {
            const config = {
                method: "PUT",
                headres: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };
            await fetch(API_URL + `update/${id}`, config)
                .then((respuesta) => {
                    const resultado = respuesta.json();
                    return resultado;
                })
                .then((resultado) => {
                    const texto = document.getElementById("editado");
                    texto.innerHTML = `<div class="alert alert-dismissible alert-success">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <p>${resultado}</p>
                  </div>`;
                })
                .catch((error) => console.error("Error =>", error));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
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
                                <div className="my-2">
                                    <span id="editado"></span>
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
