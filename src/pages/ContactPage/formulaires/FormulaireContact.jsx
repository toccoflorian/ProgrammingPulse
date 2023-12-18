import { InputTextPrimary, TextArea } from "../../../components/Inputs";
import { SubmitButton } from "../../../components/Buttons";
import styles from "./FormulaireContact.module.scss";

export default function FormulaireContact() {

    function handleNameChange() {
        console.log("handleNameChange");
    }

    function handleTextareaChange() {
        console.log("handleTextareaChange");
    }

    return (<>
        <form className={`${styles.formulaire} d-flex flex-column justify-center align-center width100 br-small p10`}>

            <div className={` d-flex`}>

                <InputTextPrimary       // nom
                    type={`text`}
                    name={`nameContact`}
                    id={`nameContact`}
                    onChange={``}
                    placeholder={`Nom`}
                    autoComplete={`name`}
                />

                <InputTextPrimary placeholder={`Prénom`} />
            </div>

            <InputTextPrimary placeholder={`Nom de votre société`} />

            <div className={` d-flex`}>
                <InputTextPrimary placeholder={`Téléphone`} />
                <InputTextPrimary placeholder={`E-mail`} />
            </div>

            <TextArea
                name={`message`}
                id={`message`}
                onChange={handleTextareaChange}
                placeholder={`Message`}
            />

            <SubmitButton textContent={`Envoyer`} />
        </form>
    </>)
}