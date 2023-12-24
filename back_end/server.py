import json
from flask import Flask, request, jsonify, redirect, make_response
from flask_cors import CORS

import functions
from class_.database.Database import Database


app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.before_request
def verify_auth_token():
    cookies = request.cookies
    user_id_received = cookies.get("user_id")
    cookie_received = cookies.get("cookie")
    signature_received = cookies.get("signature")
    print()
    print("before start")
    print(request.endpoint)
    print()
    if user_id_received:
        token = Database().get_user_session(user_id_received)
        if not token:
            print()
            print("before end")
            print()
        else:
            print("cookie_received == cookie:", cookie_received == token["cookie"])
            print("signature_received == signature:", signature_received == token["signature"])
    print()
    print("before end")
    print()


@app.route("/is_loged", methods=["POST"])
def verify_token():

    return jsonify(True)


# obtenir un token d'authentification
@app.route("/login", methods=["POST"])
def login() -> any:
    # recuperer le body de la requête
    data = json.loads(request.get_json())
    succes, result = functions.sanitise_data(
        data)           # nettoyer les données
    if not succes:
        # réponse d'erreur de nettoyage
        return jsonify({"status": False, "content": result})
    clean_data = result
    DB = Database()
    current_User = DB.get_user(clean_data)
    if type(current_User) == str:
        return json.dumps({"state": False, "content": current_User})
    return jsonify(current_User.create_token())


# reception formulaire inscription
# et création d'un nouvel utilisateur
@app.route("/create_new_user", methods=["POST"])
def create_new_user():
    try:
        # recuperer le body de la requête
        data = json.loads(request.get_json())
        succes, result = functions.sanitise_data(
            data)           # nettoyer les données

        if not succes:           # si nettoyage échoué
            # réponse d'erreur de nettoyage
            return json.dumps((False, result))

        clean_data = result
        DB = Database()             # objet Database
        response = DB.create_user(           # enregistrement sur la base de données
            clean_data["familyname"],
            clean_data["givenname"],
            clean_data["organization"],
            clean_data["tel"],
            clean_data["mail"],
            clean_data["password"])
        if response[0]:
            # réponse Valide
            return json.dumps((True, "Compte créé avec succès."))
        else:
            print(response[1])
            # réponse erreur SQL
            return json.dumps((response[0], response[1]))

    except Exception as e:
        print(e.with_traceback(None))
        # réponse erreur serveur
        return json.dumps((False, "erreur serveur"))


# reception et enregistrement
# formulaire de contact
@app.route("/send_contact_form", methods=["POST"])
def send_contact_form():
    # recuperer le body de la requête
    data = json.loads(request.get_json())
    succes, result = functions.sanitise_data(data)           # nettoyer les données
    if succes:           # si nettoyage ok
        clean_data = result
        print(clean_data)
        DB = Database()             # objet Database
        DB.save_contact_form(           # enregistrement sur la base de données
            clean_data["familyname"],
            clean_data["givenname"],
            clean_data["organization"],
            clean_data["tel"],
            clean_data["mail"],
            clean_data["message"])
        # réponse
        return json.dumps((True, "Formulaire envoyé avec succès."))
    else:
        return json.dumps((False, result))     # réponse d'erreur


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=10000)
