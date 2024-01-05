import { useContext, useEffect, useState } from "react";
import { SubmitButton } from "../Buttons";
import { InputTextPrimary } from "../Inputs";
import styles from "./FormulaireConnexion.module.scss";
import { FetchContext } from "../../contexts/FetchContext";


export default function FormulaireConnexion() {

    const [emailConnection, setEmailConnetion] = useState("");
    const [passwordConnection, setPasswordConnetion] = useState("");


    const { fetchData, connectionResponse } = useContext(FetchContext);


    async function handleSubmit(e) {
        e.preventDefault();
        fetchData.get(`/login?mail=${emailConnection}&currentpassword=${passwordConnection}`, "login")
    }

    useEffect(() => {
        console.log(connectionResponse);
    }, [connectionResponse])

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
            {!connectionResponse.status ?
                connectionResponse.content
                :
                "Connected"
            }

        </form>
    </>)
}