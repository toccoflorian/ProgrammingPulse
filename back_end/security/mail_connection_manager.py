import os, dotenv
def get_mail_credentials():
    dotenv.load_dotenv()
    return {"mail": os.getenv("MAIL_IDENTIFIANT"), "password": os.getenv("MAIL_PASSWORD")}

###########################################################################################
#       refactoring pour ne pas retourner de credentials