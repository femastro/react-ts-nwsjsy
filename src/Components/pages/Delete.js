import React from "react";
import { useParams } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://www.mastrosoft.com.ar/api/public/neumaticos";

export default function DeleteById() {
    const { id } = useParams();

    const apiUrl = `${API_URL}/delete/${id}`;

    const notify = (message) => {
        toast.success(message, {
            autoClose: 3000,
            success: setTimeout(() => {
                window.location = "/";
            }, 3200),
        });
    };

    async function handleSubmit() {
        const Options = {
            method: "DELETE",
        };
        try {
            await fetch(apiUrl, Options)
                .then((r) => r.json())
                .then((result) => {
                    notify(result.message);
                });
        } catch (error) {
            console.log(error);
        }
    }

    const question = () => {
        const msg = "Esta seguro de Eliminar este Registro ?";

        if (confirm(msg)) {
            handleSubmit();
        } else {
            window.location = "/";
        }
    };

    question();

    return (
        <div className="container">
            <ToastContainer />
            {/* <div className="row">
                <div className="col-md-6 mx-auto">
                    <h5>Esta eliminando un Registro !</h5>
                </div>
            </div> */}
        </div>
    );
}
