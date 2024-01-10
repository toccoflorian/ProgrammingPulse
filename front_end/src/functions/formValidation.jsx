function checkName(name) {                          // vérifaction des noms
    if (name.length < 3 || name.length > 45) {
        return false;
    }
    return true;
}
function checkMail(mail) {                                            // vérifaction des mails                        
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(mail.toLowerCase())) {                   // expression régulière pour adresse mail
        return false;
    }
    return true;
}
function checkTel(tel) {                          // vérifaction des numéros de téléphone
    if (!/^((\+33\s?)|0)[1-9](\s?\d{2}){4}$/.test(tel)) {
        return false;
    }
    return true;
}
function checkPassword(password) {                          // vérifaction des mots de passe
    if (password.length < 8 || password.length > 45) {
        return false;
    }
    return true
}
function checkMajInPwd(password) {
    if (Array(password).reduce((acc, letter) => {
        if (/[A-Z]/.test(letter)) {         // si pas de maj dans le mot de passe
            return true;
        }
    }, false)) {
        return true;
    }
    return false;
}
function checkNumInPwd(password) {
    if (Array(password).reduce((acc, letter) => {
        if (/[0-9]/.test(letter)) {         // si pas de chiffre dans le mot de passe
            return true;
        }
    }, false)) {
        return true;
    }
    return false;
}
function checkSpecialCharInPwd(password) {
    if (Array(password).reduce((acc, letter) => {
        if (/[^A-Za-z0-9]/.test(letter)) {         // si pas de caractère special dans le mot de passe
            return true;
        }
    }, false)) {
        return true;
    }
    return false;
}
function checkConfirmPassword(password, confirmPassword) {                          // vérifaction de la similarité du mot de passe et de la confirmation
    if (password !== confirmPassword) {
        return false;
    }
    return true;
}
function checkMessage(message) {                          // vérifaction de message 
    if (message.length < 45 || message.length > 3000) {
        return false;
    }
    return true;
}


export function formIsValide(form, setFormErrors) {

    let isValide = true;

    if (Object.keys(form).includes("familyname")) {             // check family name
        if (!checkName(form.familyname)) {
            setFormErrors((prevState) => ({ ...prevState, familyname: "Le nom de famille doit contenir entre 3 et 45 caractères." }))
            isValide = false;
        }
    }
    if (Object.keys(form).includes("givenname")) {              // check given name
        if (!checkName(form.givenname)) {
            setFormErrors((prevState) => ({ ...prevState, givenname: "Le prénom doit contenir entre 3 et 45 caractères." }))
            isValide = false;
        }
    }
    if (Object.keys(form).includes("mail")) {           // check mail
        if (!checkMail(form.mail)) {
            setFormErrors((prevState) => ({ ...prevState, mail: "Merci de renseigner une adresse mail valide." }))
            isValide = false;
        }
    }
    if (Object.keys(form).includes("tel")) {            // check tel
        if (!checkTel(form.tel)) {
            setFormErrors((prevState) => ({ ...prevState, tel: "Merci de renseigner un numéro de téléphone valide." }))
            isValide = false;
        }
    }
    if (Object.keys(form).includes("password")) {       // check password
        if (!checkPassword(form.password)) {
            setFormErrors((prevState) => ({ ...prevState, password: "Le mot de passe doit contenir entre 8 et 45 caractères." }))
            isValide = false;
        }
        if (!checkMajInPwd(form.password)) {            // check MAJ in password
            setFormErrors((prevState) => ({ ...prevState, password: "Le mot de passe doit contenir au moins 1 majuscules." }))
            isValide = false;
        }
        if (!checkNumInPwd(form.password)) {            // check NUM in password
            setFormErrors((prevState) => ({ ...prevState, password: "Le mot de passe doit contenir au moins 1 chiffre." }))
            isValide = false;
        }
        if (!checkSpecialCharInPwd(form.password)) {            // check SPECIAL CHAR in password
            setFormErrors((prevState) => ({ ...prevState, password: "Le mot de passe doit contenir au moins 1 caractère spécial." }))
            isValide = false;
        }
    }
    if (Object.keys(form).includes("confirmpassword")) {            // check confirm password
        if (!checkConfirmPassword(form.password, form.confirmpassword)) {
            setFormErrors((prevState) => ({ ...prevState, confirmpassword: "Merci de confirmer avec un mot de passe identique." }))
            isValide = false;
        }
    }
    if (Object.keys(form).includes("message")) {            // check message
        if (!checkMessage(form.message)) {
            setFormErrors((prevState) => ({ ...prevState, message: "Merci de décrire votre demande ( entre 45 et 3000 caractères )" }))
            isValide = false;
        }
    }

    return isValide;
}