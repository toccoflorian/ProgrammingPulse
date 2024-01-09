import { H1Primary, H3Primary } from "../../../components/Titres";

import FormulaireContact from "../../../components/formulaires/FormulaireContact";
import { H2Primary } from "../../../components/Titres";
import styles from "./ContactPage.module.scss";



export default function ContactPage() {
    return (<>


        {/* EN-TETE */}
        <div className={`${styles.firstContainer} d-flex flex-column align-center`}>
            <H1Primary textContent={`Formulaire de Contact`} />
            <p className={`text-center`}>
                Que ce soit pour une demande de devis ou une question sur votre projet,
                n&#39;hésitez pas à me contacter en remplissant le formulaire approprié.
            </p>
        </div>



        {/* FORMULAIRES */}
        <div className={`${styles.forms} d-flex `}>

            {/* formulaire de contact */}
            <div className={`${styles.formulaireContact} f1 p25 d-flex flex-column justify-center align-center`}>

                <H2Primary textContent="Contactez moi" />

                <p className={`text-center`}>
                    Vous avez une question concernant un devis, votre projet ou autres, n&#39;hésitez pas à me contacter en remplissant ce formulaire.
                    <br /><br />
                    Pour une demande de devis merci de créer un compte (gratuit). 👉
                </p>

                <FormulaireContact />
            </div>



        </div>



    </>)
}