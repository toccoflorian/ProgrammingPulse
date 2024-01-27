import { createContext, useState } from "react";
import propTypes from "prop-types";
import { sessionConnection } from "../functions/sessionManager";

export const FetchContext = createContext();


export function DataProvider({ children }) {

    const [contactResponse, setContactResponse] = useState(false);
    const [inscriptionResponse, setInscriptionResponse] = useState(false);
    const [logOutResponse, setLogOutResponse] = useState(false);
    const [connectionResponse, setConnectionResponse] = useState({ status: false });
    const [currentUser, setCurrentUser] = useState(false);
    const [projects, setProjects] = useState(false);

    const fetchData = {

        get: async function (endpoint = null, target) {
            let url = "http://localhost:10000/api";
            endpoint && (url = url + endpoint)
            console.log(url);
            const response = await fetch(url, {
                headers: { "Content-Type": "application/json" },
                method: "GET",
                credentials: 'include',
            })

            let user;
            let allProjects;

            switch (target) {
                case "user":
                    user = await response.json()
                    if (user.status) {
                        user = JSON.parse(user.content)
                        user.projects = user.projects.map(project => JSON.parse(project))
                        setCurrentUser(user)
                    } else {
                        setConnectionResponse(user.content)
                    }

                    break;

                case "login":
                    setConnectionResponse(await sessionConnection(await response.json()))
                    break;

                case "projects":
                    allProjects = await response.json();
                    setProjects(allProjects.map(project => JSON.parse(project)));
            }
        },

        post: async function (endpoint = null, content, target) {
            let url = "http://localhost:10000/api";
            endpoint && (url = url + endpoint)
            console.log(url);
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

                case "logout":
                    setLogOutResponse(await response.json());
                    break;
            }
        },

        upload: async function (file, image_of) {
            const cookies = document.cookie.split(";");
            const obj_cookies = {};
            cookies.map(cookie => {
                obj_cookies[cookie.split("=")[0].trim()] = cookie.split("=")[1].trim()
            })
            console.log(obj_cookies);
            const url = `http://localhost:10000/api/save_user_image?image_of=${image_of}`
            const response = await fetch(url, {
                headers: {
                    "Content-Type": String(file.type),
                },
                method: "POST",
                body: file,
                credentials: "include",
            })

            return await response.json();
        }
    }


    return (<>
        <FetchContext.Provider value={{ fetchData, contactResponse, inscriptionResponse, currentUser, connectionResponse, projects, logOutResponse }}>
            {children}
        </FetchContext.Provider>
    </>)
}


DataProvider.propTypes = {
    children: propTypes.any
}