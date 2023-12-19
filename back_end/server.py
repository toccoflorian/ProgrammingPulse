import json
from flask import Flask, request
from flask_cors import CORS

import functions
from database.Database import Database


app = Flask(__name__)
CORS(app)

# reception et enregistrement formulaire de contact
@app.route("/send_contact_form", methods=["POST"])  
def send_contact_form():
    data = json.loads(request.get_json())       # recuperer le body de la requête
    succes, result = functions.sanitise_data(data)           # sanitise data
    if succes:           # si sanitise ok
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