

from datetime import datetime
import json


class Comment():
    def __init__(self, id, user_id, project_id, text, date):
        self.id = id
        self.user_id = user_id
        self.project_id = project_id
        self.text = text
        self.date = date

    def get_json(self):
        return json.dumps({
            "id": self.id,
            "user_id": self.user_id,
            "project_id": self.project_id,
            "text": self.text,
            "date": datetime.strftime(self.date, "%d/%m/%YT%H:%M") if self.date else None,
        })