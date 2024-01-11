import json
from flask import Flask, request, jsonify, g
from flask_cors import CORS
from datetime import datetime

import security.sanitise_data as sanitise_data
from models.Database import Database
from models.Contact_form import Contact_form


app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.before_request
def verify_auth_token():
    private_routes = [
        "get_user",
        "edit_note_and_comment",
        "save_user_image",
    ]
    cookies = request.cookies
    user_id_received = cookies.get("user_id")
    cookie_received = cookies.get("cookie")
    signature_received = cookies.get("signature")
    if not user_id_received:
        user_id_received = request.args.get("user_id")
        cookie_received = request.args.get("cookie")
        signature_received = request.args.get("signature")
    print()
    print("before start")
    print(request.endpoint)
    print()
    if request.endpoint in private_routes:          # si la route est privée
        if user_id_received:            # si un id d'user est reçu
            DB = Database()
            token = DB.get_user_session(user_id_received)
            if not token:
                print()
                return {"statis": False, "content": "pas de session enregistrée avec cette id."}
            else:
                print("cookie_received == cookie:",
                      cookie_received == token["cookie"])
                print("signature_received == signature:",
                      signature_received == token["signature"])
                if not cookie_received == token["cookie"] and signature_received == token["signature"]:
                    return {"status": False, "content": "le cookie et/ou la signature ne correspondent pas."}
                # définition de l'attribut 'user' à l'objet global Flask 'g' avec un objet 'User'
                g.user = DB.get_user(user_id=user_id_received)
                print("user:", g)
                print("before end cookie ok !!")
                print()
        else:
            print("no user id")
            return {"status": False, "content": "aucun id reçu"}

    else:
        print("before end no cookie")
        print()


@app.route("/save_user_image", methods=["POST"])
def save_user_image():
    from PIL import Image
    from io import BytesIO
    user_id = request.args.get("user_id")
    image_of = request.args.get("image_of")
    image_data = request.get_data()

    # Créer un objet Image à partir des données de la requête
    image = Image.open(BytesIO(image_data))

    # Redimensionner l'image en conservant le ratio d'aspect
    max_size = 300, 300
    image.thumbnail(max_size, Image.Resampling.LANCZOS)

    # Définir le chemin du fichier
    file_name = f"{image_of}_image_{str(user_id)}.webp"
    file_path = f"../front_end/public/{image_of}_images/{file_name}"

    # Enregistrer l'image au format WebP
    image.save(file_path, format='webp')

    return json.dumps("Image chargée avec succès.")


@app.route("/edit_note_and_comment", methods=["POST"])
def edit_note_and_comment():
    data = json.loads(request.get_json())
    print("data", data)
    succes, clean_comment = sanitise_data.sanitise_data(
        {"comment": data["comment"]})
    if succes:
        DB = Database()
        DB.save_project_note_and_comment(
            g.user.id, data["project_id"], data["note"], clean_comment["comment"])
        return json.dumps("note et comment ok")
    message_error = clean_comment
    return message_error


@app.route("/get_user", methods=["GET"])
def get_user():
    # 'serialyse_User(g.user)' retourne l'User courant (stocké dans 'g') rendu serialisable
    return jsonify({"status": True, "content": g.user.get_json()})


# obtenir un token d'authentification
@app.route("/login", methods=["get"])
def login() -> any:
    # recuperer le body de la requête
    data = {
        "mail": request.args.get("mail"),
        "currentpassword": request.args.get("currentpassword")
    }
    print("data zzzzzxxxxxxx", data)
    # nettoyer les données, retourne un bool et un dict en cas de succès sinon bool str
    succes, result = sanitise_data.sanitise_data(data)
    if not succes:
        # réponse d'erreur de nettoyage
        return jsonify({"status": False, "content": result})
    clean_data = result
    DB = Database()
    current_User = DB.get_user(user_mail=clean_data["mail"])
    if type(current_User) == str:
        return json.dumps({"status": False, "content": current_User})
    if not current_User.check_password(clean_data["currentpassword"]):
        return json.dumps({"status": False, "content": "Mauvais mot de passe"})
    return jsonify(current_User.login())


# reception formulaire inscription
# et création d'un nouvel utilisateur
@app.route("/create_new_user", methods=["POST"])
def create_new_user():
    try:
        # recuperer le body de la requête
        data = request.get_json()
        succes, result = sanitise_data.sanitise_data(data)           # nettoyer les données

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
            # réponse erreur SQL()
            return json.dumps((response[0], response[1]))

    except Exception as e:
        print(e.with_traceback(None), "create_new_user route error")
        # réponse erreur serveur
        return json.dumps((False, "erreur serveur"))


@app.route("/get_projects", methods=["GET"])
def get_projects():
    DB = Database()
    projects = DB.get_all_projects()
    for i in projects:
        print("iiiiiiii", i)
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
        print(clean_data)
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
        # réponse
        return json.dumps((True, "Formulaire envoyé avec succès."))
    else:
        return json.dumps((False, result))     # réponse d'erreur


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=10000)
