import json
import bcrypt
from flask import Flask, request, jsonify, render_template, g
from flask_cors import CORS
from datetime import datetime

import security.sanitise_data as sanitise_data
import image_manager
from models.User import User
from models.Project import Project
from models.Database import Database
from models.Contact_form import Contact_form
from models.Comment import Comment

import admin_routes

private_routes = [
        "get_user",
        "edit_note_and_comment",
        "save_user_image",
        "admin",
        "logout",
    ]

app = Flask(__name__)
CORS(app, supports_credentials=True)



@app.before_request
def verify_auth_token():
    cookies = request.cookies
    user_id_received = cookies.get("user_id")
    cookie_received = cookies.get("cookie")
    signature_received = cookies.get("signature")
    del cookies

    if not user_id_received:
        header = request.headers.get("test")
        if header:
            cookies = {}
            for cookie in header.split(";"):
                cookies[cookie.split("=")[0]] = cookie.split("=")[1]
            user_id_received = cookies["user_id"]
            cookie_received = cookies["cookie"]
            signature_received = cookies["signature"]
            del cookies

    if request.endpoint in private_routes:          # si la route est privée
        print("logout")
        if user_id_received:            # si un id d'user est reçu
            DB = Database()
            result = DB.SELECT(
                "*",          # Quoi
                "sessions",                                        # où
                f"user_id='{user_id_received}'" ,              # condition
            )
            if not result:
                return jsonify({"status": False, "content": "pas de session enregistrée avec cette id."})
            token = {"cookie": result[0][0], "signature": result[0][1]}

            if not token:
                return jsonify({"status": False, "content": "pas de session enregistrée avec cette id."})
            
            
            if not cookie_received == token["cookie"] and signature_received == token["signature"]:
                return jsonify({"status": False, "content": "le cookie et/ou la signature ne correspondent pas."})
            
            user =  User(DB, *DB.SELECT("*", "users", f"id='{user_id_received}'")[0])
            if request.endpoint == "admin":
                if not user.is_admin:
                    return admin_connection("Vous n'êtes pas administrateur.")
            g.user = user           # définition de l'attribut 'user' à l'objet global Flask 'g' avec un objet 'User'

        else:
            if request.endpoint == "admin":
                return admin_connection()
            return jsonify({"status": False, "content": "aucun id reçu"})





@app.route("/save_user_image", methods=["POST"])
def save_user_image():
    user_id = request.args.get("user_id")
    image_of = request.args.get("image_of")
    image_data = request.get_data()
    image_manager.save_image_to_webp(user_id, image_of, image_data)
    return json.dumps("Image chargée avec succès.")


@app.route("/edit_note_and_comment", methods=["POST"])
def edit_note_and_comment():
    data = json.loads(request.get_json())
    succes, clean_comment = sanitise_data.sanitise_data({"comment": data["comment"]})
    if succes:
        DB = Database()
        Comment(
            DB, 
            None, 
            g.user.id, 
            data["project_id"], 
            clean_comment["comment"], 
            datetime.strftime(datetime.now(), "%Y-%m-%d %H:%M:%S") 
        ).save()
        Project(
            DB, 
            *DB.SELECT("*", "projects", f"id='{data['project_id']}'")[0]
        ).edit_note(data["note"])
    message_error = clean_comment
    return message_error


@app.route("/get_user", methods=["GET"])
def get_user():
    return jsonify({"status": True, "content": g.user.get_json()})    # 'serialyse_User(g.user)' retourne l'User courant (stocké dans 'g') rendu serialisable


# obtenir un token d'authentification
@app.route("/login", methods=["get"])
def login() -> any:
    data = {                                        # recuperer le body de la requête
        "mail": request.args.get("mail"),
        "currentpassword": request.args.get("currentpassword")
    }
    succes, result = sanitise_data.sanitise_data(data)        # nettoyer les données, retourne un bool et un dict en cas de succès sinon bool str
    if not succes:
        return jsonify({"status": False, "content": result})        # réponse d'erreur de nettoyage
    clean_data = result
    DB = Database()
    try:
        current_User = User(DB, *DB.SELECT("*", "users", f"mail='{clean_data['mail']}'")[0])
    except Exception as e:
        return jsonify({"status": False, "content": "L'identifiant ne correspond à aucun utilisateur." })
    if not current_User.check_password(clean_data["currentpassword"]):
        return json.dumps({"status": False, "content": "Mauvais mot de passe"})
    return jsonify(current_User.login())


@app.route("/logout", methods=["GET"])
def logout():
    print(g.user)
    print("okkkkkk")
    try:
        Database().DELETE("sessions", f"user_id={g.user.id}")
        return jsonify(True)
    except Exception as e:
        print(e)
        return jsonify(False)


# reception formulaire inscription
# et création d'un nouvel utilisateur
@app.route("/create_new_user", methods=["POST"])
def create_new_user():
    # recuperer le body de la requête
    data = request.get_json()
    succes, clean_data = sanitise_data.sanitise_data(data)           # nettoyer les données

    if not succes:           # si nettoyage échoué
        # réponse d'erreur de nettoyage
        return json.dumps((False, clean_data))
    
    creation_date = datetime.strftime(datetime.now(), "%Y-%m-%d %H:%M:%S")          # édite la date de création de l'utilisateur 
    hashed_password = bcrypt.hashpw(clean_data["password"].encode("utf-8"), bcrypt.gensalt())        # hash le password
    response = Database().INSERT(        # exécution de la requête SQL
        "users", 
        ["creation_date", "family_name", "given_name", "organization", "tel", "mail", "password"], 
        [
            creation_date, 
            clean_data["familyname"], 
            clean_data["givenname"], 
            clean_data["organization"], 
            clean_data["tel"], 
            clean_data["mail"], 
            hashed_password.decode("utf-8")
        ]
        )
    if response[0]:
        return json.dumps((True, "Compte créé avec succès."))        # réponse Valide
    else:
        return json.dumps((response[0], response[1]))        # réponse erreur SQL()



@app.route("/get_projects", methods=["GET"])
def get_projects():
    DB = Database()
    projects = []
    for project in DB.SELECT("*", "projects"):
        projects.append(Project(DB, *project).get_json())
    return json.dumps(projects)


# reception, enregistrement et envoi par mail
# formulaire de contact
@app.route("/send_contact_form", methods=["POST"])
def send_contact_form():
    # recuperer le body de la requête
    data = json.loads(request.get_json())
    succes, result = sanitise_data.sanitise_data(
        data)           # nettoyer les données
    if succes:           # si nettoyage ok
        clean_data = result
        form = Contact_form(
            Database(), 
            datetime.strftime(datetime.now(), "%Y-%m-%d %H:%M:%S"), 
            "unreaded", 
            clean_data["familyname"], 
            clean_data["givenname"], 
            clean_data["organization"], 
            clean_data["tel"], 
            clean_data["mail"], 
            clean_data["message"], 
            None, 
            None
            )
        form.save()
        form.send_by_mail()
        return json.dumps((True, "Formulaire envoyé avec succès."))        # réponse
    else:
        return json.dumps((False, result))     # réponse d'erreur


admin_routes.admin_routes(app, render_template, Database())
@app.route("/admin_connection")
def admin_connection(auth_message=""):           # "message" 
    
    return render_template("admin_connection.html", auth_message=auth_message)

if __name__ == "__main__":
    app.run(host="ppstudio.fr", port=10000, debug=True)
 