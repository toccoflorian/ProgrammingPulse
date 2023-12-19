import { createContext, useState } from "react";
import propTypes from "prop-types";

export const APIContext = createContext();


export function DataProvider({ children }) {

    const [contactResponse, setContactResponse] = useState(false);
    const [inscriptionResponse, setInscriptionResponse] = useState(false);

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
                setTimeout(() => {
                    setContactResponse(false);
                }, 1000 * 10)
                break;

            case "inscription":
                setInscriptionResponse(await response.json());
                setTimeout(() => {
                    setInscriptionResponse(false);
                }, 1000 * 10)
                break;

            default:
                break;
        }

    }


    return (<>
        <APIContext.Provider value={{ fetchData, contactResponse, inscriptionResponse }}>
            {children}
        </APIContext.Provider>
    </>)
}



DataProvider.propTypes = {
    children: propTypes.any
}