import * as React from "react";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
    const notify = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 3000,
        });
    };
    const [data, setData] = useState([]);

    const carga = async () => {
        await fetch(`https://www.mastrosoft.com.ar/api/public/neumaticos`)
            .then((response) => response.json())
            .then((d) => {
                if (d.error == "true") {
                    notify(d.message);
                } else {
                    const sortData = [...d].sort((a, b) => a.id - b.id);
                    setData(sortData);
                }
            })

            .catch((error) => console.error("Error => ", error));
    };

    useEffect(() => {
        carga();
    }, []);

    return (
        <div className="container">
            <ToastContainer />
            <div className="row">
                <div className="col-md-12">
                    <div className="table-responsive">
                        <table className="table table-light table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">CODIGO</th>
                                    <th scope="col">MARCA</th>
                                    <th scope="col">MODELO</th>
                                    <th scope="col">MEDIDA</th>
                                    <th scope="col">PROVEEDOR</th>
                                    <th scope="col">STOCK</th>
                                    <th
                                        colSpan="2"
                                        className="text-center"
                                        scope="col"
                                    >
                                        <Link
                                            to={`/new`}
                                            className="btn btn-success btn-sm w-100 text-center"
                                        >
                                            New
                                        </Link>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="table-hober">
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td scope="row">{item.id}</td>
                                        <td>{item.cod_Articulo}</td>
                                        <td>{item.marca}</td>
                                        <td>{item.modelo}</td>
                                        <td>{item.medida}</td>
                                        <td>{item.cod_Proveedor}</td>
                                        <td className="text-center">
                                            {item.cantidad}
                                        </td>
                                        <td className="text-center">
                                            <Link
                                                to={`article/${item.id}`}
                                                className="btn btn-info btn-sm"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                        <td className="text-center">
                                            <Link
                                                to={`delete/${item.id}`}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
