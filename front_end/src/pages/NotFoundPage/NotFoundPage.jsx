import { Link } from "react-router-dom";


export default function NotFoundPage() {
    return (<>
        <h1>Erreur page introuvable</h1>
        <Link to="/HomePage">Page d&#39;acceuil</Link>
    </>)
}