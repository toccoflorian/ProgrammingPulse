

// export function getCookies() {
//     const cookies = document.cookie.split(";");

//     return cookies.reduce((acc, element) => {
//         const key = element.split("=")[0].trim();
//         const value = element.split("=")[1].trim();
//         acc[key] = value;
//         return acc
//     }, {});
// }

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


export async function sessionConnection(fetchData, inpusValues) {
    const response = await fetchData(
        "/login",
        JSON.stringify(inpusValues),
        "login"
    )
    // console.log(response);
    if (!response.status) {
        return response
    }
    setCookie("cookie", response.content.cookie, 365)
    setCookie("signature", response.content.signature, 365)
    setCookie("user_id", response.content.user_id, 365)
    return response;
}


