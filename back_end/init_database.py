

from models.Database import Database


DB = Database()

connexion, cursor = DB.open_connection()

# ("id", "INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id)"),

# users TABLE
tables = {
    "users": {
        ("creation_date", "DATETIME NOT UNIQUE"),
        ("family_name", "VARCHAR(45) NOT UNIQUE"),
        ("given_name", "VARCHAR(45) NOT UNIQUE"),
        ("mail", "DATETIME NOT UNIQUE"),
        ("tel", "DATETIME NOT UNIQUE"),
        ("organization", "VARCHAR(45) NOT UNIQUE"),
        ("password", "VARCHAR(100) NOT UNIQUE"),
        ("session_id", "INT NOT UNIQUE"),
        ("is_admin", "TINYINT NOT UNIQUE"),
    },
    "contact_forms": {
        ("creation_date", "DATETIME NOT UNIQUE"), 
         ("state", "VARCHAR(45) NOT UNIQUE"),
         ("family_name", "VARCHAR(45) NOT UNIQUE"),
         ("given_name", "VARCHAR(45) NOT UNIQUE"),
         ("organization", "VARCHAR(45) NOT UNIQUE"),
         ("tel", "VARCHAR(45) NOT UNIQUE"),
         ("mail", "VARCHAR(45) NOT UNIQUE"),
         ("message", "MEDIUMTEXT NOT UNIQUE"),
    },
    "devis": {
        ("edition_date", "DATETIME NOT UNIQUE"),
        ("state", "VARCHAR(45) NOT UNIQUE"),
        ("signature_date", "DATETIME NOT UNIQUE"),
        ("cloturation_date", "DATETIME NOT UNIQUE"),
        ("project_id", "INT NOT UNIQUE"),
    },
}


print()
for table_name in tables:
    print()
    print("création de la table " + table_name)
    sql_request = f"CREATE TABLE {table_name} (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id))"
    cursor.execute(str(sql_request))
    print(table_name, "créer !")
    print()

    for column in tables[table_name]:
        print("création de la colonne " + column[0] + "-" + column[1])
        sql_request = f"ALTER TABLE users ADD {column[0]} {column[1]}"
        print("colonne " + column[0] + " créer !")
        print()
        cursor.execute(str(sql_request))
    

    print("Table " + table_name + " terminée !")
    
# sql_request = f"ALTER TABLE `programmingpulsestudio`.`users` PRIMARY KEY (id);"



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
