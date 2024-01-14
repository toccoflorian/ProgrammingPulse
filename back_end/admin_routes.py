

from models.User import User


def admin_routes(app_, render_template, DB ):
    app = app_

    @app.route("/admin")
    def admin():
        nb_users = DB.COUNT("*", "users")
        nb_contact = DB.COUNT("*", "contact_form")
        nb_projects = DB.COUNT("*", "projects")
        nb_comments = DB.COUNT("*", "projects")
        nb_sessions = DB.COUNT("*", "sessions")
        return render_template("admin.html", nb_users=nb_users, nb_contact=nb_contact, nb_projects=nb_projects, nb_comments=nb_comments, nb_sessions=nb_sessions)



    @app.route("/users_manager", methods=["GET"])
    def users_manager():
        users = []
        for user in DB.SELECT("*", "users"):
            users.append( User( DB, * user ))
        return render_template("users_manager.html", users=users)
    
    @app.route("/projects_manager", methods=["GET"])
    def projects_manager():
        return render_template("projects_manager.html")
    
    @app.route("/devis_manager", methods=["GET"])
    def devis_manager():
        return render_template("devis_manager.html")
    
    @app.route("/contact_form_manager", methods=["GET"])
    def contact_form_manager():
        return render_template("contact_form_manager.html")
    
    @app.route("/sessions_manager", methods=["GET"])
    def sessions_manager():
        return render_template("sessions_manager.html")