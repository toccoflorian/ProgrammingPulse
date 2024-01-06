import { InputTextPrimary, TextArea } from "../Inputs";
import styles from "./FormulaireContact.module.scss";
import { useContext, useEffect, useState } from "react";
import { FetchContext } from "../../contexts/FetchContext";
import { ButtonPrimary } from "../Buttons";

export default function FormulaireContact() {

    const [familyNameContact, setFamilyNameContact] = useState('');         //states
    const [givenNameContact, setGivenNameContact] = useState('');
    const [organizationContact, setOrganizationContact] = useState('');
    const [telContact, setTelContact] = useState('');
    const [mailContact, setMailContact] = useState('');
    const [message, setMessage] = useState('');



    const { fetchData, contactResponse } = useContext(FetchContext)          // contexct

    useEffect(() => {
        console.log('data', contactResponse);
    }, [contactResponse])        // effect

    function handleSubmit(e) {           // au submit du formulaire
        e.preventDefault()
        const inputsValues = {                  // recuperation des valeurs des inputs
            familyname: familyNameContact,
            givenname: givenNameContact,
            organization: organizationContact,
            tel: telContact,
            mail: mailContact,
            message,
        }
        // console.log(inputsValues);
        fetchData.post("/send_contact_form", JSON.stringify(inputsValues), "contact")       // fetch les datas

    }

    return (<>
        <form onSubmit={handleSubmit} className={`${styles.formulaire} d-flex flex-column justify-center align-center width100 br-small p10`}>

            <div className={` d-flex`}>

                <InputTextPrimary       // nom
                    type={`text`}
                    name={`familyNameContact`}
                    id={`familyNameContact`}
                    onChange={(e) => { setFamilyNameContact(e.target.value) }}
                    placeholder={`Nom`}
                    autoComplete={`family-name`}
                />

                <InputTextPrimary        // prénom
                    type={`text`}
                    name={`givenNameContact`}
                    id={`givenNameContact`}
                    onChange={(e) => { setGivenNameContact(e.target.value) }}
                    placeholder={`Prénom`}
                    autoComplete={`given-name`}
                />
            </div>

            <InputTextPrimary         // société
                type={`text`}
                name={`organizationContact`}
                id={`organizationContact`}
                onChange={(e) => { setOrganizationContact(e.target.value) }}
                placeholder={`Société`}
                autoComplete={`organization`}
            />

            <div className={` d-flex`}>
                <InputTextPrimary
                    type={`email`}            // téléphone
                    name={`mailContact`}
                    id={`mailContact`}
                    onChange={(e) => { setMailContact(e.target.value) }}
                    placeholder={`E-mail`}
                    autoComplete={`email`}
                />
                <InputTextPrimary         // telephone
                    type={`tel`}
                    name={`telContact`}
                    id={`telContact`}
                    onChange={(e) => { setTelContact(e.target.value) }}
                    placeholder={`Téléphone`}
                    autoComplete={`tel`}
                />
            </div>

            <TextArea
                name={`message`}            // message
                id={`message`}
                onChange={(e) => { setMessage(e.target.value) }}
                placeholder={contactResponse}
            />

            <ButtonPrimary textContent={`Envoyer`} />
            {
                contactResponse[0] ? <p className={`debugGreen`}>{contactResponse[1]}</p> : <p className={`debugRed`}>{contactResponse[1]}</p>}
        </form>
    </>)
}