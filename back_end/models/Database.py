import time
import security.sql_connection_manager as connection
from models.User import User
from models.Project import Project
from models.Comment import Comment
from datetime import datetime
import bcrypt


class Database():
    __CONTACT_TABLE = "`programmingpulsestudio`.`contact_form_table`"
    __USERS_TABLE = "`programmingpulsestudio`.`users`"
    __SESSIONS_TABLE = "`programmingpulsestudio`.`sessions`"
    __PROJECTS_TABLE = "`programmingpulsestudio`.`projects`"
    __COMMENTS_TABLE = "`programmingpulsestudio`.`comments`"

    def __init__(self) -> None:
        self.__connection = None
        self.__cursor = None


    # établir la connexion à la base de données
    def open_connection(self) -> None:
        try:
            result = connection.connection_callback()
            if not result[0]:
                return result[1]
            self.__connection = result[1]
            self.__cursor = self.__connection.cursor()
            return self.__connection, self.__cursor

        except Exception as e:
            print(e.with_traceback(None))


    # fermer la connexion à la base de données
    def close_connection(self):
        try:
            self.__cursor.close(), self.__connection.close()
            self.__cursor, self.__connection = None, None

        except Exception as e:
            print(e.with_traceback(None))


    def INSERT_INTO(self, sql_request, *args):
        try:
            # exécution de la requête SQL
            connection, cursor = self.open_connection()     # ouverture connexion
            cursor.execute(sql_request, args)
            result = connection.commit()
            print(result)
            self.close_connection()         # fermeture connexion
            return (True, "La requête SQL s'est bien passée")
        except Exception as e:
            print(e.with_traceback(None))
            if e.errno == 1062:
                return (False, f"'{e.msg.split(chr(39))[1]}' existe déjà dans la base de données.")
            # elif e.errno == 0:
            #     pass
            return (False, e.with_traceback(None))



    def DELETE_FROM(self, sql_request):
        try:
            # exécution de la requête SQL
            connection, cursor = self.open_connection()     # ouverture connexion
            cursor.execute(sql_request)
            result = connection.commit()
            print(result)
            self.close_connection()         # fermeture connexion
            return (True, "La requête SQL s'est bien passée")
        except Exception as e:
            print(e.with_traceback(None))       # erreur
            return (False, e.msg)



    # créer un nouveau user
    def create_user(self, family_name, given_name, organization, tel, mail, password):
        creation_date = datetime.strftime(datetime.now(), "%Y-%m-%d %H:%M:%S")
        # création de la requête SQL
        sql_request = f"""          
            INSERT INTO {self.__USERS_TABLE} (
                `creation_date`, `family_name`, `given_name`, `organization`, `tel`, `mail`, `password`
            ) VALUES (
                 %s,              %s,            %s,           %s,             %s,    %s,     %s
            )"""

        # hash le password
        hashed_password = bcrypt.hashpw(
            password.encode("utf-8"), bcrypt.gensalt())

        # exécution de la requête SQL
        response = self.INSERT_INTO(
            sql_request, creation_date, family_name, given_name, organization, tel, mail, hashed_password)
        return response



    def check_user_exist(self, user):
        # vérif que user existe
        if not len(user):
            return False, ""
        return True, user
    


    def get_user(self, user_mail=None, user_id=None):
        if user_mail:
            sql_request = f""" SELECT * FROM {self.__USERS_TABLE} WHERE mail='{user_mail}' """
        elif id:
            sql_request = f""" SELECT * FROM {self.__USERS_TABLE} WHERE id='{user_id}' """
        connection, cursor = self.open_connection()
        cursor.execute(sql_request)
        check, user = self.check_user_exist(cursor.fetchall())
        self.close_connection()
        if not check:
            return "L'identifiant ne correspond à aucun utilisateur."
        print(*user[0])
        return User(Database(), *user[0])
    

    def get_user_projects(self, user_id):
        sql_request = f""" SELECT * FROM {self.__PROJECTS_TABLE} WHERE user_id='{user_id}' """
        connection, cursor = self.open_connection()
        cursor.execute(sql_request)
        projects = cursor.fetchall()
        self.close_connection()
        if not len(projects):
            return "Aucun projet pour cette utilisateur."
        projects_list = []
        for project in projects:
            projects_list.append(Project(Database(), *project))
            # print("projects:", projects_list)
        return projects_list
    

    def get_all_projects(self):
        sql_request = f"SELECT * FROM {self.__PROJECTS_TABLE}"
        connection, cursor = self.open_connection()
        cursor.execute(sql_request)
        projects = cursor.fetchall()
        self.close_connection()
        if not len(projects):
            return "Aucun projet."
        projects_list = []
        for project in projects:
            projects_list.append(Project(Database(), *project).get_json())
        print("projects:", projects_list)
        return projects_list
    

    def get_project_comment(self, project_id, user_id) -> object:
        sql_request = f"SELECT * FROM {self.__COMMENTS_TABLE} WHERE project_id='{project_id}' AND user_id='{user_id}'"
        connection, cursor = self.open_connection()
        cursor.execute(sql_request)
        comment = cursor.fetchall()
        self.close_connection()
        if not len(comment):
            return None
        return Comment(*comment[0])
    

    def save_project_note_and_comment(self, user_id, project_id, note, comment):
        date = datetime.strftime(datetime.now(), "%Y-%m-%d %H:%M:%S")
        request1 = f"INSERT INTO {self.__COMMENTS_TABLE} (user_id, project_id, text, date) VALUE (%s, %s, %s, %s)"
        connection, cursor = self.open_connection()
        self.INSERT_INTO(request1, user_id, project_id, comment, date)        # INSERT_INTO ferme la connexion sql

        request2 = f"UPDATE {self.__PROJECTS_TABLE} SET note=%s WHERE id='{project_id}'"
        self.INSERT_INTO(request2, note)        # INSERT_INTO ferme la connexion sql
        print('save note')


    def get_user_session(self, user_id) -> dict:
        connection, cursor = self.open_connection()
        cursor.execute(f"""
            SELECT sessions.cookie, sessions.signature 
            FROM {self.__USERS_TABLE} JOIN {self.__SESSIONS_TABLE} 
            ON session_id=sessions.id 
            WHERE users.id={user_id}
            """)
        result = cursor.fetchall()
        self.close_connection()
        if not result:
            return False
        return {"cookie": result[0][0], "signature": result[0][1]}
    


    def get_new_token_id(self, cookie):
        connection, cursor = self.open_connection()
        str_cookie = cookie.decode("utf-8")
        cursor.execute(
            f"SELECT id FROM {self.__SESSIONS_TABLE} WHERE cookie='{str_cookie}'", )
        id = cursor.fetchall()[0][0]
        self.close_connection()
        print(id)
        return id



    def save_token(self, cookie, signature, user_id):
        # enregistrement des informations de sessions sur la base de données
        response = self.INSERT_INTO(f"""
            INSERT INTO {self.__SESSIONS_TABLE} (                   
                `cookie`, `signature`
            ) VALUES (
                %s,           %s
            )
            """, cookie, signature)
        if not response[0]:
            # si la requête à échouée
            return {"status": response[0], "content": response[1]}
        id = self.get_new_token_id(cookie)
        connection, cursor = self.open_connection()

        cursor.execute(
            f"UPDATE {self.__USERS_TABLE} SET session_id={id} WHERE id={user_id}")
        connection.commit()
        self.close_connection()
        if not response[0]:
            # si la requête à échouée
            return {"status": response[0], "content": response[1]}
        return {"status": True}
    








    # obtenir les formulaires de contact
    def get_contact_forms(self):

        sql_request = f""" SELECT * FROM {self.__CONTACT_TABLE} """
        connection, cursor = self.open_connection()
        cursor.execute(sql_request)
        forms_datas = cursor.fetchall()
        self.close_connection()
        forms = []
        for form_data in forms_datas:
            forms.append(Contact_form(*form_data[1:]))
        return forms
    
        # enregistré un formulaire de contact sur la base de données
    def save_contact_form(self, family_name, given_name, organization, tel, mail, message):
        creation_date = datetime.strftime(datetime.now(), "%Y-%m-%d %H:%M:%S")
        state = "unreaded"

        # création de la requête SQL
        sql_request = f"""          
            INSERT INTO {self.__CONTACT_TABLE} (
                `creation_date`, `state`, `family_name`, `given_name`, `organization`, `tel`, `mail`, `message`
            ) VALUES (
                 %s,              %s,      %s,            %s,           %s,             %s,    %s,     %s
            )"""

        # exécution de la requête SQL
        self.INSERT_INTO(sql_request, creation_date, state,
                         family_name, given_name, organization, tel, mail, message)


class Contact_form():
    def __init__(self, creation_date, state, family_name, given_name, organization, tel, mail, message, response_date, response) -> None:
        super().__init__()
        self.creation_date = creation_date
        self.state = state
        self.family_name = family_name
        self.given_name = given_name
        self.organization = organization
        self.tel = tel
        self.mail = mail
        self.message = message
        self.response_date = response_date
        self.response = response

    # répondre

    # supprimer

    # modifier l'état


# DB = Database()


