from os import umask
from typing import List
from flask import Flask, request, jsonify
import sqlite3
import requests

connection = sqlite3.connect("users.db")
db = connection.cursor()

db.execute("SELECT * FROM users")
rows = db.fetchall()


app_users = Flask(__name__)

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
                if str(search).lower() in str(user[str(filter)]).lower():
                    users.append(user)
            return jsonify(users)
        except:
            return "Filter not found"


@app_users.route("/user", methods=["GET","POST"])
@app_users.route("/user/<email>/<password>", methods=["GET","POST"])
def user(email, password):
    null = []
    for user in rows:
        if user[3] == email and user[4] == password:
            return jsonify(user)
    return jsonify(null)


app_users.run(port = 8000, debug=True)