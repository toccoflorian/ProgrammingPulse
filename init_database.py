

from back_end.models.Database import Database


DB = Database()

connexion, cursor = DB.open_connection()

# users TABLE
columns = [
    ("id", "INT NOT NULL AUTO_INCREMENT"),
    ("creation_date", "DATETIME"),
    ("family_name", "VARCHAR(45)"),
    ("given_name", "VARCHAR(45)"),
    ("mail", "DATETIME"),
    ("tel", "DATETIME"),
    ("organization", "VARCHAR(45)"),
    ("password", "VARCHAR(100)"),
    ("session_id", "INT"),
    ("is_admin", "TINYINT"),
]
for column in columns:
    sql_request = f"""ALTER TABLE `programmingpulsestudio`.`users` ADD {column[0]} {column[1]}, PRIMARY KEY (id)"""
    cursor.execute(sql_request)



DB.close_connection()