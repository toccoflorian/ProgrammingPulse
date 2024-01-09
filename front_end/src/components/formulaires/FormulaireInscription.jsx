import { useContext, useEffect, useState } from "react";
import styles from './FormulaireInscription.module.scss'
import { FetchContext } from "../../contexts/FetchContext";
import { ButtonPrimary } from "../Buttons";


export default function FormulaireInscription() {       // INSCRIPTION

    // const ERRORS = {
    //     familyNameError: "Merci de renseigner un nom de famille entre 3 et 45 caractères.",
    //     gi
    // }

    const [familyName, setFamilyName] = useState('');         //states
    const [familyNameError, setFamilyNameError] = useState('');

    const [givenName, setGivenName] = useState('');
    const [givenNameError, setGivenNameError] = useState('');

    const [organization, setOrganization] = useState('');

    const [tel, setTel] = useState('');
    const [telError, setTelError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [mail, setMail] = useState('');
    const [mailError, setMailError] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const { fetchData, inscriptionResponse } = useContext(FetchContext)          // contexct


    useEffect(() => {
        // console.log('data', inscriptionResponse);
    }, [inscriptionResponse])        // effect


    function inputsCheck() {
        if (familyName.length < 3 || familyName > 45) {
            setFamilyNameError("familyNameError")
            return false;
        }
        if (givenName.length < 3 || givenName > 45) {
            setGivenNameError("given name error")
            return false;
        }
        // expression régulière pour adresse mail
        // eslint-disable-next-line no-useless-escape
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(mail.toLowerCase())) {
            setMailError("mail error")
            return false;
        }
        // expresssion régulière pour les numéros de téléphone
        if (!/^((\+33\s?)|0)[1-9](\s?\d{2}){4}$/.test(tel)) {
            setTelError("tel error")
            return false;
        }
        if (password.length < 4 || password.length > 45) {
            setPasswordError("password error")
            return false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("confirmPassword error")
            return false;
        }



        return true;

    }



    function handleSubmit(e) {           // au submit du formulaire
        e.preventDefault()


        if (inputsCheck(e)) {          // Si pas d'erreurs de saisie
            fetchData.post(       // fetch les datas
                "/create_new_user",
                {
                    familyname: familyName,                  // recuperation des valeurs des inputs
                    givenname: givenName,
                    organization: organization,
                    tel: tel,
                    mail: mail,
                    passwords: [password, confirmPassword],
                },
                "inscription"
            )

            // document.location.reload();
        }

    }

    // function handleChange(e) {
    //     console.log(document.getElementById(`${e.target.name + "Error"}`));
    //     switch (e.target.name) {

    //         case "mail":


    //         default:
    //             if (3 <= e.target.value.length && e.target.value.length < 45) {
    //                 console.log("salut");
    //                 document.getElementById(`${e.target.name + "Error"}`).style.display = "none";
    //                 setFamilyName(e.target.value)
    //             } else {
    //                 document.getElementById(`${e.target.name + "Error"}`).style.display = "block";
    //                 document.getElementById(`${e.target.name + "Error"}`).style.color = "red";
    //             }
    //     }

    // }




    return (<>
        <img className={styles.test} id="test" src="" alt="" />
        <img className={styles.test} id="test2" src="" alt="" />
        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className={`${styles.formulaire} br-small`}>

            <div className={`d-flex justify-center`}>

                {/* <button onClick={handlePhoto}>test</button> */}

                {/* <input type="text" placeholder="salut" /> */}


                <div>
                    <input       // Nom
                        type={`text`}
                        name={`familyName`}
                        id={`familyName`}
                        onChange={(e) => { setFamilyName(e.target.value), setFamilyNameError("") }}
                        placeholder={`Nom`}
                        autoComplete={`family-name`}
                        className={`inputPrimary`}
                    />
                    {familyNameError && <p>{familyNameError}</p>}
                </div>

                <div>
                    <input       // Prénom
                        type={`text`}
                        name={`givenName`}
                        id={`givenName`}
                        onChange={(e) => { setGivenName(e.target.value), setGivenNameError("") }}
                        placeholder={`Prénom`}
                        autoComplete={`given-name`}
                        className={`inputPrimary`}
                    />
                    {givenNameError && <p>{givenNameError}</p>}
                </div>

            </div>


            <div className={`d-flex justify-center`}>
                <input       // société
                    type={`text`}
                    name={`organization`}
                    id={`organization`}
                    onChange={(e) => { setOrganization(e.target.value) }}
                    placeholder={`Nom de votre société`}
                    autoComplete={`organization`}
                    className={`inputPrimary`}
                />

            </div>


            <div className={`d-flex justify-center`}>
                <div>
                    <input      // Email
                        type={`email`}
                        name={`mail`}
                        id={`mail`}
                        onChange={(e) => { setMail(e.target.value), setMailError("") }}
                        placeholder={`E-mail`}
                        autoComplete={`email`}
                        className={`inputPrimary`}
                    />
                    {mailError && <p>{mailError}</p>}
                </div>

                <div>
                    <input       // Téléphone
                        type={`tel`}
                        name={`tel`}
                        id={`tel`}
                        onChange={(e) => { setTel(e.target.value), setTelError("") }}
                        placeholder={`Téléphone`}
                        autoComplete={`tel`}
                        className={`inputPrimary`}
                    />
                    {telError && <p>{telError}</p>}
                </div>

            </div>


            <div className={`d-flex justify-center`}>

                <div>
                    <input       // Mot de passe
                        type={`password`}
                        name={`password`}
                        id={`password`}
                        onChange={(e) => { setPassword(e.target.value), setPasswordError("") }}
                        placeholder={`Mot de passe`}
                        autoComplete={`new-password`}
                        className={`inputPrimary`}
                    />
                    {passwordError && <p>{passwordError}</p>}
                </div>

                <div>
                    <input       // Confirmation mot de passe
                        type={`password`}
                        name={`confirmPassword`}
                        id={`confirmPassword`}
                        onChange={(e) => { setConfirmPassword(e.target.value), setConfirmPasswordError("") }}
                        placeholder={`Confirmation mot de passe`}
                        autoComplete={`new-password`}
                        className={`inputPrimary`}
                    />
                    {confirmPasswordError && <p>{confirmPasswordError}</p>}
                </div>

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