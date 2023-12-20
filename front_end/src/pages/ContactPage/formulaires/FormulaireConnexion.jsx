import { useContext, useEffect, useState } from "react";
import { SubmitButton } from "../../../components/Buttons";
import { InputTextPrimary } from "../../../components/Inputs";
import styles from "./FormulaireConnexion.module.scss";
import { FetchContext } from "../../../contexts/FetchContext";


export default function FormulaireAccount() {

    const [emailConnection, setEmailConnetion] = useState("");
    const [passwordConnection, setPasswordConnetion] = useState("");

    const { fetchData, connectionResponse } = useContext(FetchContext)

    useEffect(() => {
        console.log("connectionResponse", connectionResponse);
        connectionResponse.status &&
            setSessionCookies()
    }, [connectionResponse])

    function setSessionCookies() {
        document.cookie = `user_id= ${connectionResponse.content.user_id}`;
        document.cookie = `cookie_id= ${connectionResponse.content.cookie_id}`;
        document.cookie = `signature= ${connectionResponse.content.signature}`;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const inpusValues = {
            mail: emailConnection,
            currentpassword: passwordConnection
        }
        fetchData("/get_user_session_token", JSON.stringify(inpusValues), "connection")
    }

    return (<>
        <form onSubmit={handleSubmit} className={`${styles.formulaire} br-small`}>
            <div className={`d-flex justify-center`}>
                <InputTextPrimary       // identifiant connexion
                    type={`email`}
                    name={`identifiantConnexion`}
                    id={`identifiantConnexion`}
                    onChange={(e) => { setEmailConnetion(e.target.value) }}
                    placeholder={`identifiant`}
                    autoComplete={`email`}
                />

                <InputTextPrimary       // mot de passe connexion
                    type={`password`}
                    name={`passwordConnexion`}
                    id={`passwordConnexion`}
                    onChange={(e) => { setPasswordConnetion(e.target.value) }}
                    placeholder={`Mot de passe`}
                    autoComplete={`current-password`}
                />
            </div>

            <div className={`d-flex justify-center`}>

                <SubmitButton textContent={`Connexion`} />
            </div>
            {!connectionResponse.status &&
                connectionResponse.content}
            {/* {connectionResponse["state"] ? <p className={`debugGreen`}>{connectionResponse["content"]}</p> : <p className={`debugRed`}>{connectionResponse["content"]}</p>} */}

        </form>
    </>)
}