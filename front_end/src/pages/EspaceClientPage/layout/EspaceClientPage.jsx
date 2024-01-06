import { useContext, useEffect } from "react";
import { H1Primary } from "../../../components/Titres";

import { FetchContext } from "../../../contexts/FetchContext";
import styles from "./EspaceClientPage.module.scss";

import ProjectsSection from "../ProjectsSection";



export default function EspaceClientPage() {


    const { fetchData, currentUser } = useContext(FetchContext);

    useEffect(() => {
        fetchData.get("get_user", "user");
        console.log(currentUser);
    }, [])

    return (<>

        <H1Primary textContent={`Espace client`} />

        <p>
            Retrouvez ici vos informations personnelles ainsi que vos projets et devis. Vous pouvez noter un projet terminé et laisser un commentaire,
            la note et le commentaire seront visibles publiquement sur la page &#39;Portfolio&#39;. Vous pouvez également laisser un commentaire privé qui sera
            visible uniquement par Programming Pulse Studio. Vos données personnelles ne seront en aucun cas visibles publiquement.
        </p>

        {!currentUser ?
            <>
                <h2>Connectez vous pour accèder à votre espace.</h2>
            </>
            :
            <>
                <div className={`${styles.container} mb10`}>
                    <h2>Mes Informations</h2>
                    <div className={`d-flex justify-space-b`}>
                        <div>
                            <p className={`maxContent`}>{currentUser.family_name} {currentUser.given_name} | {currentUser.organization}</p>
                            <p>{currentUser.mail}</p>
                            <p>{currentUser.tel}</p>
                        </div>

                        <div>
                            <p>
                                Membre depuis le {currentUser.creation_date.split("T")[0]}
                            </p>
                        </div>
                    </div>
                </div>

                {currentUser.projects &&
                    <ProjectsSection projects={currentUser.projects} />}



            </>}
    </>)
}