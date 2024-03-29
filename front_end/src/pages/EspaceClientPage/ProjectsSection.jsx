import styles from "./ProjectsSection.module.scss";
import ModalEditNote from "../../components/ModalEditNote";
import StarsEvaluation from "../../components/StarsEvaluation";
import propTypes from "prop-types";

export default function ProjectsSection(props) {


    function handleNote(editNoteId) {
        console.log(document.getElementById(editNoteId));
        document.getElementById(editNoteId).style.display = "flex";
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
                                    <button className={`SubmitButton`}>Voir le devis</button>
                                    {!project.note &&
                                        <button onClick={() => { handleNote(`editNote${index}`) }} className={`SubmitButton`}>Atribuer une Note</button>}
                                    <ModalEditNote id={`editNote${index}`} project={project} />
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