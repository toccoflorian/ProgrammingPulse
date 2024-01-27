
function handleShowUser(userId) {
    console.log("user n°", userId);
    document.location = `/show_user/${userId}`;
}

function validateNewProject(form) {


    let formIsValid = true;
    const projectNameElement = form.querySelector("input#projectName");
    const projectTextAreaElement = form.querySelector("textarea#projectDescription");
    const projectImageElement = form.querySelector("input#projectImage");

    if (projectNameElement.value.length < 3) {
        document.getElementById("projectNameError").innerText = "Le nom du projet est trop court.";
        formIsValid = false;
    }
    if (projectTextAreaElement.value.length < 45 | projectTextAreaElement.value.length > 3000) {
        document.getElementById("projectDescriptionError").innerText = "Merci de détailler votre demande ( 45 et 3000 caractères )";
        formIsValid = false;
    }

    console.log(formIsValid);
    return formIsValid;

}

async function handleSubmitNewProject(userId, form) {        // envoie du formulaire de création de projet
    if (validateNewProject(form)) {

        console.log(form);

        const response = await fetch(`http://localhost:10000/create_new_project/${userId}`, {
            method: "POST",
            credentials: "include",
            body: new FormData(form),
        })

        document.getElementById("submitError").innerText = await response.json();
    }


}

async function handleAddProjectImage(form, projectId, projectUserId) {
    const response = await fetch(`http://localhost:10000/add_project_image/${projectId}/${projectUserId}`, {
        method: "POST",
        credentials: "include",
        body: new FormData(form),
    })
    console.log(response);
}



async function handleUpdateProjectLogo(form, projectId, projectUserId) {
    console.log();
    // console.log(data.files[0]);
    console.log();
    const response = await fetch(`http://localhost:10000/change_project_logo/${projectId}/${projectUserId}`, {
        method: "POST",
        credentials: "include",
        body: new FormData(form),
    })
    console.log(response);

}