import security.sql_connection_manager as connection

class Database():
    __TABLES = {
        "contact_form": "`programmingpulsestudio`.`contact_form_table`",
        "users": "`programmingpulsestudio`.`users`",
        "sessions": "`programmingpulsestudio`.`sessions`",
        "projects": "`programmingpulsestudio`.`projects`",
        "comments": "`programmingpulsestudio`.`comments`",
    }

    def __init__(self) -> None:
        pass

    # établir la connexion à la base de données
    def open_connection(self) -> None:
        try:
            conn = connection.connection_callback()
            if not conn[0]:
                return conn[1]
            return  conn[1],  conn[1].cursor()
        except Exception as e:
            print(e.with_traceback(None))

    # fermer la connexion à la base de données
    def close_connection(self, connection, cursor):
        try:
            cursor.close(), connection.close()
        except Exception as e:
            print(e.with_traceback(None))

    def formatSqlColumnsAndValues(self, values, type=""):
        string = ""
        for value in values:
            if type == "values":
                string += f" '{value}',"
            else:
                string += f" `{value}`,"
        return string[:-1]
    
    def execute(self, request, request_type=""):
        connection, cursor = self.open_connection()
        cursor.execute(request)
        if request_type == "get":
            result = cursor.fetchall()
            self.close_connection(connection, cursor)
            return result
        else:
            connection.commit()
            self.close_connection(connection, cursor)
            return True

    def INSERT(self, table, columns, values):
        try:
            sql_request = f"INSERT INTO {self.__TABLES[table]} ({self.formatSqlColumnsAndValues(columns)}) VALUES ({self.formatSqlColumnsAndValues(values, 'values')})"
            self.execute(sql_request)
            return (True, "")
        except Exception as e:
            print(e.with_traceback(None))
            if e.errno == 1062:
                return (False, f"'{e.msg.split(chr(39))[1]}' existe déjà dans la base de données.")
            else:
                return (False, e.msg)
        
    def SELECT(self, what, table, condition=None, join=None):
        sql_request = f"""SELECT {what} FROM {self.__TABLES[table]} 
                        {(' JOIN ' + self.__TABLES[join['table']] + " ON " + join["key_value"]) if join else ''} 
                        {' WHERE ' + condition if condition else ''};"""
        return self.execute(sql_request, "get")

    def DELETE(self, table, condition=None):
        sql_request = f"DELETE FROM {self.__TABLES[table]} {'WHERE ' + condition if condition else ''}"
        self.execute(sql_request)

    def UPDATE(self, table, new_key_value_pair, condition=None):
        sql_request = f"UPDATE {self.__TABLES[table]} SET {new_key_value_pair} {'WHERE ' + condition if condition else ''}"
        self.execute(sql_request)

    def COUNT(self, what, table, condition=None):
        sql_request = f"SELECT COUNT({what}) FROM {self.__TABLES[table]} {' WHERE ' + condition if condition else ''}"
        return self.execute(sql_request, "get")[0][0]