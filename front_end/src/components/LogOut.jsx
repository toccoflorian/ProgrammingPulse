import { useContext, useEffect } from "react";
import { FetchContext } from "../contexts/FetchContext";
import { sessionLogOut } from "../functions/sessionManager";



export default function LogOutButton() {



    const { fetchData, logOutResponse } = useContext(FetchContext);

    function handleLogOut() {
        fetchData.post("/logout", "", "logout");
    }

    useEffect(() => {
        if (logOutResponse) {
            sessionLogOut();

        }
    }, [logOutResponse]);

    return (<>
        <button className={`SubmitButton`} onClick={handleLogOut}>Déconnexion</button>
    </>)
}