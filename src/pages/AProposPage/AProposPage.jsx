import { ButtonNoPrimary, ButtonYesPrimary, ButtonYesSecondary } from "../../components/Buttons";
import { InputTextPrimary } from "../../components/Inputs";
import { H1Primary, H2Primary, H3Primary } from "../../components/Titres";


export default function AProposPage() {

    return (<>

        <h1>Buttons</h1>
        <p>ButtonYesPrimary</p>
        <ButtonYesPrimary buttonTextContent={`Valider`} />

        <p>ButtonYesSecondary</p>
        <ButtonYesSecondary buttonTextContent={`Envoyer`} />

        <p>ButtonNoPrimary</p>
        <ButtonNoPrimary buttonTextContent={`Annuler`} />

        <h1>Inputs</h1>

        <p>InputTextPrimary</p>
        <InputTextPrimary />

        <h1>Titres</h1>
        <H1Primary textContent="H1Primary" />
        <H2Primary textContent="H2Primary" />

        <H3Primary textContent="H3Primary" />
    </>)
}