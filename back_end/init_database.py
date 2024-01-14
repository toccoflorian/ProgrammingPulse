

from models.Database import Database


DB = Database()

connexion, cursor = DB.open_connection()

# ("id", "INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id)"),

# users TABLE
tables = {
    "users": {
        ("creation_date", "DATETIME "),
        ("family_name", "VARCHAR(45) "),
        ("given_name", "VARCHAR(45) "),
        ("mail", "DATETIME NULL"),
        ("tel", "DATETIME NULL"),
        ("organization", "VARCHAR(45) "),
        ("password", "VARCHAR(100) "),
        ("session_id", "INT "),
        ("is_admin", "TINYINT "),
    },
    "contact_form_table": {
        ("creation_date", "DATETIME "), 
        ("state", "VARCHAR(45) "),
        ("family_name", "VARCHAR(45) "),
        ("given_name", "VARCHAR(45) "),
        ("organization", "VARCHAR(45) "),
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
    
}


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
    

print("Script terminé avec succès !! \n")




DB.close_connection()


# import subprocess

# # Fonction pour exécuter une commande et retourner la sortie
# def run_command(command):
#     process = subprocess.run(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
#     return process.stdout, process.stderr, process.returncode

# # Installer MySQL Server
# print("Installation de MySQL Server...")
# stdout, stderr, exitcode = run_command("sudo apt-get update && sudo apt-get install -y mysql-server")

# if exitcode != 0:
#     print(f"Erreur lors de l'installation de MySQL: {stderr}")
#     exit(1)

# # Sécuriser l'installation de MySQL
# print("Sécurisation de MySQL...")
# # Les commandes suivantes sont des exemples et peuvent nécessiter des ajustements
# # Vous devriez remplacer 'your_root_password' avec le mot de passe root souhaité
# commands = [
#     "sudo mysql_secure_installation",
#     "sudo mysql -e \"ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_root_password';\"",
#     "sudo mysql -e \"FLUSH PRIVILEGES;\""
# ]

# for command in commands:
#     stdout, stderr, exitcode = run_command(command)
#     if exitcode != 0:
#         print(f"Erreur lors de la sécurisation de MySQL: {stderr}")
#         exit(1)

# # Créer une base de données 'programmingpulsestudio'
# print("Création de la base de données 'programmingpulsestudio'...")
# stdout, stderr, exitcode = run_command("sudo mysql -u root -p your_root_password -e \"CREATE DATABASE programmingpulsestudio;\"")

# if exitcode != 0:
#     print(f"Erreur lors de la création de la base de données: {stderr}")
#     exit(1)

# # Créer une table 'users'
# print("Création de la table 'users'...")
# create_table_command = """
# sudo mysql -u root -p your_root_password -e "CREATE TABLE programmingpulsestudio.users (
#   id INT NOT NULL AUTO_INCREMENT,
#   PRIMARY KEY (id)
# );" """

# stdout, stderr, exitcode = run_command(create_table_command)

# if exitcode != 0:
#     print(f"Erreur lors de la création de la table 'users': {stderr}")
#     exit(1)

# print("Script terminé avec succès.")
