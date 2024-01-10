import styles from "./FormulaireContact.module.scss";
import { useContext, useEffect, useState } from "react";
import { FetchContext } from "../../contexts/FetchContext";
import { formIsValide } from "../../functions/formValidation";

export default function FormulaireContact() {

    const [form, setForm] = useState({
        familyname: "",
        givenname: "",
        organization: "",
        tel: "",
        mail: "",
        message: "",
    });
    const [formErrors, setFormErrors] = useState({
        familyname: "",
        givenname: "",
        tel: "",
        mail: "",
        message: "",
    });


    const { fetchData, contactResponse } = useContext(FetchContext);

    useEffect(() => {
        console.log('data', contactResponse);
    }, [contactResponse, formErrors]);


    function handleChange(e) {
        const { name, value } = e.target;       // recupère les data
        setForm(({ ...form, [name]: value }));       // enregistre la nouvelle valeur
        !formErrors[name + "Errors"] &&                     // réinitialise le message d'erreur
            setFormErrors({ ...formErrors, [name]: "" });
    }


    function handleSubmit(e) {           // au submit du formulaire
        e.preventDefault();
        console.log('submit');
        console.log(formErrors);
        formIsValide(form, setFormErrors) &&      // vérifie si pas d'erreurs de saisie sinon créer les messages d'erreurs
            fetchData.post("/send_contact_form", JSON.stringify(form), "contact");    // fetch les datas
        console.log(formErrors);
    }

    return (<>
        <form onSubmit={handleSubmit} className={`${styles.formulaire} d-flex flex-column justify-center align-center width100 br-small p10`}>

            <div className={` d-flex`}>

                <div>
                    <input       // nom
                        type={`text`}
                        name={`familyname`}
                        id={`familyNameContact`}
                        onChange={handleChange}
                        placeholder={`Nom`}
                        autoComplete={`family-name`}
                        className={`inputPrimary`}
                    />
                    {formErrors.familyname && <p>{formErrors.familyname}</p>}
                </div>

                <div>
                    <input        // prénom
                        type={`text`}
                        name={`givenname`}
                        id={`givenNameContact`}
                        onChange={handleChange}
                        placeholder={`Prénom`}
                        autoComplete={`given-name`}
                        className={`inputPrimary`}
                    />
                    {formErrors.givenname && <p>{formErrors.givenname}</p>}
                </div>

            </div>

            <input         // société
                type={`text`}
                name={`organization`}
                id={`organizationContact`}
                onChange={handleChange}
                placeholder={`Société`}
                autoComplete={`organization`}
                className={`inputPrimary`}
            />

            <div className={` d-flex`}>
                <div>
                    <input
                        type={`email`}            // téléphone
                        name={`mail`}
                        id={`mailContact`}
                        onChange={handleChange}
                        placeholder={`E-mail`}
                        autoComplete={`email`}
                        className={`inputPrimary`}
                    />
                    {formErrors.mail && <p>{formErrors.mail}</p>}
                </div>

                <div>
                    <input         // telephone
                        type={`tel`}
                        name={`tel`}
                        id={`telContact`}
                        onChange={handleChange}
                        placeholder={`Téléphone`}
                        autoComplete={`tel`}
                        className={`inputPrimary`}
                    />
                    {formErrors.tel && <p>{formErrors.tel}</p>}
                </div>

            </div>

            <div>
                <textarea
                    name={`message`}            // message
                    id={`message`}
                    onChange={handleChange}
                    placeholder={`message`}
                    className={`textAreaPrimary`}
                />
                {formErrors.message && <p>{formErrors.message}</p>}
            </div>

            <button className={`SubmitButton`}>Envoyer</button>

            {
                contactResponse[0] ? <p className={`debugGreen`}>{contactResponse[1]}</p> : <p className={`debugRed`}>{contactResponse[1]}</p>}
        </form>
    </>)
}