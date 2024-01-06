import { useContext, useEffect, useState } from "react"
import { H1Secondary } from "../../../components/Titres"
import { FetchContext } from "../../../contexts/FetchContext"

export default function PortfolioTemoignagePage() {

    const { fetchData, projects } = useContext(FetchContext);

    const [projectIndex, setProjectIndex] = useState(0);

    useEffect(() => {
        fetchData.get("get_projects", "projects")
    }, [])

    function handleNextProject() {
        if (projectIndex + 1 < projects.length) {
            setProjectIndex(projectIndex + 1)
        } else {
            setProjectIndex(0)
        }
        console.log(projects);
    }

    return (<>

        <H1Secondary textContent={`Portfolio et retours clients`} />

        {projects &&
            <div>
                <h2>{projects[projectIndex].project_name}</h2>
                <p>{projects[projectIndex].description}</p>
                <p>{"*".repeat(projects[projectIndex].note)}{".".repeat(5 - projects[projectIndex].note)}</p>
                <p>
                    {projects[projectIndex].comment &&
                        JSON.parse(projects[projectIndex].comment).text}
                </p>
                <button onClick={handleNextProject}>Suivant</button>
            </div>
        }
    </>)
}