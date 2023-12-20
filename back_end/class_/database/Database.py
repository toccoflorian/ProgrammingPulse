import class_.database.sql_connection_manager as connection
from class_.User import User
from datetime import datetime
import bcrypt




class Database():
    __CONTACT_TABLE = "`programmingpulsestudio`.`contact_form_table`"
    __USERS_TABLE = "`programmingpulsestudio`.`users`"



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
            elif e.errno == 0: pass
            return (False, e.msg)
        
    
    # def fetch(self, table, column="*", where= ""):
    #     sql_request = f"SELECT {column} FROM {self.__USERS_TABLE}"
    #     try:      
    #         # exécution de la requête SQL
    #         connection, cursor = self.open_connection()     # ouverture connexion
    #         cursor.execute(sql_request, args)
    #         result = connection.commit()
    #         print(result)
    #         self.close_connection()         # fermeture connexion
    #         return (True, "La requête SQL s'est bien passée")
    #     except Exception as e:
    #         print(e.with_traceback(None))
    #         return (False, e.msg)
        

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
            print(e.with_traceback(None))
            return (False, e.msg)


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
        self.INSERT_INTO(sql_request, creation_date, state, family_name, given_name, organization, tel, mail, message)
        
        


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
        hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
        
        # exécution de la requête SQL
        response = self.INSERT_INTO(sql_request, creation_date, family_name, given_name, organization, tel, mail, hashed_password)
        return response

    
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
    


    def check_user_exist_and_check_password(self, user, password):
        if not len(user) or not bcrypt.checkpw(password.encode("utf-8"), user[0][7].encode("utf-8")):       # vérif que user existe et vérif mot de passe
            return False, ""
        return True, user
    


    def get_user(self, credentials):
        user_mail, user_password = credentials["mail"], credentials["currentpassword"]
        sql_request = f""" SELECT * FROM {self.__USERS_TABLE} WHERE mail='{user_mail}' """
        connection, cursor = self.open_connection()
        cursor.execute(sql_request)
        check, user = self.check_user_exist_and_check_password(cursor.fetchall(), user_password)
        self.close_connection() 
        if not check:
            return "L'identifiant ou le mot de passe ne correspond pas"
        print(*user[0])
        return User(*user[0], Database())


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

# DB.create_user("TOCCO", "Florian", "Programming Pulse Studio", "0554757588", "admin@admin.com", "12345")