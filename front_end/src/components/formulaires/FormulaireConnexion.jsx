import { useContext, useEffect, useState } from "react";
import styles from "./FormulaireConnexion.module.scss";
import { FetchContext } from "../../contexts/FetchContext";
import { ButtonPrimary } from "../Buttons";


export default function FormulaireConnexion() {

    const [emailConnection, setEmailConnetion] = useState("");
    const [passwordConnection, setPasswordConnetion] = useState("");


    const { fetchData, connectionResponse } = useContext(FetchContext);

    useEffect(() => {
        console.log(connectionResponse);
    }, [connectionResponse])

    async function handleSubmit(e) {
        e.preventDefault();
        fetchData.get(`/login?mail=${emailConnection}&currentpassword=${passwordConnection}`, "login")
    }



    return (<>
        <form onSubmit={handleSubmit} className={`${styles.formulaire} br-small`}>
            <div className={`d-flex justify-center`}>

                <input       // identifiant connexion
                    type={`email`}
                    name={`identifiantConnexion`}
                    id={`identifiantConnexion`}
                    onChange={(e) => { setEmailConnetion(e.target.value) }}
                    placeholder={`identifiant`}
                    autoComplete={`email`}
                    className={`inputPrimary`}
                />

                <input       // mot de passe connexion
                    type={`password`}
                    name={`passwordConnexion`}
                    id={`passwordConnexion`}
                    onChange={(e) => { setPasswordConnetion(e.target.value) }}
                    placeholder={`Mot de passe`}
                    autoComplete={`current-password`}
                    className={`inputPrimary`}
                />
            </div>

            <div className={`d-flex justify-center`}>

                <ButtonPrimary textContent={`Connexion`} />
            </div>
            {!connectionResponse.status ?
                connectionResponse.content
                :
                document.location.reload()
            }

        </form>
    </>)
}