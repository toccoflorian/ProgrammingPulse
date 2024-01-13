from .Project import Project
from datetime import datetime
import json
import bcrypt


class User():

    def __init__(self, DB, id, creation_date, family_name, given_name, mail, tel, organization, password, session, is_admin) -> None:
        self.__DB = DB
        self.id = id
        self.is_admin = is_admin
        self.creation_date = creation_date
        self.family_name = family_name
        self.given_name = given_name
        self.mail = mail
        self.tel = tel
        self.organization = organization
        self.__password = password
        self.projects = [Project(DB, *project) for project in DB.SELECT("*", "projects", f"user_id='{self.id}'")]

    def get_json(self):
        projects = []
        if type(self.projects) != str:
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

        cookie = bcrypt.hashpw(self.__password.encode("utf-8"), bcrypt.gensalt())            # création d'un cookie pour cétifié la session

        signature = bcrypt.hashpw(cookie, bcrypt.gensalt())        # création d'une signature pour cétifié la provenance du cookie lors de sa vérification

        result = self.__DB.INSERT("sessions", ["cookie", "signature"], [cookie.decode("utf-8"), signature.decode("utf-8")])

        if not result[0]:
            return {"status": result[0], "content": result[1]}            # si la requête à échouée
        
        id = self.__DB.SELECT("id", "sessions", f"cookie='{cookie.decode('utf-8')}'")[0][0]
        self.__DB.UPDATE("users", f"session_id={id}", f"id='{self.id}'" )
        
        return {            # si requête ok
            "status": True,         # retourne les informations de session
            "content": {
                "cookie": cookie.decode("utf-8"),
                "signature": signature.decode("utf-8"),
                "user_id": self.id,
            }}

