async function handleLogout() {
    const cookies = document.cookie.split(";").map(keyValue => [keyValue.split("=")[0], keyValue.split("=")[1]]);
    const body = {}
    cookies.map(cookie => body[cookie[0].trim()] = cookie[1].trim())
    console.log(body);
    const response = await fetch("http://127.0.0.1:10000/logout", {
        method: "GET",
        // body,
        headers: {
            test: `user_id=${body.user_id};cookie=${body.cookie};signature=${body.signature}`,
        },

        credentials: "include",
    });
    if (await response.json()) {
        var date = new Date();
        date.setTime(date.getTime() - 1);        // convertir le nombre de jours en milisecondes
        expires = "; expires=" + date.toUTCString();
        document.cookie = "user_id=_" + expires + "; path=/";
        document.cookie = "cookie=_" + expires + "; path=/";
        document.cookie = "signature=_" + expires + "; path=/";
        document.location.reload();
    }
}