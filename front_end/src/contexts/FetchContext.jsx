import { createContext, useState } from "react";
import propTypes from "prop-types";


export const FetchContext = createContext();


export function DataProvider({ children }) {

    const [contactResponse, setContactResponse] = useState(false);
    const [inscriptionResponse, setInscriptionResponse] = useState(false);


    async function fetchData(endpoint = null, content, target) {

        let url = "http://localhost:10000/";
        endpoint && (url = url + endpoint)
        // console.log(url);
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content),
            credentials: 'include',
        })


        switch (target) {
            case "contact":
                setContactResponse(await response.json());
                break;

            case "inscription":
                setInscriptionResponse(await response.json());
                break;

            case "login":
                return await response.json();

            case "get_user":
                return await response.json();

        }
    }


    return (<>
        <FetchContext.Provider value={{ fetchData, contactResponse, inscriptionResponse }}>
            {children}
        </FetchContext.Provider>
    </>)
}



DataProvider.propTypes = {
    children: propTypes.any
}