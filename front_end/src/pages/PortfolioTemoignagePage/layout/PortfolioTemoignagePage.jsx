import { useContext, useEffect, useState } from "react";
import { FetchContext } from "../../../contexts/FetchContext";
import StarsEvaluation from "../../../components/StarsEvaluation";
import styles from "./PortfolioTemoignagePage.module.scss";

export default function PortfolioTemoignagePage() {

    const { fetchData, projects } = useContext(FetchContext);

    const [projectIndex, setProjectIndex] = useState(0);
    const [projectImageIndex, setProjectImageIndex] = useState(1)

    useEffect(() => {
        fetchData.get("/get_projects", "projects")
    }, [])

    function handlePreviousProject() {
        if (projectIndex - 1 >= 0) {
            setProjectIndex(projectIndex - 1)
        } else {
            setProjectIndex(projects.length - 1)
        }
        setProjectImageIndex(1)
        console.log(projects);
    }

    function handleNextProject() {
        if (projectIndex + 1 < projects.length) {
            setProjectIndex(projectIndex + 1)
        } else {
            setProjectIndex(0)
        }
        setProjectImageIndex(1)
        console.log(projects);
    }

    function handlePreviousProjectImage() {
        if (projectImageIndex - 1 > 0) {
            setProjectImageIndex(projectImageIndex - 1)
        } else {
            setProjectImageIndex(projects[projectIndex].nb_of_images)
        }
    }

    function handleNextProjectImage() {
        if (projectImageIndex + 1 <= projects[projectIndex].nb_of_images) {
            setProjectImageIndex(projectImageIndex + 1)
        } else {
            setProjectImageIndex(1)
        }
    }

    return (<>
        <h1 className={`${styles.h1} H1Secondary`}>Portfolio et retours clients</h1>

        {projects.length &&
            <div className={`${styles.projectContainer}`}>

                <div className={`${styles.projectLogoContainer}`}>

                    <img className={`${styles.projectLogo}`} src={`http://localhost:10000/static/images/project_logos/project_logo_${projects[projectIndex].id}.webp`} alt="" />
                </div>

                <div className={`${styles.nameAndNoteContainer}`}>
                    <h2>{projects[projectIndex].project_name}</h2>

                    <div className={`${styles.starsContainer}`}>
                        <StarsEvaluation note={projects[projectIndex].note} />

                    </div>
                </div>


                <div className={`${styles.descriptionContainer}`}>
                    <p>{projects[projectIndex].description}</p>
                </div>



                {/* <h4>Commentaire:</h4>
                <p>
                    {projects[projectIndex].comment &&
                        JSON.parse(projects[projectIndex].comment).text}
                </p> */}

                <div className={`${styles.projectImageContainer}`}>

                    <div>
                        <button onClick={() => { handlePreviousProjectImage(projects[projectIndex].nb_of_images) }}>precedent</button>
                    </div>

                    <div className={`${styles.imageContainer}`}>
                        <img id="projectImage" src={`http://localhost:10000/static/images/project_images/project_image_${projects[projectIndex].id}_${projectImageIndex}.webp`} alt="" loading="lazy" />
                    </div>

                    <div>
                        <button onClick={() => { handleNextProjectImage(projects[projectIndex].nb_of_images) }}>Suivant</button>
                    </div>


                </div>


                <div className={`${styles.projectNav}`}>
                    <img className={`${styles.projectNavPrevious}`} onClick={handlePreviousProject} src="images/arrow-to-left.png" alt="" />
                    <img className={`${styles.projectNavNext}`} onClick={handleNextProject} src="images/arrow-to-right.png" alt="" />
                    {/* <button>precedent</button>
                    <button>Suivant</button> */}
                </div>

            </div>
        }
    </>)
}