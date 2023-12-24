import { useContext } from "react"
import { FetchContext } from "../../../contexts/FetchContext"





export default function EspaceClientPage() {

    const { fetchData } = useContext(FetchContext);

    async function handleClick() {
        // const isLoged = await fetchData("is_loged", "content", "is_loged");
        // console.log("isLoged:", isLoged);
        // fetchData("is_loged", "content", "is_loged")
    }

    return (<>
        <h1>is log</h1>
        <button onClick={handleClick}>
            fetchData
        </button>
    </>)
}