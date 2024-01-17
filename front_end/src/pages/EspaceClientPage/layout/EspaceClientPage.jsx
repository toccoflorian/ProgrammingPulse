import { useContext, useEffect, useState } from "react";
import FormulaireInscription from "../../../components/formulaires/FormulaireInscription";
import { FetchContext } from "../../../contexts/FetchContext";
import styles from "./EspaceClientPage.module.scss";
import FormulaireConnexion from "../../../components/formulaires/FormulaireConnexion"
import ProjectsSection from "../ProjectsSection";

import ChangeUserImages from "../ChangeUserImages";
import LogOutButton from "../../../components/LogOut";


export default function EspaceClientPage() {


    const { fetchData, currentUser, connectionResponse } = useContext(FetchContext);

    const [userImageFile, setUserImageFile] = useState(null);
    const [changeUserImage, setChangeUserImage] = useState(false);

    const [organizationImageFile, setOrganizationImage] = useState(false);
    const [changeOrganizationImage, setChangeOrganizationImage] = useState(false);


    useEffect(() => {
        fetchData.get("/get_user", "user");
        console.log(currentUser);
    }, [])


    return (<>
        <h1 className={`H1Primary`}>Espace client</h1>

        <p>
            Retrouvez ici vos informations personnelles ainsi que vos projets et devis. Vous pouvez noter un projet terminé et laisser un commentaire,
            la note et le commentaire seront visibles publiquement sur la page &#39;Portfolio&#39;. Vous pouvez également laisser un commentaire privé qui sera
            visible uniquement par Programming Pulse Studio. Vos données personnelles ne seront en aucun cas visibles publiquement.
        </p>

        {!currentUser ?         // Si utilisateur NON connecté (cookie et signature NON présents)
            <>
                <h2>Connectez vous pour accèder à votre espace.</h2>

                {/* formulaire connexion / création de compte */}
                <div className={`d-flex p25`}>

                    {/* formulaire connexion */}
                    <div className={`d-flex flex-column align-center`}>
                        <h2 className={`H2Primary`}>Connexion</h2>
                        <FormulaireConnexion />
                    </div>

                    <div className="separatorVerticalPrimary"></div>

                    {/* formulaire création de compte */}
                    <div className={`${styles.formulaireInscription} d-flex flex-column align-center`}>
                        <h2 className={`H2Primary`}>Créer un compte</h2>
                        <FormulaireInscription />
                    </div>
                </div>

                {/* TEXTE 1 */}
                <div className={`${styles.texte1} d-flex flex-column justify-center align-center width60 mrl-auto`}>
                    <h3 className={`H3Primary`}>Créez Votre Compte en Toute Confiance</h3>

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
            </>
            :         // Si utilisateur connecté (cookie et signature présents)
            <>
                {/* Informations utilisateur */}
                <div className={`${styles.container} mb10`}>

                    <h2>Membre depuis le {currentUser.creation_date.split("T")[0]}</h2>

                    <div className={`d-flex justify-space-e`}>
                        <div className="">

                            {/* <h3>Membre depuis le {currentUser.creation_date.split("T")[0]}</h3> */}

                            <img
                                onClick={() => { setChangeUserImage(!changeUserImage) }}
                                src={"/user_images/user_image_" + String(currentUser.id) + ".webp"}
                                alt="Image de profil"
                                className={``}
                            />

                            <div>
                                <p className={``}>{currentUser.family_name} {currentUser.given_name}</p>
                                <p>{currentUser.mail}</p>
                                <p>{currentUser.tel}</p>
                            </div>
                        </div>

                        <LogOutButton />

                        <ChangeUserImages
                            userImageFile={userImageFile}
                            setUserImageFile={setUserImageFile}
                            changeUserImage={changeUserImage}
                            setChangeUserImage={setChangeUserImage}
                            fetchData={fetchData}
                        />

                    </div>
                </div>

                {/* Informations entreprise de l'utilisateur */}
                <div className={`${styles.container} mb10`}>
                    <h3>Entreprise</h3>

                    <img
                        onClick={() => { setChangeOrganizationImage(!changeOrganizationImage) }}
                        src={"/organization_images/organization_image_" + String(currentUser.id) + ".webp"}
                        alt="Image de profil"
                        className=""
                    />

                    <p className="">{currentUser.organization}</p>
                    <ChangeUserImages
                        organizationImageFile={organizationImageFile}
                        setOrganizationImage={setOrganizationImage}
                        changeOrganizationImage={changeOrganizationImage}
                        setChangeOrganizationImage={setChangeOrganizationImage}
                        fetchData={fetchData}
                    />
                </div>

                {/* Projets de l'utilisateur */}
                {currentUser.projects &&
                    <ProjectsSection projects={currentUser.projects} />}



            </>}
    </>)
}