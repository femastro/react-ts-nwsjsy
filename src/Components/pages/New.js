import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://www.mastrosoft.com.ar/api/public";

export default function NewArticle() {
    const [data, setData] = useState([]);
    const [dataMarca, setMarca] = useState([]);
    const [dataModelo, setModelo] = useState([]);
    const [dataMedida, setMedida] = useState([]);

    const fetchData = async () => {
        await fetch(API_URL + "/all/marcas")
            .then((r) => r.json())
            .then((d) => {
                setMarca(d);
            })
            .catch((error) => console.log("Error => ", error));
    };

    useEffect(() => {
        fetchData();

        setData({
            marca: "",
            modelo: "",
            medida: "",
            cod_Proveedor: "",
            cantidad: 0,
            image: "",
        });
    }, []);

    const notify = (message, alerta) => {
        if (alerta == "true") {
            toast.success(message, {
                position: "top-center",
                autoClose: 3000,
                success: setTimeout(() => {
                    window.location = "/";
                }, 3200),
            });
        } else {
            toast.error(message, {
                position: "top-center",
                autoClose: 3000,
                success: setTimeout(() => {
                    window.location = "/";
                }, 3200),
            });
        }
    };
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
            const apiUrl = `${API_URL}/neumaticos/new`;
            await fetch(apiUrl, Options)
                .then((r) => r.json())
                .then((d) => {
                    notify(d.message, d.alerta);
                });
        } catch (error) {
            console.log(error);
        }
    };

    ///
    ///     Carga de los Select

    ///
    /// EJ. de La BD : idneumaticos, cod_Articulo, marca, modelo, medida, cod_Proveedor, cantidad, image.
    ///

    const handleChange = async (event) => {
        let url;
        let dato;
        switch (event.target.name) {
            case "marca":
                url = "modelos";
                dato = {
                    marca: event.target.value,
                };
                break;
            case "modelo":
                dato = {
                    marca: data.marca,
                    modelo: event.target.value,
                };
                url = "medidas";
                break;
            case "medidas":
                url = null;
                break;
        }
        if (url != null) {
            const config = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(dato),
            };
            await fetch(API_URL + "/all/" + url, config)
                .then((r) => r.json())
                .then((d) => {
                    if (url == "modelos") {
                        setModelo(d);
                    }
                    if (url == "medidas") {
                        setMedida(d);
                    }
                })
                .catch((error) => console.log("Error =>", error));
        }

        /// Guardo el <Select> en data. Para cuando ejecuto el Submit !
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });

        console.log(data);
    };

    ///
    /// Fin Carga de los Select.
    ///

    return (
        <div className="container">
            <ToastContainer />
            <div className="row">
                <div id="error"></div>
                <div className="card col-md-5 mx-auto">
                    <div className="card-header text-center mt-3">
                        <h1>New Article</h1>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit} method="POST">
                            <div>
                                <div className="mb-3">
                                    <label className="form-label">Marcas</label>
                                    <select
                                        className="form-select form-select-sm"
                                        onChange={handleChange}
                                        name="marca"
                                    >
                                        <option defaultValue="0">
                                            Select One
                                        </option>
                                        {dataMarca.map((item) => (
                                            <option
                                                key={item.idneumaticos}
                                                defaultValue={item.marca}
                                            >
                                                {item.marca}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Modelos
                                    </label>
                                    <select
                                        className="form-select form-select-sm"
                                        onChange={handleChange}
                                        name="modelo"
                                    >
                                        <option defaultValue="0">
                                            Select One
                                        </option>
                                        {dataModelo.map((item) => (
                                            <option
                                                key={item.idneumaticos}
                                                defaultValue={item.modelo}
                                            >
                                                {item.modelo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Medidas
                                    </label>
                                    <select
                                        className="form-select form-select-sm"
                                        onChange={handleChange}
                                        name="medida"
                                    >
                                        <option defaultValue="0">
                                            Select One
                                        </option>
                                        {dataMedida.map((item) => (
                                            <option
                                                key={item.idneumaticos}
                                                defaultValue={item.medida}
                                            >
                                                {item.medida}
                                            </option>
                                        ))}
                                    </select>
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
                    <div className="row mb-3 text-center">
                        <div className="col-md-5 mx-auto">
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
