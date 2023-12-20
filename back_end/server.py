import json
from flask import Flask, request, jsonify
from flask_cors import CORS

import functions
from class_.database.Database import Database


app = Flask(__name__)
CORS(app)

@app.before_request
def verify_auth_token():
    need_auth = []


# authentification de l'utilisateur
@app.route("/get_user_session_token", methods=["POST"])
def get_user_session_token() -> str:
    data = json.loads(request.get_json())       # recuperer le body de la requête
    succes, result = functions.sanitise_data(data)           # nettoyer les données
    if not succes:
        return jsonify({"status": False, "content": result})     # réponse d'erreur de nettoyage
    clean_data = result
    DB = Database()
    current_User = DB.get_user(clean_data)
    if type(current_User) == str:
        return json.dumps({"state": False, "content": current_User}) 
    return jsonify(current_User.create_token() )
    


# reception formulaire inscription 
# et création d'un nouvel utilisateur
@app.route("/create_new_user", methods=["POST"])
def create_new_user():
    try:
        data = json.loads(request.get_json())       # recuperer le body de la requête
        succes, result = functions.sanitise_data(data)           # nettoyer les données

        if not succes:           # si nettoyage échoué
            return json.dumps((False, result ))     # réponse d'erreur de nettoyage
        
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
            return json.dumps((True, "Compte créé avec succès."))     # réponse Valide
        else: 
            print(response[1])
            return json.dumps((response[0], response[1]))       # réponse erreur SQL

    except Exception as e:
        print(e.with_traceback(None))
        return json.dumps((False, "erreur serveur"))          # réponse erreur serveur





# reception et enregistrement 
# formulaire de contact
@app.route("/send_contact_form", methods=["POST"])  
def send_contact_form():
    data = json.loads(request.get_json())       # recuperer le body de la requête
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
        return json.dumps((True, "Formulaire envoyé avec succès."))     # réponse
    else: return json.dumps((False, result))     # réponse d'erreur 




if __name__ == "__main__":
    app.run(host="127.0.0.1", port=10000)