import React from "react";

import { Link, useParams } from "react-router-dom";

export default function Article() {
    const { id } = useParams();

    return (
        <div>
            <h1>Article Details</h1>
            <p>Article ID: {id}</p>
            {/* Resto de la información del usuario */}
            <Link to={`/`}>Back</Link>
        </div>
    );
}
