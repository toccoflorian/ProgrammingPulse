

export function formIsValide(form, formErrors, setFormErrors) {

    let isValide = true;

    if (form.familyName.length < 3 || form.familyName > 45) {
        setFormErrors({ ...formErrors, familyName: "Le nom de famille doit contenir entre 3 et 45 caractères." })
        isValide = false;
    }
    if (form.givenName.length < 3 || form.givenName > 45) {
        setFormErrors({ ...formErrors, givenName: "Le prénom doit contenir entre 3 et 45 caractères." })
        isValide = false;
    }
    // expression régulière pour adresse mail
    // eslint-disable-next-line no-useless-escape
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(form.mail.toLowerCase())) {
        setFormErrors({ ...formErrors, mail: "Merci de renseigner une adresse mail valide." })
        isValide = false;
    }
    // expresssion régulière pour les numéros de téléphone
    if (!/^((\+33\s?)|0)[1-9](\s?\d{2}){4}$/.test(form.tel)) {
        setFormErrors({ ...formErrors, tel: "Merci de renseigner un numéro de téléphone valide." })
        isValide = false;
    }
    if (form.password.length < 6 || form.password.length > 45) {
        setFormErrors({ ...formErrors, password: "Le mot de passe doit contenir entre 6 et 45 caractères." })
        isValide = false;
    } else if (form.password !== form.confirmPassword) {
        setFormErrors({ ...formErrors, confirmPassword: "Merci de confirmer avec un mot de passe identique." })
        isValide = false;
    }

    return isValide;
}