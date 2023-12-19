import { H1Primary, H3Primary } from "../../../components/Titres";
import FormulaireAccount from "../formulaires/FormulaireConnexion";
import FormulaireContact from "../formulaires/FormulaireContact";
import { H2Primary } from "../../../components/Titres";
import styles from "./ContactPage.module.scss";
import FormulaireInscription from "../formulaires/FormulaireInscription";


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


            {/* formulaire connexion / création de compte */}
            <div className={` f1 p25`}>

                <div className={`d-flex flex-column justify-center align-center`}>
                    <H2Primary textContent={`Connexion`} />
                    <FormulaireAccount />
                </div>

                <div className="separatorVerticalPrimary"></div>

                <div className={`${styles.formulaireInscription} d-flex flex-column justify-center align-center`}>
                    <H2Primary textContent={`Créer un compte`} />
                    <FormulaireInscription />
                </div>
            </div>
        </div>


        {/* TEXTE 1 */}
        <div className={`${styles.texte1} d-flex flex-column justify-center align-center width60 mrl-auto`}>

            <H3Primary textContent="Créez Votre Compte en Toute Confiance" />

            <p className={`text-center`}>
                Rejoignez Programming Pulse en toute sérénité. La création de votre compte est une démarche simple et sécurisée :
            </p>

            <ul>
                <li>
                    <span className={`blueWordPrimary`}>
                        Sécurité Maximale 🔒 :
                    </span>
                    <br />
                    Nous utilisons des protocoles de cryptage pour garantir que vos informations personnelles sont protégées et à l&#39;abri des regards indiscrets.
                </li>

                <li>
                    <span className={`blueWordPrimary`}>
                        Confidentialité Respectée 🤐 :
                    </span>
                    <br />
                    Votre vie privée nous est précieuse. Aucune de vos données personnelles n&#39;est vendue, partagée ou divulguée à des tiers.
                </li>

                <li>
                    <span className={`blueWordPrimary`}>
                        Contrôle Total sur vos Données 🛠️ :
                    </span>
                    <br />
                    Vous avez à tout moment la possibilité de modifier, exporter ou supprimer vos informations de notre base de données.
                </li>
            </ul>

            <p className={`text-center`}>
                Nous nous engageons à maintenir un espace sûr et transparent pour tous nos utilisateurs. Votre confiance est notre priorité.
            </p>
        </div>
    </>)
}