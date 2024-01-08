

# from models.Database import Database


# DB = Database()

# connexion, cursor = DB.open_connection()

# # users TABLE
# columns = [
#     ("id", "INT NOT NULL AUTO_INCREMENT"),
#     ("creation_date", "DATETIME"),
#     ("family_name", "VARCHAR(45)"),
#     ("given_name", "VARCHAR(45)"),
#     ("mail", "DATETIME"),
#     ("tel", "DATETIME"),
#     ("organization", "VARCHAR(45)"),
#     ("password", "VARCHAR(100)"),
#     ("session_id", "INT"),
#     ("is_admin", "TINYINT"),
# ]
# for column in columns:
#     sql_request = f"""ALTER TABLE `programmingpulsestudio`.`users` ADD {column[0]} {column[1]}, PRIMARY KEY (id)"""
#     cursor.execute(sql_request)



# DB.close_connection()


import subprocess

# Fonction pour exécuter une commande et retourner la sortie
def run_command(command):
    process = subprocess.run(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
    return process.stdout, process.stderr, process.returncode

# Installer MySQL Server
print("Installation de MySQL Server...")
stdout, stderr, exitcode = run_command("sudo apt-get update && sudo apt-get install -y mysql-server")

if exitcode != 0:
    print(f"Erreur lors de l'installation de MySQL: {stderr}")
    exit(1)

# Sécuriser l'installation de MySQL
print("Sécurisation de MySQL...")
# Les commandes suivantes sont des exemples et peuvent nécessiter des ajustements
# Vous devriez remplacer 'your_root_password' avec le mot de passe root souhaité
commands = [
    "sudo mysql_secure_installation",
    "sudo mysql -e \"ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_root_password';\"",
    "sudo mysql -e \"FLUSH PRIVILEGES;\""
]

for command in commands:
    stdout, stderr, exitcode = run_command(command)
    if exitcode != 0:
        print(f"Erreur lors de la sécurisation de MySQL: {stderr}")
        exit(1)

# Créer une base de données 'programmingpulsestudio'
print("Création de la base de données 'programmingpulsestudio'...")
stdout, stderr, exitcode = run_command("sudo mysql -u root -p your_root_password -e \"CREATE DATABASE programmingpulsestudio;\"")

if exitcode != 0:
    print(f"Erreur lors de la création de la base de données: {stderr}")
    exit(1)

# Créer une table 'users'
print("Création de la table 'users'...")
create_table_command = """
sudo mysql -u root -p your_root_password -e "CREATE TABLE programmingpulsestudio.users (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
);" """

stdout, stderr, exitcode = run_command(create_table_command)

if exitcode != 0:
    print(f"Erreur lors de la création de la table 'users': {stderr}")
    exit(1)

print("Script terminé avec succès.")
