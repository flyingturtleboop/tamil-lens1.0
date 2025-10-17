# app.py
from datetime import timedelta
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity, set_refresh_cookies,
    unset_jwt_cookies
)
from models import db, User

# ---------------------------------------
# App factory
# ---------------------------------------
def create_app():
    app = Flask(__name__)

    # ---- Core config ----
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-change-me")
    app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "dev-jwt-secret-change-me")

    # JWT in headers for access, in cookies for refresh
    app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies"]
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)

    # Cookie settings (tune for prod)
    app.config["JWT_COOKIE_SECURE"] = False            # True in prod (HTTPS)
    app.config["JWT_COOKIE_SAMESITE"] = "Lax"
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False      # Enable + send X-CSRF-TOKEN in prod

    # ---- Database ----
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///app.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)

    # Migrations (optional but recommended)
    Migrate(app, db)

    # ---- CORS ----
    FRONTEND_ORIGIN = os.environ.get("FRONTEND_ORIGIN", "http://localhost:3000")
    CORS(
        app,
        resources={r"/*": {"origins": [FRONTEND_ORIGIN]}},
        supports_credentials=True,
    )

    # ---- JWT ----
    JWTManager(app)

    # ---- Create tables automatically in dev (so `flask run` works) ----
    if os.environ.get("AUTO_CREATE_DB", "1") == "1":
        with app.app_context():
            db.create_all()

    # ---------------------------------------
    # Error handlers -> JSON (so frontend never gets HTML)
    # ---------------------------------------
    @app.errorhandler(400)
    def bad_request(e):
        return jsonify({"message": "Bad request", "detail": str(e)}), 400

    @app.errorhandler(401)
    def unauthorized(e):
        return jsonify({"message": "Unauthorized", "detail": str(e)}), 401

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"message": "Not found"}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"message": "Internal server error", "detail": str(e)}), 500

    # ---------------------------------------
    # Routes
    # ---------------------------------------
    @app.get("/healthz")
    def healthz():
        return {"ok": True}, 200

    @app.post("/auth/register")
    def register():
        data = request.get_json(silent=True) or {}
        email = (data.get("email") or "").strip().lower()
        password = data.get("password") or ""

        if not email or not password:
            return jsonify({"message": "Email and password required"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"message": "User already exists"}), 409

        user = User(email=email)
        try:
            user.set_password(password)
        except ValueError as e:
            return jsonify({"message": str(e)}), 400

        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "Registered"}), 201

    @app.post("/auth/login")
    def login():
        data = request.get_json(silent=True) or {}
        email = (data.get("email") or "").strip().lower()
        password = data.get("password") or ""

        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return jsonify({"message": "Invalid credentials"}), 401

        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)

        resp = jsonify({"access_token": access_token, "user": user.to_safe_dict()})
        set_refresh_cookies(resp, refresh_token)  # httpOnly cookie (sent to browser)
        return resp, 200

    @app.post("/auth/refresh")
    @jwt_required(refresh=True, locations=["cookies"])
    def refresh():
        uid = get_jwt_identity()
        new_access = create_access_token(identity=uid)
        return jsonify({"access_token": new_access}), 200

    @app.post("/auth/logout")
    def logout():
        resp = jsonify({"message": "Logged out"})
        unset_jwt_cookies(resp)
        return resp, 200

    @app.get("/protected")
    @jwt_required()
    def protected():
        uid = get_jwt_identity()
        user = User.query.get(uid)
        return jsonify({
            "hello": (user.email if user else uid),
            "msg": "You have access."
        }), 200

    return app


# WSGI entrypoint
app = create_app()

if __name__ == "__main__":
    # Running as a script (useful if you do `python app.py`)
    app.run(host="0.0.0.0", port=5000, debug=True)
