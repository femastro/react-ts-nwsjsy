import * as React from "react";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://www.mastrosoft.com.ar/api/public/neumaticos`)
            .then((response) => response.json())
            .then((data) => {
                const sortData = [...data].sort((a, b) => a.id - b.id);
                setData(sortData);
            })

            .catch((error) => console.error("Error =>", error));
    }, []);

    return (
        <div className="container">
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
