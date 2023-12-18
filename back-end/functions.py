import bleach
import re

def sanitise_data(data):
    clean_data = {}

    for key, value in data.items():
        if key == "mail":           # sanitise e-mail
            if re.match(r"[^@]+@[^@]+\.[^@]+", value):
                clean_data[key] = value
            else: return False, "Adresse mail incorrect."

        elif key == "tel":          # sanitise numéro de téléphone
            if re.match(r"^\+?\d{1,3}?[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$", value):
                clean_data[key] = value
            else: return False, "Numéro de téléphone incorrect."

        elif isinstance(value, str):            # sanitise chaînes de caractères
            if len(value) < 45:
                clean_data[key] = bleach.clean(value)
            else: return False, f"Le longueur du champ '{key}' est trop grande."
        
    return True, clean_data