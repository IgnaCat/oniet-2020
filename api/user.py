from os import umask
from typing import List
from flask import Flask, request, jsonify
import sqlite3
import requests
from flask_cors import CORS
import json 

connection = sqlite3.connect("users.db")
db = connection.cursor()

db.execute("SELECT * FROM users")
rows = db.fetchall()


app_users = Flask(__name__)
CORS(app_users)

response = requests.get('https://api.covid19api.com/summary') 
data = response.json()
data = data["Countries"]


@app_users.route('/')
@app_users.route('/data/', defaults={'filter': None, 'search': None})
@app_users.route('/data/<filter>/', defaults={'search': None})
@app_users.route("/data/<filter>/<search>", methods=["GET","POST"])
def data1(filter, search):
    
    users = []
    if filter is None or search is None:
        return jsonify(data)
    elif filter == "all":
        return jsonify(data)
    else:
        try:
            for user in data:
                
                if search.encode('utf-8') in user[filter.encode('utf-8')]:
                    users.append(user)
            return jsonify(users)
        except:
            return "xd"


@app_users.route("/user", methods=["GET","POST"])
@app_users.route("/user/<email>/<password>", methods=["GET","POST"])
def user(email, password):
    null = []
    for user in rows:
        if user[3] == email and user[4] == password:
            return jsonify({"id":user[0], "firstname":user[1], "lastname":user[2], "email":user[3], "password":user[4], "dni":user[5], "country":user[6]})



@app_users.route('/post', methods=['POST'])
def post():
    if not request.json:
        return "no data posted"
    else:
  
        data2update = request.json

        #db.execute("INSERT INTO users(firstname, lastname, email, password, dni, country) VALUES('{}', '{}', '{}', '{}', {}, '{}')").format(data2update["firstname"], data2update["lastname"], data2update["email"], data2update["password"], data["dni"], data["country"])
        db.execute("UPDATE users set firstname='{}', lastname='{}', email='{}', password='{}', dni={}, country='{}' WHERE id = {}").format(data2update["firstname"], data2update["lastname"], data2update["email"], data2update["password"], data2update["dni"], data2update["country"], data2update["id"])
        connection.commit()




app_users.run(port = 8000, debug=True)