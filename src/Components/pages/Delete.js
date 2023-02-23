import { useParams } from "react-router-dom";

const API_URL = "https://www.mastrosoft.com.ar/api/public/neumaticos";

export default function DeleteById() {
    const { id } = useParams();

    const apiUrl = `${API_URL}/delete/${id}`;

    const Options = {
        method: "DELETE",
    };

    try {
        fetch(apiUrl, Options)
            .then((r) => r.json())
            .then((result) => {
                alert(result.message);
                window.location = "/";
            });
    } catch (error) {
        console.log(error);
    }
}
