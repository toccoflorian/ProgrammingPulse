import { useState } from "react";
import { ButtonNoPrimary, ButtonPrimary, ButtonYesPrimary } from "../../components/Buttons";
import { InputTextPrimary } from "../../components/Inputs";
import { H1Primary, H1Secondary, H2Primary, H2Secondary, H3Primary } from "../../components/Titres";

export default function TarifsPage() {


    return (<>


        <h1>Buttons</h1>
        <p>ButtonYesPrimary</p>
        <ButtonPrimary textContent={`button primary`} />

        <p>ButtonYesPrimary</p>
        <ButtonYesPrimary textContent={`Valider`} />

        <p>ButtonNoPrimary</p>
        <ButtonNoPrimary textContent={`Annuler`} />

        <h1>Inputs</h1>

        <p>InputTextPrimary</p>
        <InputTextPrimary />

        <h1>Titres</h1>
        <H1Primary textContent="H1Primary" />
        <H1Secondary textContent={`H1Secondary`} />

        <H2Primary textContent="H2Primary" />
        <H2Secondary textContent={`H2Secondary`} />

        <H3Primary textContent="H3Primary" />
    </>)
}