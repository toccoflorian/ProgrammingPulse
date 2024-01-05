from datetime import datetime
import json
import bcrypt


class User():

    def __init__(self, id, creation_date, family_name, given_name, mail, tel, organization, password, session, is_admin, DB) -> None:
        self.id = id
        self.is_admin = is_admin
        self.creation_date = creation_date
        self.family_name = family_name
        self.given_name = given_name
        self.mail = mail
        self.tel = tel
        self.organization = organization
        self.__password = password
        self.__DB = DB
        self.projects = DB.get_user_projects(self.id)

    def get_json(self):
        projects = []
        for project in self.projects:
            projects.append(project.get_json())

        return json.dumps({
        'id': self.id,
        "creation_date": datetime.strftime(self.creation_date, "%d/%m/%YT%H:%M"),
        "family_name": self.family_name,
        "given_name": self.given_name,
        "mail": self.mail,
        "tel": self.tel,
        "organization": self.organization,
        "projects": projects
    })

    def check_password(self, password):
        if not bcrypt.checkpw(password.encode("utf-8"), self.__password.encode("utf-8")):
            return False
        return True

    # création d'un token de session permettant à l'utilisateur d'être connecté
    def login(self) -> dict:

        cookie = bcrypt.hashpw(            # création d'un cookie pour cétifié la session
            self.__password.encode("utf-8"), bcrypt.gensalt())

        # création d'une signature pour cétifié la provenance du cookie lors de sa vérification
        signature = bcrypt.hashpw(cookie, bcrypt.gensalt())

        result = self.__DB.save_token(cookie, signature, self.id)

        if not result["status"]:
            return result
        return {            # si requête ok
            "status": True,         # retourne les informations de session
            "content": {
                "cookie": cookie.decode("utf-8"),
                "signature": signature.decode("utf-8"),
                "user_id": self.id,
            }}

