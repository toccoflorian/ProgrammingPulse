

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
secure_mysql_script = f"""
{os.getenv('PASSWORD')}
n
y
y
y
y
"""

stdout, stderr = run_command("sudo mysql_secure_installation", input=secure_mysql_script)
if stderr:
    print(f"Erreur lors de la sécurisation de MySQL: {stderr}")
    exit(1)

# Modification du mot de passe root et sécurisation
root_password_change = f"ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '{os.getenv('PASSWORD')}'; FLUSH PRIVILEGES;"
stdout, stderr = run_command(f"sudo mysql -e \"{root_password_change}\"")
if stderr:
    print(f"Erreur lors de la modification du mot de passe root: {stderr}")
    exit(1)


# Créer une base de données 'programmingpulsestudio'
print("Création de la base de données 'programmingpulsestudio'...")
stdout, stderr = run_command("sudo mysql -u root -p")

stdout, stderr = run_command(f"CREATE SCHEMA {os.getenv('DB_NAME')};")
stdout, stderr = run_command("exit;")
if stderr:
    print(f"Erreur lors de la Création de la base de données:")
    print(stdout)
    exit(1)

print("Script terminé avec succès.")
