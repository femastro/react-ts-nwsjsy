import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Article() {
    const { id } = useParams();
    const [codigo, setCodigo] = useState();
    const [marca, setMarca] = useState();
    const [modelo, setModelo] = useState();
    const [medida, setMedida] = useState();
    const [proveedor, setProveedor] = useState();
    const [cantidad, setCantidad] = useState();

    useEffect(() => {
        fetch(`http://www.mastrosoft.com.ar/api/public/neumaticos/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCodigo(data.cod_Articulo);
                setMarca(data.marca);
                setModelo(data.modelo);
                setMedida(data.medida);
                setProveedor(data.cod_Proveedor);
                setCantidad(data.cantidad);
            })

            .catch((error) => console.error("Error =>", error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            cod_Articulo: codigo,
            marca: marca,
            modelo: modelo,
            medida: medida,
            cod_Proveedor: proveedor,
            cantidad: parseInt(cantidad),
            image: "",
        };

        console.log(formData);

        try {
            const config = {
                method: "PUT",
                headres: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            };
            await fetch(
                `http://www.mastrosoft.com.ar/api/public/neumaticos/update/${id}`,
                config
            )
                .then((respuesta) => {
                    const resultado = respuesta.json();
                    return resultado;
                })
                .then((resultado) => console.log(resultado))
                .catch((error) => console.error("Error =>", error));
        } catch (error) {
            console.log(error);
        }

        // Aquí puedes enviar los datos del formulario a un servidor o realizar otras acciones con ellos.
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
                                        name={codigo}
                                        className="form-control"
                                        defaultValue={codigo}
                                        onChange={(e) =>
                                            setCodigo(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-5">
                                    <label className="form-label">Marca</label>
                                    <input
                                        name={marca}
                                        className="form-control"
                                        defaultValue={marca}
                                        onChange={(e) =>
                                            setMarca(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-5">
                                    <label className="form-label">Modelo</label>
                                    <input
                                        name={modelo}
                                        className="form-control"
                                        defaultValue={modelo}
                                        onChange={(e) =>
                                            setModelo(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-5">
                                    <label className="form-label">Medida</label>
                                    <input
                                        name={medida}
                                        className="form-control"
                                        defaultValue={medida}
                                        onChange={(e) =>
                                            setMedida(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-5">
                                    <label className="form-label">
                                        Proveedor
                                    </label>
                                    <input
                                        name={proveedor}
                                        className="form-control"
                                        defaultValue={proveedor}
                                        onChange={(e) =>
                                            setProveedor(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-5">
                                    <label className="form-label">
                                        Cantidad
                                    </label>
                                    <input
                                        name={cantidad}
                                        className="form-control"
                                        defaultValue={cantidad}
                                        onChange={(e) =>
                                            setCantidad(e.target.value)
                                        }
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
