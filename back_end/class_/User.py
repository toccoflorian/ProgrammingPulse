
import bcrypt


class User():
    __SESSIONS_TABLE = "`programmingpulsestudio`.`sessions`"

    def __init__(self, id, creation_date, family_name, given_name, mail, tel, organization, password, DB) -> None:
        self.id = id
        self.creation_date = creation_date
        self.family_name = family_name
        self.given_name = given_name
        self.mail = mail
        self.tel = tel
        self.organization = organization
        self.password = password
        self.DB = DB



    def dire_bonjour(self):
        print(self)



    def create_token(self) -> dict:
        user_id = self.id
        sql_request = f""" DELETE FROM {self.__SESSIONS_TABLE} WHERE user_id={user_id} """
        self.DB.DELETE_FROM(sql_request)
        cookie_id = bcrypt.hashpw(self.password.encode("utf-8"), bcrypt.gensalt())
        signature = bcrypt.hashpw(cookie_id, bcrypt.gensalt())
        sql_request = f"""
            INSERT INTO {self.__SESSIONS_TABLE} (
                `id`, `user_id`, `cookie_signature`, `cookie_id`
            ) VALUES (
             DEFAULT,  %s,        %s,                 %s
            )
        """
        response = self.DB.INSERT_INTO(sql_request, user_id, signature, cookie_id )
        if not response[0]:
            return {
                "state": response[0],
                "content": response[1],
                }
        return {
            "status": True,
            "content": { 
                "user_id": user_id, 
                "signature": signature.decode("utf-8"), 
                "cookie_id": cookie_id.decode("utf-8"),
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
        