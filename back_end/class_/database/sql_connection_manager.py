import os
from dotenv import load_dotenv
import mysql.connector as connector

# établir la connexion avec la base de données 
def connect_DB(host, db_name, user_name, password) -> object:
    config = {
        'host': host,
        'database': db_name,
        'user': user_name,
        'password': password,
        'raise_on_warnings': True
        }
    try:
        return (True, connector.connect(**config))
    except connector.IntegrityError as e:
        return (False, e.with_traceback(None))

# callback pour déclencher la connexion à la base de données
def connection_callback(): 
    load_dotenv()
    return connect_DB(os.getenv("HOST"), 
                      os.getenv("DB_NAME"), 
                      os.getenv("USER_NAME"), 
                      os.getenv("PASSWORD"))

