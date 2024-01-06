
from datetime import datetime
import json


class Project():
    def __init__(self, DB, id, user_id, project_name, state, start_date, end_date, description, note) -> None:
        self.DB = DB
        self.id = id
        self.user_id = user_id
        self.project_name = project_name
        self.state = state
        self.start_date = start_date
        self.end_date = end_date
        self.description = description
        self.note = note
        self.comment = DB.get_project_comment(self.id, self.user_id)

    def get_json(self):
        print("comment", self.comment)
        return json.dumps({
            "id": self.id,
            "user_id": self.user_id,
            "project_name": self.project_name,
            "state": self.state,
            "start_date": datetime.strftime(self.start_date, "%d/%m/%YT%H:%M") if self.start_date else None,
            "end_date": datetime.strftime(self.end_date, "%d/%m/%YT%H:%M") if self.end_date else None,
            "description": self.description,
            'note': self.note,
            "comment": self.comment.get_json() if self.comment else None
        })