import { createContext, useState } from "react";


export const APIContext = createContext();


export function DataProvider({ children }) {

    const [fetchResponse, setFetchResponse] = useState(["Bienvenue."]);

    async function fetchData(endpoint = null, content, returnContentType = null) {




        let url = "http://localhost:10000/";
        endpoint && (url = url + endpoint)
        // console.log(url);
        const response = await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(content),
        })

        setFetchResponse([await response.json()]);
    }


    return (<>
        <APIContext.Provider value={{ fetchData, fetchResponse }}>
            {children}
        </APIContext.Provider>
    </>)
}


