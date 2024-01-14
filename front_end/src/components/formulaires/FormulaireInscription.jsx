import { useContext, useEffect, useState } from "react";
import styles from './FormulaireInscription.module.scss'
import { FetchContext } from "../../contexts/FetchContext";
import { formIsValide } from "../../functions/formValidation";


export default function FormulaireInscription() {       // INSCRIPTION

    const [form, setForm] = useState({
        familyname: "",
        givenname: "",
        organization: "",
        tel: "",
        mail: "",
        password: "",
        confirmpassword: "",
    })
    const [formErrors, setFormErrors] = useState({
        familyname: "",
        givenname: "",
        tel: "",
        mail: "",
        password: "",
        confirmpassword: "",
    })

    const { fetchData, inscriptionResponse, connectionResponse } = useContext(FetchContext)          // contexct

    useEffect(() => {
        if (inscriptionResponse[0]) {
            fetchData.get(`/login?mail=${form.mail}&currentpassword=${form.password}`, "login")
        }
    }, [inscriptionResponse])        // effect

    function handleChange(e) {
        const { name, value } = e.target;       // recupère les data
        setForm(({ ...form, [name]: value }))           // enregistre la nouvelle valeur
        !formErrors[name + "Errors"] &&                     // réinitialise le message d'erreur
            setFormErrors({ ...formErrors, [name]: "" })
    }

    function handleSubmit(e) {           // au submit du formulaire
        e.preventDefault()
        console.log(form);
        formIsValide(form, setFormErrors) &&      // vérifie si pas d'erreurs de saisie sinon créer les messages d'erreurs
            fetchData.post("/create_new_user", form, "inscription")       // fetch les datas
    }

    return (<>
        <img className={styles.test} id="test" src="" alt="" />
        <img className={styles.test} id="test2" src="" alt="" />
        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className={`${styles.formulaire} br-small`}>

            <div className={`d-flex justify-center`}>

                <div>
                    <input       // Nom
                        type={`text`}
                        name={`familyname`}
                        id={`familyName`}
                        onChange={handleChange}
                        placeholder={`Nom`}
                        autoComplete={`family-name`}
                        className={`inputPrimary`}
                    />
                    {formErrors.familyname && <p>{formErrors.givenname}</p>}
                </div>

                <div>
                    <input       // Prénom
                        type={`text`}
                        name={`givenname`}
                        id={`givenName`}
                        onChange={handleChange}
                        placeholder={`Prénom`}
                        autoComplete={`given-name`}
                        className={`inputPrimary`}
                    />
                    {formErrors.givenname && <p>{formErrors.givenname}</p>}
                </div>

            </div>


            <div className={`d-flex justify-center`}>
                <input                // société
                    type={`text`}
                    name={`organization`}
                    id={`organization`}
                    onChange={handleChange}
                    placeholder={`Nom de votre société`}
                    autoComplete={`organization`}
                    className={`inputPrimary`}
                />

            </div>


            <div className={`d-flex justify-center`}>
                <div>
                    <input                   // Email
                        type={`email`}
                        name={`mail`}
                        id={`mail`}
                        onChange={handleChange}
                        placeholder={`E-mail`}
                        autoComplete={`email`}
                        className={`inputPrimary`}
                    />
                    {formErrors.mail && <p>{formErrors.mail}</p>}
                </div>

                <div>
                    <input                         // Téléphone
                        type={`tel`}
                        name={`tel`}
                        id={`tel`}
                        onChange={handleChange}
                        placeholder={`Téléphone`}
                        autoComplete={`tel`}
                        className={`inputPrimary`}
                    />
                    {formErrors.tel && <p>{formErrors.tel}</p>}
                </div>

            </div>


            <div className={`d-flex justify-center`}>

                <div>
                    <input                         // Mot de passe
                        type={`password`}
                        name={`password`}
                        id={`password`}
                        onChange={handleChange}
                        placeholder={`Mot de passe`}
                        autoComplete={`new-password`}
                        className={`inputPrimary`}
                    />
                    {formErrors.password && <p>{formErrors.password}</p>}
                </div>

                <div>
                    <input                          // Confirmation mot de passe
                        type={`password`}
                        name={`confirmpassword`}
                        id={`confirmPassword`}
                        onChange={handleChange}
                        placeholder={`Confirmation mot de passe`}
                        autoComplete={`new-password`}
                        className={`inputPrimary`}
                    />
                    {formErrors.confirmpassword && <p>{formErrors.confirmpassword}</p>}
                </div>

            </div>

            <div className={`d-flex justify-center`}>
                <button className={`SubmitButton`}>Créer un compte</button>
            </div>
            {inscriptionResponse[0] ?
                connectionResponse[0] &&
                document.location.reload()           // Si inscription et connexion réussi, recharge la page
                :
                <p className={`debugRed`}>{inscriptionResponse[1]}</p>  // Si inscription échouée, affiche le message
            }
        </form>

    </>)
}