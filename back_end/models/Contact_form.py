


class Contact_form():
    def __init__(self, DB, creation_date, state, family_name, given_name, organization, tel, mail, message, response_date, response) -> None:
        super().__init__()
        self.__DB = DB
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

    # enregistré un formulaire de contact sur la base de données
    def save(self):
        self.__DB.INSERT(
            "contact_form",
            ["creation_date", "state","family_name","given_name","organization","tel","mail", "message"],
            [
            self.creation_date,
            self.state,
            self.family_name, 
            self.given_name, 
            self.organization, 
            self.tel, 
            self.mail, 
            self.message
            ]
        )

    def send_by_mail(self):
        import smtplib, ssl
        from email.mime.text import MIMEText
        from email.mime.multipart import MIMEMultipart
        from security import mail_connection_manager

        smtp_address = 'mail.gmx.com'
        smtp_port = 465
        email_address = mail_connection_manager.get_mail_credentials()["mail"]
        email_password = mail_connection_manager.get_mail_credentials()["password"]  # Utilisez une méthode plus sûre pour gérer les mots de passe
        email_receiver = mail_connection_manager.get_mail_credentials()["mail"]

        # Création du message MIME
        message = MIMEMultipart("alternative")
        message["Subject"] = f"Contact de {self.family_name} {self.given_name}"
        message["From"] = email_address
        message["To"] = email_receiver


        html = f"""
            <html>
            <body>
                <h1>Contact <br/>
                {self.family_name} {self.given_name}</h1>
                <h2>{self.organization}</h1>
                <h2>{self.creation_date.split(" ")[0]} à {self.creation_date.split(" ")[1]}</h2>
                <ul>
                    <li>{self.mail}</li>
                    <li>{self.tel}</li>
                </ul>

                <p>
                    {self.message}
                </p>

            </body>
            </html>
            """
        
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
