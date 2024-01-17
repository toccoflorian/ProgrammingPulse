

def admin_actions_routes(app_, render_template, DB ):
    app = app_

    @app.route("/delete/user/<int:id>")
    def delete(id):
        result = DB.SELECT("family_name, given_name", "users", f"id={id}")
        if not result:
            return render_template( "users_manager.html", status=False, family_name="", given_name="", error=result)
        family_name = result[0][0]
        given_name = result[0][1]
        result = True#DB.DELETE("sessions", f"user_id={id}")
        if not result:
            return render_template( "users_manager.html", status=False, family_name="", given_name="", error=result)
        result = False#DB.DELETE("users", f"id={id}")
        print("delete")
        print(result)
        return render_template( "users_manager.html", status=result, family_name=family_name, given_name=given_name, display="response")