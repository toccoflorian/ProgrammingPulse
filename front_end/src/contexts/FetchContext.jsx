import { createContext, useState } from "react";
import propTypes from "prop-types";
import { sessionConnection } from "../functions/sessionManager";

export const FetchContext = createContext();


export function DataProvider({ children }) {

    const [contactResponse, setContactResponse] = useState(false);
    const [inscriptionResponse, setInscriptionResponse] = useState(false);
    const [connectionResponse, setConnectionResponse] = useState({ status: false });
    const [currentUser, setCurrentUser] = useState(false);

    const fetchData = {

        get: async function (endpoint = null, target) {
            let url = "http://localhost:10000/";
            endpoint && (url = url + endpoint)
            // console.log(url);
            const response = await fetch(url, {
                method: "GET",
                credentials: 'include',
            })

            let jsonUser;
            let user;

            switch (target) {
                case "user":
                    jsonUser = await response.json()
                    user = JSON.parse(jsonUser.content)
                    user.projects = user.projects.map(project => JSON.parse(project))
                    setCurrentUser(user)
                    break;

                case "login":
                    setConnectionResponse(await sessionConnection(await response.json()))
            }
        },

        post: async function (endpoint = null, content, target) {
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
            }
        }
    }


    return (<>
        <FetchContext.Provider value={{ fetchData, contactResponse, inscriptionResponse, currentUser, connectionResponse }}>
            {children}
        </FetchContext.Provider>
    </>)
}


DataProvider.propTypes = {
    children: propTypes.any
}