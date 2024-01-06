import styles from "./ProjectsSection.module.scss";
import { ModalEditNote } from "../../components/Modals";
import StarsEvaluation from "../../components/StarsEvaluation";
import { ButtonPrimary } from "../../components/Buttons";
import propTypes from "prop-types";

export default function ProjectsSection(props) {


    function handleNote() {
        document.getElementById("modalEditNote").style.display = "flex";
    }

    return (<>
        <div className={`${styles.container}`}>
            <h2>Mes Projets</h2>
            <div>
                {props.projects &&
                    props.projects.map((project, index) => {
                        return (
                            <div key={index} className={`debugGreen`}>
                                <h3>{project.project_name} - {project.state}</h3>
                                <p>Date de debut: {project.start_date.split("T")[0]}</p>
                                <p>Date de fin: {project.end_date}</p>
                                <p>Déscription:</p>
                                <p>{project.description}</p>

                                {project.note &&            // afficher la note (étoiles) si il y a une note
                                    <StarsEvaluation note={project.note} />}

                                <div className={`d-flex`}>

                                    <ButtonPrimary textContent={`Voir le devis`} />
                                    {!project.note &&
                                        <ButtonPrimary onClick={() => { handleNote(project.id) }} textContent={`Atribuer une Note`} />}
                                    <ModalEditNote project={project} />
                                </div>

                            </div>
                        )
                    })}
            </div>
        </div>
    </>)
}

ProjectsSection.propTypes = {
    projects: propTypes.array,
}