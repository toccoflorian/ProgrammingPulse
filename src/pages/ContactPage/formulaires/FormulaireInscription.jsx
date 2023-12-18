import { SubmitButton } from "../../../components/Buttons";
import { InputTextPrimary } from "../../../components/Inputs";
import styles from './FormulaireInscription.module.scss'


export default function FormulaireInscription() {       // INSCRIPTION



    return (<>

        {/* FORMULAIRE */}
        <form action="" className={`${styles.formulaire} br-small`}>

            <div className={`d-flex justify-center`}>
                <InputTextPrimary       // Nom
                    type={`text`}
                    name={`nameInscription`}
                    id={`nameInscription`}
                    onChange={``}
                    placeholder={`Nom`}
                    autoComplete={`name`}
                />

                <InputTextPrimary       // Prénom
                    type={`text`}
                    name={`givenNameInscription`}
                    id={`givenNameInscription`}
                    onChange={``}
                    placeholder={`Prénom`}
                    autoComplete={`given-name`}
                />

            </div>

            <div className={`d-flex justify-center`}>
                <InputTextPrimary       // société
                    type={`text`}
                    name={`companyNameInscription`}
                    id={`companyNameInscription`}
                    onChange={``}
                    placeholder={`Nom de votre société`}
                    autoComplete={`given-name`}
                />
            </div>


            <div className={`d-flex justify-center`}>
                <InputTextPrimary      // Email
                    type={`email`}
                    name={`mailInscription`}
                    id={`mailInscription`}
                    onChange={``}
                    placeholder={`E-mail`}
                    autoComplete={`email`}
                />

                <InputTextPrimary       // Téléphone
                    type={`tel`}
                    name={`telInscription`}
                    id={`telInscription`}
                    onChange={``}
                    placeholder={`Téléphone`}
                    autoComplete={`tel`}
                />
            </div>


            <div className={`d-flex justify-center`}>
                <InputTextPrimary       // Mot de passe
                    type={`password`}
                    name={`passwordInscription`}
                    id={`passwordInscription`}
                    onChange={``}
                    placeholder={`Mot de passe`}
                    autoComplete={`new-password`}
                />

                <InputTextPrimary       // Confirmation mot de passe
                    type={`password`}
                    name={`confirmPasswordInscription`}
                    id={`confirmPasswordInscription`}
                    onChange={``}
                    placeholder={`Confirmation mot de passe`}
                    autoComplete={`new-password`}
                />
            </div>

            <div className={`d-flex justify-center`}>

                <SubmitButton textContent={`Créer un compte`} />
            </div>

        </form>
    </>)
}