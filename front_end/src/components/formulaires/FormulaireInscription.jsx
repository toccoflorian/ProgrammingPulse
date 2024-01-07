import { useContext, useEffect, useState } from "react";
import { InputFilePrimary, InputTextPrimary } from "../Inputs";
import styles from './FormulaireInscription.module.scss'
import { FetchContext } from "../../contexts/FetchContext";
import { ButtonPrimary } from "../Buttons";


export default function FormulaireInscription() {       // INSCRIPTION

    const [familyNameInscription, setFamilyNameInscription] = useState('');         //states
    const [givenNameInscription, setGivenNameInscription] = useState('');
    const [organizationInscription, setOrganizationInscription] = useState('');
    const [telInscription, setTelInscription] = useState('');
    const [mailInscription, setMailInscription] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



    const { fetchData, inscriptionResponse } = useContext(FetchContext)          // contexct

    useEffect(() => {
        // console.log('data', inscriptionResponse);
    }, [inscriptionResponse])        // effect

    function handleSubmit(e) {           // au submit du formulaire
        e.preventDefault()
        const inputsValues = {                  // recuperation des valeurs des inputs
            familyname: familyNameInscription,
            givenname: givenNameInscription,
            organization: organizationInscription,
            tel: telInscription,
            mail: mailInscription,
            passwords: [password, confirmPassword],

        }

        console.log(inputsValues);
        fetchData.post("/create_new_user", inputsValues, "inscription")       // fetch les datas

    }


    return (<>
        <img className={styles.test} id="test" src="" alt="" />
        <img className={styles.test} id="test2" src="" alt="" />
        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className={`${styles.formulaire} br-small`}>

            <div className={`d-flex justify-center`}>

                {/* <button onClick={handlePhoto}>test</button> */}

                <InputTextPrimary       // Nom
                    type={`text`}
                    name={`nameInscription`}
                    id={`nameInscription`}
                    onChange={(e) => { setFamilyNameInscription(e.target.value) }}
                    placeholder={`Nom`}
                    autoComplete={`name`}
                />

                <InputTextPrimary       // Prénom
                    type={`text`}
                    name={`givenNameInscription`}
                    id={`givenNameInscription`}
                    onChange={(e) => { setGivenNameInscription(e.target.value) }}
                    placeholder={`Prénom`}
                    autoComplete={`given-name`}
                />

            </div>


            {/* <InputFilePrimary       // image de l'utilisateur
                label={`Photo de profil:`}
                type={`file`}
                name={`userImage`}
                id={`userImage`}
                onClick={(e) => { e.stopPropagation() }}
                onChange={(e) => { setUserImage(e.target.files[0]) }}
            /> */}

            <div className={`d-flex justify-center`}>
                <InputTextPrimary       // société
                    type={`text`}
                    name={`organizationNameInscription`}
                    id={`organizationNameInscription`}
                    onChange={(e) => { setOrganizationInscription(e.target.value) }}
                    placeholder={`Nom de votre société`}
                    autoComplete={`organization`}
                />
            </div>





            <div className={`d-flex justify-center`}>
                <InputTextPrimary      // Email
                    type={`email`}
                    name={`mailInscription`}
                    id={`mailInscription`}
                    onChange={(e) => { setMailInscription(e.target.value) }}
                    placeholder={`E-mail`}
                    autoComplete={`email`}
                />

                <InputTextPrimary       // Téléphone
                    type={`tel`}
                    name={`telInscription`}
                    id={`telInscription`}
                    onChange={(e) => { setTelInscription(e.target.value) }}
                    placeholder={`Téléphone`}
                    autoComplete={`tel`}
                />
            </div>


            <div className={`d-flex justify-center`}>
                <InputTextPrimary       // Mot de passe
                    type={`password`}
                    name={`passwordInscription`}
                    id={`passwordInscription`}
                    onChange={(e) => { setPassword(e.target.value) }}
                    placeholder={`Mot de passe`}
                    autoComplete={`new-password`}
                />

                <InputTextPrimary       // Confirmation mot de passe
                    type={`password`}
                    name={`confirmPasswordInscription`}
                    id={`confirmPasswordInscription`}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                    placeholder={`Confirmation mot de passe`}
                    autoComplete={`new-password`}
                />
            </div>

            <div className={`d-flex justify-center`}>

                <ButtonPrimary textContent={`Créer un compte`} />
            </div>
            {inscriptionResponse[0] ?
                <p className={`debugGreen`}>{inscriptionResponse[1]}</p>
                :
                <p className={`debugRed`}>{inscriptionResponse[1]}</p>}
        </form>

    </>)
}