from flask import Flask, request, jsonify, send_from_directory, session, g
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
import sqlite3
import uuid

app = Flask(__name__)
app.secret_key = "supersecretkey"
CORS(app, supports_credentials=True)

app.config["UPLOAD_FOLDER"] = "uploads"
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect("images.db")
        g.db.row_factory = sqlite3.Row
    return g.db

@app.teardown_appcontext
def close_db(exception):
    db = g.pop("db", None)
    if db:
        db.close()

def init_db():
    db = get_db()
    c = db.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        email TEXT UNIQUE,
        password TEXT
    )""")
    c.execute("""CREATE TABLE IF NOT EXISTS images (
        id INTEGER PRIMARY KEY,
        filename TEXT,
        title TEXT,
        user_id INTEGER
    )""")
    db.commit()

@app.before_request
def load_user():
    g.user_id = session.get("user_id")

@app.route("/")
def index():
    return "Flask backend is running!"

@app.route("/signup", methods=["POST"])
def signup():
    session.clear()

    data = request.get_json()
    email = data.get("email")
    password = generate_password_hash(data.get("password"))

    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, password))
        db.commit()

        user_id = cursor.lastrowid
        session["user_id"] = user_id

        return jsonify({"message": "User created", "user_id": user_id}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Email already exists"}), 409

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    db = get_db()
    user = db.execute("SELECT id, password FROM users WHERE email = ?", (email,)).fetchone()

    if user and check_password_hash(user["password"], password):
        session["user_id"] = user["id"]
        return jsonify({"message": "Login successful", "user_id": user["id"]})
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Logged out"})

@app.route("/upload", methods=["POST"])
def upload_image():
    if not g.user_id:
        return jsonify({"error": "Not logged in"}), 401

    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    title = request.form.get("title", "").strip()
    if not title:
        return jsonify({"error": "Title is required"}), 400

    filename = secure_filename(file.filename)
    unique_filename = f"{uuid.uuid4().hex}_{filename}"
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], unique_filename)
    file.save(filepath)

    db = get_db()
    db.execute(
        "INSERT INTO images (filename, title, user_id) VALUES (?, ?, ?)",
        (unique_filename, title, g.user_id),
    )
    db.commit()

    return jsonify({"message": "Upload successful", "filename": unique_filename}), 201

@app.route("/images", methods=["GET"])
def get_images():
    if not g.user_id:
        return jsonify({"error": "Not logged in"}), 401

    db = get_db()
    rows = db.execute("SELECT filename, title FROM images WHERE user_id = ?", (g.user_id,)).fetchall()
    images = [{"filename": row["filename"], "title": row["title"]} for row in rows]
    return jsonify(images)

@app.route("/delete-image", methods=["POST"])
def delete_image():
    if not g.user_id:
        return jsonify({"error": "Not logged in"}), 401

    data = request.get_json()
    filename = data.get("filename")

    db = get_db()
    db.execute("DELETE FROM images WHERE filename = ? AND user_id = ?", (filename, g.user_id))
    db.commit()

    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    if os.path.exists(filepath):
        os.remove(filepath)

    return jsonify({"message": "Image deleted"})

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.route("/change-password", methods=["POST"])
def change_password():
    if not g.user_id:
        return jsonify({"error": "Not logged in"}), 401

    data = request.get_json()
    current_password = data.get("current_password")
    new_password = data.get("new_password")

    db = get_db()
    user = db.execute("SELECT password FROM users WHERE id = ?", (g.user_id,)).fetchone()

    if user and check_password_hash(user["password"], current_password):
        new_hash = generate_password_hash(new_password)
        db.execute("UPDATE users SET password = ? WHERE id = ?", (new_hash, g.user_id))
        db.commit()
        return jsonify({"message": "Password updated"})
    return jsonify({"error": "Current password incorrect"}), 400

@app.route("/user/<int:user_id>")
def get_user(user_id):
    db = get_db()
    row = db.execute("SELECT email FROM users WHERE id = ?", (user_id,)).fetchone()
    if row:
        return jsonify({"email": row["email"]})
    return jsonify({"error": "User not found"}), 404

@app.route("/delete-account", methods=["POST"])
def delete_account():
    if not g.user_id:
        return jsonify({"error": "Not logged in"}), 401

    db = get_db()

    rows = db.execute("SELECT filename FROM images WHERE user_id = ?", (g.user_id,)).fetchall()
    filenames = [row["filename"] for row in rows]

    db.execute("DELETE FROM images WHERE user_id = ?", (g.user_id,))

    db.execute("DELETE FROM users WHERE id = ?", (g.user_id,))
    db.commit()

    for filename in filenames:
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        if os.path.exists(filepath):
            os.remove(filepath)

    session.clear()

    return jsonify({"message": "Account and all images deleted successfully."})


if __name__ == "__main__":
    with app.app_context():
        init_db()
    app.run(debug=True)