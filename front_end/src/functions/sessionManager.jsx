

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));        // convertir le nombre de jours en milisecondes
        expires = "; expires=" + date.toUTCString();
    } document.cookie = `${name}=${value || ""}${expires}; Path=/; priority=high`;

}


export async function sessionConnection(response) {
    if (!response.status) {
        return response
    }
    setCookie("cookie", response.content.cookie, 365)
    setCookie("signature", response.content.signature, 365)
    setCookie("user_id", response.content.user_id, 365)
    return response;
}

export async function sessionLogOut() {
    setCookie("cookie", "", -1)
    setCookie("signature", "", -1)
    setCookie("user_id", "", -1)
    document.location.reload();
}