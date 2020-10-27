import sqlite3

connection = sqlite3.connect('users.db')
db = connection.cursor()


db.execute('''CREATE TABLE users([id] INTEGER PRIMARY KEY,[firstname] text, [lastname] text, [email] text,[password] text,[dni] int,[country] text)''')
db.execute("INSERT INTO users(firstname, lastname, email, password, dni, country) VALUES('Francisco', 'Martiarena', 'fmartiarena@gmail.com', 'fran123', '4321567', 'Argentina')")
db.execute("INSERT INTO users(firstname, lastname, email, password, dni, country) VALUES('Nahuel', 'Fredes', 'nfredes@gmail.com', 'nahu123', '43925584', 'Peru')")
db.execute("INSERT INTO users(firstname, lastname, email, password, dni, country) VALUES('Ignacio', 'Martinez', 'imartinez@gmail.com', 'igna123', '431235', 'Uruguay')")
db.execute("INSERT INTO users(firstname, lastname, email, password, dni, country) VALUES('Pepe', 'Loco', 'ploco@gmail.com', 'pepe123', '4312235', 'Chile')")
connection.commit()