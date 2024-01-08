import { useContext, useEffect, useState } from "react";
import { H1Primary } from "../../../components/Titres";

import { FetchContext } from "../../../contexts/FetchContext";
import styles from "./EspaceClientPage.module.scss";

import ProjectsSection from "../ProjectsSection";

import ChangeUserImages from "../ChangeUserImages";


export default function EspaceClientPage() {


    const { fetchData, currentUser } = useContext(FetchContext);

    const [userImageFile, setUserImageFile] = useState(null);
    const [changeUserImage, setChangeUserImage] = useState(false);

    const [organizationImageFile, setOrganizationImage] = useState(false);
    const [changeOrganizationImage, setChangeOrganizationImage] = useState(false);


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

                        <img
                            onClick={() => { setChangeUserImage(!changeUserImage) }}
                            src={"/user_images/user_image_" + String(currentUser.id) + ".webp"}
                            alt="Image de profil"
                            className={`br-medium f1`}

                        />
                        <div className="f1">
                            <p className={``}>{currentUser.family_name} {currentUser.given_name}</p>
                            <p>{currentUser.mail}</p>
                            <p>{currentUser.tel}</p>
                        </div>

                        <p className="f1">{currentUser.organization}</p>
                        <img
                            onClick={() => { setChangeOrganizationImage(!changeOrganizationImage) }}
                            src={"/organization_images/organization_image_" + String(currentUser.id) + ".webp"}
                            alt="Image de profil"
                            className="f1"
                        />
                    </div>
                    <p>Membre depuis le {currentUser.creation_date.split("T")[0]}</p>


                    <ChangeUserImages
                        userImageFile={userImageFile}
                        setUserImageFile={setUserImageFile}
                        changeUserImage={changeUserImage}
                        setChangeUserImage={setChangeUserImage}
                        organizationImageFile={organizationImageFile}
                        setOrganizationImage={setOrganizationImage}
                        changeOrganizationImage={changeOrganizationImage}
                        setChangeOrganizationImage={setChangeOrganizationImage}
                        fetchData={fetchData}
                    />



                </div>

                {currentUser.projects &&
                    <ProjectsSection projects={currentUser.projects} />}



            </>}
    </>)
}