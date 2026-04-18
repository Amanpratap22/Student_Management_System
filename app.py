from flask import Flask,request,jsonify,send_from_directory
import sqlite3

app = Flask(__name__)

def create_db():
    conn = sqlite3.connect("students.db")
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS students(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    roll TEXT,
    course TEXT,
    email TEXT
    )
    """)

    conn.commit()
    conn.close()

create_db()

@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/style.css")
def css():
    return send_from_directory(".", "style.css")

@app.route("/script.js")
def js():
    return send_from_directory(".", "script.js")

@app.route("/add",methods=["POST"])
def add():
    data = request.json

    conn = sqlite3.connect("students.db")
    cur = conn.cursor()

    cur.execute("INSERT INTO students(name,roll,course,email) VALUES(?,?,?,?)",
    (data["name"],data["roll"],data["course"],data["email"]))

    conn.commit()
    conn.close()

    return jsonify({"msg":"added"})

@app.route("/students")
def students():

    conn = sqlite3.connect("students.db")
    cur = conn.cursor()

    cur.execute("SELECT * FROM students")
    rows = cur.fetchall()

    conn.close()

    return jsonify(rows)

@app.route("/delete/<int:id>",methods=["DELETE"])
def delete(id):

    conn = sqlite3.connect("students.db")
    cur = conn.cursor()

    cur.execute("DELETE FROM students WHERE id=?",(id,))
    conn.commit()
    conn.close()

    return jsonify({"msg":"deleted"})

app.run(debug=True)