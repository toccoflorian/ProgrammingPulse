import { InputTextPrimary } from "../../components/Inputs"
import styles from "./FormulaireContact.module.scss";

export default function FormulaireContact() {

    return (<>
        <form className={`${styles.formulaire} d-flex flex-column justify-center align-center width100 br-small p10`}>

            <div className={` d-flex`}>
                <InputTextPrimary placeholder={`Nom`} />
                <InputTextPrimary placeholder={`Prénom`} />
            </div>

            <InputTextPrimary placeholder={`Nom de votre société`} />

            <div className={` d-flex`}>
                <InputTextPrimary placeholder={`Téléphone`} />
                <InputTextPrimary placeholder={`E-mail`} />
            </div>

        </form>
    </>)
}