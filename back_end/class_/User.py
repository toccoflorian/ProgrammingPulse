
import bcrypt


class User():

    def __init__(self, id, creation_date, family_name, given_name, mail, tel, organization, password, session, DB) -> None:
        self.id = id
        self.creation_date = creation_date
        self.family_name = family_name
        self.given_name = given_name
        self.mail = mail
        self.tel = tel
        self.organization = organization
        self.__password = password
        self.__DB = DB


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

    # # obtenir le token de session utilisateur
    # def get_user_session_token(self, identifiant, password):
    #     sql_request = f"SELECT * FROM {self.__USERS_TABLE} WHERE mail='{identifiant}'"       # requête SQL
    #     connection, cursor = self.open_connection()     # ouverture connexion
    #     cursor.execute(sql_request)
    #     user = cursor.fetchall()
    #     status, response = self.check_user(user, password)
    #     if not status:
    #         self.close_connection()         # fermeture connexion
    #         return (False, response)
    #     response = self.create_token(user[0])
    #     self.close_connection()         # fermeture connexion
    #     return response
