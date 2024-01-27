from flask import jsonify
from datetime import datetime
from managers import image_manager 
from security import sanitise_data

def admin_actions_routes(app_, render_template, request, DB ):
    app = app_


    @app.route("/delete/user/<int:user_id>")
    def delete_user(user_id):
        result = DB.SELECT("family_name, given_name", "users", f"id={user_id}")
        if not result:
            return render_template( "users_manager.html", status=False, family_name="", given_name="", message=result)
        family_name = result[0][0]
        given_name = result[0][1]
        result = DB.DELETE("sessions", f"user_id={user_id}")
        if not result:
            return render_template( "users_manager.html", status=False, family_name="", given_name="", message=result)
        result = DB.DELETE("users", f"id={user_id}")
        print("delete")
        print(result)
        return render_template( "users_manager.html", status=result, family_name=family_name, given_name=given_name, message=f"L'utilisateur {family_name, given_name} à été supprimer.", display="response")
    


    @app.route("/delete/project/<int:project_id>")
    def delete_project(project_id):
        result = DB.SELECT("project_name", "projects", f"id={project_id}")
        if not result:
            return render_template( "users_manager.html", status=False, project_name="", message=result)
        project_name = result[0]
        print(project_name)
        result = DB.DELETE("comments", f"project_id={project_id}")
        if not result:
            return render_template( "users_manager.html", status=False, project_name="", message=result)
        result = DB.DELETE("projects", f"id={project_id}")
        image_to_delete = f"project_image_{project_id}.webp"
        print("delete")
        print(result)
        return render_template( "users_manager.html", status=result, project_name=project_name, message=f"Projet {project_name} supprimer !",display="response")
    


    @app.route("/delete/comment/<int:comment_id>")
    def delete_comment(comment_id):
        
        result = DB.DELETE("comments", f"id={comment_id}")
        if not result:
            return render_template( "users_manager.html", status=False, comment_id=comment_id, message=result)
        print("delete")
        print(result)
        return render_template( "users_manager.html", status=result, comment_id=comment_id, message=f"Commentaire id n° {comment_id} supprimer !", display="response")
    


    @app.route("/create_new_project/<int:project_user_id>", methods=["POST"])
    def create_new_project(project_user_id):
        request_data = request.form
        
        project_name = request_data.get("projectName")
        project_description = request_data.get("projectDescription")
        project_logo = request.files.get("projectLogo")
        result, clean_data = sanitise_data.sanitise_data({"project_name": project_name, "project_description": project_description})
        if not result:
            return jsonify(clean_data)
        print()
        print(clean_data["project_name"])
        print(clean_data["project_description"])
        print("image:")
        print(project_logo)
        print()
        DB.INSERT(
            "projects", 
            ("user_id" ,"project_name", "state", "start_date", "description"), 
            (project_user_id, clean_data["project_name"], "en cours", datetime.strftime(datetime.now(), "%Y-%m-%d %H:%M:%S"), clean_data["project_description"]))
        image_manager.save_image_to_webp(
            DB.SELECT("id", "projects", f"user_id='{project_user_id}' AND project_name='{clean_data['project_name']}'")[0][0], 
            "project_logo", 
            project_logo.read())
        return 'render_template( "users_manager.html" )'
    

    @app.route("/add_project_image/<int:project_id>/<int:project_user_id>", methods=["POST"])
    def add_project_image(project_id, project_user_id):
        data = request.files.get("projectImage")
        image_manager.save_image_to_webp(
            DB.SELECT("id", "projects", f"id='{project_id}' AND user_id='{project_user_id}'")[0][0], 
            "project_image", 
            data.read(),
            True)
        return 'render_template( "users_manager.html" )' 
    

    @app.route("/change_project_logo/<int:project_id>/<int:project_user_id>", methods=["POST"])
    def change_project_logo(project_id, project_user_id): 
        data = request.files.get("projectLogo")
        image_manager.save_image_to_webp(
            DB.SELECT("id", "projects", f"id='{project_id}' AND user_id='{project_user_id}'")[0][0], 
            "project_logo", 
            data.read())
        return 'render_template( "users_manager.html" )' 