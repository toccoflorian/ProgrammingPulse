

import sql_connection_manager as connection

class Database():
    __TABLES = {
        "contact_form": "`programmingpulsestudio`.`contact_form_table`",
        "users": "`programmingpulsestudio`.`users`",
        "sessions": "`programmingpulsestudio`.`sessions`",
        "projects": "`programmingpulsestudio`.`projects`",
        "comments": "`programmingpulsestudio`.`comments`",
    }

    def __init__(self) -> None:
        pass

    # établir la connexion à la base de données
    def open_connection(self) -> None:
        try:
            conn = connection.connection_callback()
            if not conn[0]:
                return conn[1]
            return  conn[1],  conn[1].cursor()
        except Exception as e:
            print(e.with_traceback(None))

    # fermer la connexion à la base de données
    def close_connection(self, connection, cursor):
        try:
            cursor.close(), connection.close()
        except Exception as e:
            print(e.with_traceback(None))

    def formatSqlColumnsAndValues(self, values, type=""):
        string = ""
        for value in values:
            if type == "values":
                string += f" '{value}',"
            else:
                string += f" `{value}`,"
        return string[:-1]
    
    def execute(self, request, request_type=""):
        connection, cursor = self.open_connection()
        cursor.execute(request)
        if request_type == "get":
            result = cursor.fetchall()
            self.close_connection(connection, cursor)
            return result
        else:
            connection.commit()
            self.close_connection(connection, cursor)
            return True

    def INSERT(self, table, columns, values):
        try:
            sql_request = f"INSERT INTO {self.__TABLES[table]} ({self.formatSqlColumnsAndValues(columns)}) VALUES ({self.formatSqlColumnsAndValues(values, 'values')})"
            self.execute(sql_request)
            return (True, "")
        except Exception as e:
            print(e.with_traceback(None))
            if e.errno == 1062:
                return (False, f"'{e.msg.split(chr(39))[1]}' existe déjà dans la base de données.")
            else:
                return (False, e.msg)
        
    def SELECT(self, what, table, condition=None, join=None):
        sql_request = f"""SELECT {what} FROM {self.__TABLES[table]} 
                        {(' JOIN ' + self.__TABLES[join['table']] + " ON " + join["key_value"]) if join else ''} 
                        {' WHERE ' + condition if condition else ''};"""
        return self.execute(sql_request, "get")

    def DELETE(self, table, condition=None):
        sql_request = f"DELETE FROM {self.__TABLES[table]} {'WHERE ' + condition if condition else ''}"
        return self.execute(sql_request)

    def UPDATE(self, table, new_key_value_pair, condition=None):
        sql_request = f"UPDATE {self.__TABLES[table]} SET {new_key_value_pair} {'WHERE ' + condition if condition else ''}"
        self.execute(sql_request)

    def COUNT(self, what, table, condition=None):
        sql_request = f"SELECT COUNT({what}) FROM {self.__TABLES[table]} {' WHERE ' + condition if condition else ''}"
        return self.execute(sql_request, "get")[0][0]




# ("id", "INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id)"),

# users TABLE
tables = {
    "users": {
        ("creation_date", "DATETIME "),
        ("family_name", "VARCHAR(45) "),
        ("given_name", "VARCHAR(45) "),
        ("mail", "VARCHAR(45) NULL"),
        ("tel", "VARCHAR(12) NULL"),
        ("organization", "VARCHAR(100) "),
        ("password", "VARCHAR(150) "),
        ("is_admin", "TINYINT "),
    },
    "contact_form_table": {
        ("creation_date", "DATETIME "), 
        ("state", "VARCHAR(45) "),
        ("family_name", "VARCHAR(45) "),
        ("given_name", "VARCHAR(45) "),
        ("organization", "VARCHAR(100) "),
        ("tel", "VARCHAR(45) "),
        ("mail", "VARCHAR(45) "),
        ("message", "MEDIUMTEXT "),
    },
    "devis": {
        ("edition_date", "DATETIME "),
        ("state", "VARCHAR(45) "),
        ("signature_date", "DATETIME "),
        ("cloturation_date", "DATETIME "),
        ("project_id", "INT "),
    },
    "sessions": {
        ("cookie", "VARCHAR(100) "),
        ("signature", "VARCHAR(100) "),
        ("user_id", "INT "),
        ("expire_date", "DATETIME "),
    },
    "projects": {
        ("user_id", "INT "),
        ("project_name", "VARCHAR(100) "),
        ("state", "VARCHAR(45) "),
        ("start_date", "DATETIME "),
        ("end_date", "DATETIME "),
        ("description", "MEDIUMTEXT "),
        ("note", "INT "),
    },
    "comments": {
        ("user_id", "INT "),
        ("project_id", "INT "),
        ("text", "MEDIUMTEXT "),
        ("date", "DATETIME "),
    },
    
}

def create_tables(tables):
    DB = Database()

    connexion, cursor = DB.open_connection()
    print()
    for table_name in tables:
        print("\ncréation de la table " + table_name)
        try:
            sql_request = f"CREATE TABLE {table_name} (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id))"
            cursor.execute(str(sql_request))
        except:
            pass
        print(table_name, "créer !\n")

        for column in tables[table_name]:
            print("création de la colonne " + column[0] + "-" + column[1])
            sql_request = f"ALTER TABLE {table_name} ADD {column[0]} {column[1]}"
            print("colonne " + column[0] + " créer !")
            print()
            cursor.execute(str(sql_request))
        
        print("Table " + table_name + " terminée !\n")

    DB.close_connection(connexion, cursor)



import subprocess
import os
import dotenv

dotenv.load_dotenv()

def run_command(command, input=None, check=True, text=True):
    try:
        result = subprocess.run(command, shell=True, input=input, text=text, 
                                stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=check)
        return result.stdout, None
    except subprocess.CalledProcessError as e:
        return e.stdout, e.stderr

# Installation de MySQL Server
print("Installation de MySQL Server...")
stdout, stderr = run_command("sudo apt-get update && sudo apt-get install -y mysql-server")
if stderr:
    print(f"Erreur lors de l'installation de MySQL: {stderr}")
    exit(1)

# Interaction avec mysql_secure_installation
print("Sécurisation de MySQL...")
secure_mysql_script = """
{password}
n
y
y
y
y
""".format(password=os.getenv('PASSWORD'))

stdout, stderr = run_command("sudo mysql_secure_installation", input=secure_mysql_script)
if stderr:
    print(f"Erreur lors de la sécurisation de MySQL: {stderr}")
    exit(1)

# Modification du mot de passe root et sécurisation
root_password_change = "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '{password}'; FLUSH PRIVILEGES;".format(password=os.getenv('PASSWORD'))
stdout, stderr = run_command(f"sudo mysql -e \"{root_password_change}\"")
if stderr:
    print(f"Erreur lors de la modification du mot de passe root: {stderr}")
    exit(1)

# Création de la base de données
db_name = os.getenv('DB_NAME')
print(f"Création de la base de données '{db_name}'...")
stdout, stderr = run_command(f"sudo mysql -u root -p{os.getenv('PASSWORD')} -e \"CREATE DATABASE {db_name};\"")
if stderr:
    print(f"Erreur lors de la création de la base de données: {stderr}")
    exit(1)
create_tables(tables)
print("Script terminé avec succès.")
