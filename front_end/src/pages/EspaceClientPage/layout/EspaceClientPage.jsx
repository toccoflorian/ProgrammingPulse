import { useContext, useEffect } from "react"
import { FetchContext } from "../../../contexts/FetchContext"



export default function EspaceClientPage() {

    // const [currentUser, setCurrentUser] = useState(null);

    const { fetchData, currentUser } = useContext(FetchContext);

    useEffect(() => {
        fetchData.get("get_user", "user");
        console.log(currentUser);
    }, [])


    return (<>

        <h1>Espace client</h1>

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
                <div className={` debugBlue`}>
                    <h2>Mes Informations</h2>
                    <div className={`d-flex justify-space-b`}>
                        <div>
                            <p>{currentUser.family_name} {currentUser.given_name}</p>
                            <p>{currentUser.organization}</p>
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

                <div>
                    <h2>Mes Projets</h2>
                    <div>
                        {currentUser.projects &&
                            currentUser.projects.map((project, index) => {
                                return (
                                    <div key={index} className={`debugGreen`}>
                                        <h3>{project.project_name} - {project.state}</h3>
                                        <p>Date de debut: {project.start_date.split("T")[0]}</p>
                                        <p>Date de fin: {project.end_date}</p>
                                        <p>Déscription:</p>
                                        <p>{project.description}</p>
                                        <div>
                                            étoiles pour la note
                                        </div>

                                        <div>
                                            <button>Voir le devis</button>

                                            <button>Atribuer une Note</button>

                                            <button>Laisser un commentaire</button>
                                        </div>

                                    </div>
                                )
                            })}
                    </div>
                </div>
            </>}
    </>)
}