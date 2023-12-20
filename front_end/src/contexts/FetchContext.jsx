import { createContext, useState } from "react";
import propTypes from "prop-types";

export const FetchContext = createContext();


export function DataProvider({ children }) {

    const [contactResponse, setContactResponse] = useState(false);
    const [inscriptionResponse, setInscriptionResponse] = useState(false);
    const [connectionResponse, setConnectionResponse] = useState({ status: false, content: "" });


    async function fetchData(endpoint = null, content, target) {




        let url = "http://localhost:10000/";
        endpoint && (url = url + endpoint)
        // console.log(url);
        const response = await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(content),
        })



        switch (target) {
            case "contact":
                setContactResponse(await response.json());
                break;

            case "inscription":
                setInscriptionResponse(await response.json());
                break;

            case "connection":
                setConnectionResponse(await response.json());

                break;

            default:
                break;
        }
    }


    return (<>
        <FetchContext.Provider value={{ fetchData, contactResponse, inscriptionResponse, connectionResponse }}>
            {children}
        </FetchContext.Provider>
    </>)
}



DataProvider.propTypes = {
    children: propTypes.any
}