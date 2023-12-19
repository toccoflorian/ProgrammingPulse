import { SubmitButton } from "../../../components/Buttons";
import { InputTextPrimary } from "../../../components/Inputs";
import styles from "./FormulaireConnexion.module.scss";


export default function FormulaireAccount() {

    function handleIdentifiantChange() {
        console.log("handleIdentifiantChange");
    }

    function handlePasswordConnexion() {
        console.log("handlePasswordConnexion");
    }

    return (<>
        <form action="" className={`${styles.formulaire} br-small`}>
            <div className={`d-flex justify-center`}>
                <InputTextPrimary       // identifiant connexion
                    type={`email`}
                    name={`identifiantConnexion`}
                    id={`identifiantConnexion`}
                    onChange={handleIdentifiantChange}
                    placeholder={`identifiant`}
                    autoComplete={`email`}
                />

                <InputTextPrimary       // mot de passe connexion
                    type={`password`}
                    name={`passwordConnexion`}
                    id={`passwordConnexion`}
                    onChange={handlePasswordConnexion}
                    placeholder={`Mot de passe`}
                    autoComplete={`current-password`}
                />
            </div>

            <div className={`d-flex justify-center`}>

                <SubmitButton textContent={`Connexion`} />
            </div>

        </form>
    </>)
}