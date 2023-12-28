import json
import bleach
import re
from datetime import datetime


def serialyse_User(user):
    return json.dumps({
        "id": user.id,
        "creation_date": datetime.strftime(user.creation_date, "%d/%m/%YT%H:%M"),
        "family_name": user.family_name,
        "given_name": user.given_name,
        "mail": user.mail,
        "tel": user.tel,
        "organization": user.organization,
    })

def confirm_password(passwords):
    print('passwords[0] == passwords[1]', passwords[0] == passwords[1])
    if passwords[0] == passwords[1]:
        return True
    return False

def sanitise_data(data) -> any:
    clean_data = {}

    for key, value in data.items():
        if key == "passwords":
            print("value", value)

            if len(value[0]) < 4 or len(value[1]) < 4:
                return False, "Le mot de passe et la confirmation doivent contenir entre 4 et 45 caractères."

            if not confirm_password(value):
                return False, "Le mot de passe et la confirmation ne sont pas identiques."
            
            clean_data["password"] = value[0]


        elif key == "mail":           # sanitise e-mail

            if not re.match(r"[^@]+@[^@]+\.[^@]+", value) and len(value) <= 45:
                return False, "Adresse mail incorrect."
            clean_data[key] = value


        elif key == "tel":          # sanitise numéro de téléphone
            
            if not re.match(r"^\+?\d{1,3}?[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$", value) and len(value) <= 45 and len(value) != 0:
                return False, "Numéro de téléphone incorrect."
            clean_data[key] = value


        elif key in {"familyname", "givenname" } and 3 > len(value) > 45:
            return False, f"Le champ {key} doit contenir 3 caractères au minimum."


        elif isinstance(value, str):            # sanitise chaînes de caractères

            if not len(value) < 45 and key != "message":
                return False, f"Le longueur du champ '{key}' est trop grande."
            clean_data[key] = bleach.clean(value)
        
    return True, clean_data