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
            <div className={`${styles.projectContainer}`} style={{ backgroundImage: `url("https://ppstudio.fr/static/images/project_logos/project_logo_${projects[projectIndex].id}.webp")` }}>




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