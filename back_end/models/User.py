from .Project import Project
from datetime import datetime, timedelta
import json
import bcrypt


class User():

    def __init__(self, DB, id, creation_date, family_name, given_name, mail, tel, organization, password, is_admin) -> None:
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
        self.projects = [Project(DB, *project) for project in DB.SELECT("id, user_id, project_name, state, start_date, end_date, description, note", "projects", f"user_id='{self.id}'")]
        self.nb_projects = len(self.projects)

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

        session_cookie = bcrypt.hashpw(self.__password.encode("utf-8"), bcrypt.gensalt())            # création d'un cookie pour cétifié la session

        signature = bcrypt.hashpw(session_cookie, bcrypt.gensalt())        # création d'une signature pour cétifié la provenance du cookie lors de sa vérification

        session_expire_date = datetime.strftime(datetime.now() + timedelta(days=90), "%Y-%m-%d %H:%M:%S") 

        self.__DB.DELETE("sessions", f"user_id={self.id}")

        result = self.__DB.INSERT(
            "sessions", 
            ["cookie", "signature", "user_id", "expire_date"], 
            [session_cookie.decode("utf-8"), signature.decode("utf-8"), self.id, session_expire_date]
        )

        if not result[0]:
            return {"status": result[0], "content": result[1]}            # si la requête à échouée


        return {            # si requête ok
            "status": True,         # retourne les informations de session
            "content": {
                "cookie": session_cookie.decode("utf-8"),
                "signature": signature.decode("utf-8"),
                "user_id": self.id,
            }}

