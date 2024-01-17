import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import mail_connection_manager



def mail(receiver, path):
    smtp_address = 'mail.gmx.com'
    smtp_port = 465
    mail_credentials = mail_connection_manager.get_mail_credentials()
    email_address = mail_credentials["mail"]
    email_password = mail_credentials["password"] 
    email_receiver = mail_credentials["mail"]

    print(email_address, email_password, email_receiver)

    # Création du message MIME
    message = MIMEMultipart("alternative")
    message["Subject"] = "subject"
    message["From"] = email_address
    message["To"] = email_receiver


    with open(path, "r+") as html_file:
        html = html_file.read()
    
    # Ajout des parties HTML au message MIME
    message.attach(MIMEText(html, "html"))

    # Connexion au serveur et envoi de l'e-mail
    context = ssl.create_default_context()
    try:
        print("envoi du mail")
        with smtplib.SMTP_SSL(smtp_address, smtp_port, context=context) as server:
            server.login(email_address, email_password)
            server.sendmail(email_address, email_receiver, message.as_string())
    except Exception as e:
        print(f"Une erreur s'est produite: {e}")

mail("t.florian181181@gmail.com", "back_end/managers/mails/templates/contact_form_response.html")