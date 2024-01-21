import bleach
import re

def maj_in_pwd(pwd, nb_maj):
    majs = 0
    for letter in pwd:
        majs += 1 if letter.isupper() else 0
    return True if majs >= nb_maj else False

def numeric_in_pwd(pwd, nb_numeric):
    spec_chars = 0
    for letter in pwd:
        spec_chars += 1 if letter.isnumeric() else 0
    return True if spec_chars >= nb_numeric else False

def special_char_in_pwd(pwd, nb_special_char):
    special_chars = 0
    for letter in pwd:
        special_chars += 1 if re.search(r'[^A-Za-z0-9]', letter) else 0
    return True if special_chars >= nb_special_char else False


def sanitise_data(data) -> any:

    clean_data = {}

    for key, value in data.items():
        if key == "password":
            if len(value) < 8 or len(value) > 45:
                return False, "Le mot de passe et la confirmation doivent contenir entre 8 et 45 caractères."
            if not special_char_in_pwd(value, 1):
                return False, "Votre mot de passe doit contenir au moins 1 caractère special."
            if not numeric_in_pwd(value, 1):
                return False, "Votre mot de passe doit contenir au moins 1 chiffre."
            if not maj_in_pwd(value, 1):
                return False, "Votre mot de passe doit contenir au moins 1 majuscule."
            clean_data[key] = value

        elif key == "mail":           # sanitise e-mail
            if not re.match(r"[^@]+@[^@]+\.[^@]+", value) and len(value) <= 45:
                return False, "Adresse mail incorrect."
            clean_data[key] = value

        elif key == "tel":          # sanitise numéro de téléphone
            if not re.match(r"^\+?\d{1,3}?[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$", value) and len(value) <= 45 and len(value) != 0:
                return False, "Numéro de téléphone incorrect."
            clean_data[key] = value

        elif key == "familyname" or key == "givenname" or key == "project_name":
            if 3 > len(value) > 45:
                return False, f"Le champ {key} doit contenir 3 et 45 caractères."
            clean_data[key] = bleach.clean(value)


        elif key == "comment":
            clean_data[key] = bleach.clean(value)

        elif key == "message" or key == "project_description":
            if 45 >= len(value) >= 3000:
                return False, f"Le champ {key} doit contenir 45 et 3000 caractères."
            clean_data[key] = bleach.clean(value)

        elif isinstance(value, str):            # sanitise chaînes de caractères
            if len(value) > 45 and key != "message":
                return False, f"Le longueur du champ '{key}' est trop grande."
            clean_data[key] = bleach.clean(value)
        else:
            return False, "Une donnée n'as pas pu être traitée."

    return True, clean_data
