import database.connection as connection
from datetime import datetime



class Database():
    __CONTACT_TABLE = "`programmingpulsestudio`.`contact_form_table`"


    def __init__(self) -> None:
        self.__connection = None
        self.__cursor = None

    # établir la connexion à la base de données
    def open_connection(self) -> None:
        try:
            self.__connection = connection.connection_callback()
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
            print(e.args)


    # enregistré un formulaire de contact sur la base de données
    def save_contact_form(self, family_name, given_name, organization, tel, mail, message):
        creation_date = datetime.strftime(datetime.now(), "%Y-%m-%d %H:%M:%S")
        state = "unreaded"
        
        # création de la requête SQL
        sql_request = f"""          
            INSERT INTO {self.__CONTACT_TABLE} (
            `creation_date`, `state`, `family-name`, `given-name`, `organization`, `tel`, `mail`, `message`
            ) VALUES (
            %s, %s, %s, %s, %s, %s, %s, %s
            )"""
        
        # exécution de la requête SQL
        connection, cursor = self.open_connection()     # ouverture connexion
        cursor.execute(sql_request, (creation_date, state, family_name, given_name, organization, tel, mail, message))
        result = connection.commit()
        print(result)
        self.close_connection()         # fermeture connexion

    
    # obtenir les formulaires de contact
    def get_contact_forms(self):

        sql_request = f""" SELECT * FROM {self.__CONTACT_TABLE} """
        connection, cursor = self.open_connection()
        cursor.execute(sql_request)
        forms_datas = cursor.fetchall()
        self.close_connection()
        forms = []
        for form_data in forms_datas:
            forms.append(Contact_Form_Table(*form_data[1:]))
        return forms



class Contact_Form_Table(Database):
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
        
    


# t = Database()
# # print(t.__TABLE)
# print(t.get_contact_forms())