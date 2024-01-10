import { useContext, useEffect, useState } from "react";
import { FetchContext } from "../../../contexts/FetchContext";
import StarsEvaluation from "../../../components/StarsEvaluation";

export default function PortfolioTemoignagePage() {

    const { fetchData, projects } = useContext(FetchContext);

    const [projectIndex, setProjectIndex] = useState(0);

    useEffect(() => {
        fetchData.get("get_projects", "projects")
    }, [])

    function handlePreviousProject() {
        if (projectIndex - 1 >= 0) {
            setProjectIndex(projectIndex - 1)
        } else {
            setProjectIndex(projects.length - 1)
        }
        console.log(projects);
    }

    function handleNextProject() {
        if (projectIndex + 1 < projects.length) {
            setProjectIndex(projectIndex + 1)
        } else {
            setProjectIndex(0)
        }
        console.log(projects);
    }

    return (<>
        <h1 className={`H1Secondary`}>Portfolio et retours clients</h1>

        {projects &&
            <div>
                <h2>{projects[projectIndex].project_name}</h2>
                <p>{projects[projectIndex].description}</p>
                <StarsEvaluation note={projects[projectIndex].note} />
                <p>
                    {projects[projectIndex].comment &&
                        JSON.parse(projects[projectIndex].comment).text}
                </p>
                <button onClick={handlePreviousProject}>precedent</button>
                <button onClick={handleNextProject}>Suivant</button>
            </div>
        }
    </>)
}