import { useContext, useEffect, useState } from "react";
import { SubmitButton } from "../../../components/Buttons";
import { InputTextPrimary } from "../../../components/Inputs";
import styles from "./FormulaireConnexion.module.scss";
import { FetchContext } from "../../../contexts/FetchContext";
import { sessionConnection } from "../../../functions/sessionManager"

// let connectionResponse = { status: true, content: '' };

export default function FormulaireAccount() {

    const [emailConnection, setEmailConnetion] = useState("");
    const [passwordConnection, setPasswordConnetion] = useState("");
    const [connectionResponse, setConnectionResponse] = useState({ status: true });

    const { fetchData } = useContext(FetchContext);


    async function handleSubmit(e) {
        e.preventDefault();
        const inpusValues = {
            mail: emailConnection,
            currentpassword: passwordConnection
        }
        const response = await sessionConnection(fetchData, inpusValues);
        // connectionResponse = response;
        setConnectionResponse(response)
        console.log(connectionResponse);
    }

    useEffect(() => { }, [connectionResponse])

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
            {/* {connectionResponse["state"] ? <p className={`debugGreen`}>{connectionResponse["content"]}</p> : <p className={`debugRed`}>{connectionResponse["content"]}</p>} */}

        </form>
    </>)
}