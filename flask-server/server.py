from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os, sqlite3, jwt, datetime
from functools import wraps

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = "supersecretkey"

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def init_db():
    conn = sqlite3.connect("images.db")
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT)")
    c.execute("CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY, filename TEXT, user_id INTEGER)")
    conn.commit()
    conn.close()

init_db()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        try:
            token = token.replace("Bearer ", "")
            data = jwt.decode(token, app.secret_key, algorithms=["HS256"])
            user_id = data["user_id"]
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        return f(user_id, *args, **kwargs)
    return decorated

@app.route("/")
def index():
    return "Flask backend with JWT is running!"

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data["email"]
    password = generate_password_hash(data["password"])

    try:
        conn = sqlite3.connect("images.db")
        c = conn.cursor()
        c.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, password))
        conn.commit()
        return jsonify({"message": "User created"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Email already exists"}), 409
    finally:
        conn.close()

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    conn = sqlite3.connect("images.db")
    c = conn.cursor()
    c.execute("SELECT id, password FROM users WHERE email = ?", (email,))
    user = c.fetchone()
    conn.close()

    if user and check_password_hash(user[1], password):
        token = jwt.encode(
            {
                "user_id": user[0],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            },
            app.secret_key,
            algorithm="HS256"
        )
        return jsonify({"token": token})
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/upload", methods=["POST"])
@token_required
def upload_image(user_id):
    if "image" not in request.files:
        return jsonify({"error": "Image is required"}), 400

    file = request.files["image"]
    filename = file.filename
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    conn = sqlite3.connect("images.db")
    c = conn.cursor()
    c.execute("INSERT INTO images (filename, user_id) VALUES (?, ?)", (filename, user_id))
    conn.commit()
    conn.close()

    return jsonify({"message": "Upload successful"})

@app.route("/images")
@token_required
def get_images(user_id):
    conn = sqlite3.connect("images.db")
    c = conn.cursor()
    c.execute("SELECT filename FROM images WHERE user_id = ?", (user_id,))
    files = [row[0] for row in c.fetchall()]
    conn.close()
    return jsonify(files)

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

if __name__ == "__main__":
    app.run(debug=True)