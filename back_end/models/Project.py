from datetime import datetime
import json

from managers import image_manager 
from .Comment import Comment

class Project():
    def __init__(self, DB, id, user_id, project_name, state, start_date, end_date, description, note) -> None:
        self.__DB = DB
        self.id = id
        self.user_id = user_id
        self.project_name = project_name
        self.state = state
        self.start_date = start_date
        self.end_date = end_date
        self.description = description
        self.note = note
        comment = DB.SELECT("id, user_id, project_id, text, date", "comments", f"project_id='{self.id}' AND user_id='{self.user_id}'")
        self.comment = Comment(DB, *comment[0]) if comment else None
        self.nb_of_images = image_manager.count_project_images(self.id)

    def edit_note(self, note):
        self.__DB.UPDATE("projects", f"note='{note}'", f"id='{self.id}' AND user_id='{self.user_id}'")

    def get_json(self):
        return json.dumps({
            "id": self.id,
            "user_id": self.user_id,
            "project_name": self.project_name,
            "state": self.state,
            "start_date": datetime.strftime(self.start_date, "%d/%m/%YT%H:%M") if self.start_date else None,
            "end_date": datetime.strftime(self.end_date, "%d/%m/%YT%H:%M") if self.end_date else None,
            "description": self.description,
            'note': self.note,
            "comment": self.comment.get_json() if self.comment else None,
            "nb_of_images": self.nb_of_images,
        })