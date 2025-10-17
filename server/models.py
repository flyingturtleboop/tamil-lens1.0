from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, index=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # ---- Helpers ----
    def set_password(self, password: str):
        # werkzeug uses PBKDF2 by default; good for most cases
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)

    @validates("email")
    def validate_email(self, key, value):
        v = (value or "").strip().lower()
        if not v or "@" not in v:
            raise ValueError("Invalid email")
        return v

    def to_safe_dict(self):
        return {"id": self.id, "email": self.email, "created_at": self.created_at.isoformat()}
