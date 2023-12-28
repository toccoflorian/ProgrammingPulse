import { useContext, useEffect, useState, Redirect } from "react"
import { FetchContext } from "../../../contexts/FetchContext"
import { get_user } from "../../../functions/sessionManager";
import H1Container from "../H1Container";





export default function EspaceClientPage() {

    const [currentUser, setCurrentUser] = useState(true);
    const { fetchData } = useContext(FetchContext);

    useEffect(() => {
        async function callGetUser() {      // fonction intermediaire
            setCurrentUser(await get_user(fetchData))       // obtenir les informations de l'utilisateur
        }
        callGetUser()

    }, [])



    return (<>
        <H1Container currentUser={currentUser} />
    </>)
}