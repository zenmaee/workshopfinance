from app import db
from app import ma

class Users(db.Model):
    FirstName = db.Column(db.String(30))
    LastName=db.Column(db.String(30))
    Email=db.Column(db.String(100),primary_key=True)
    Password=db.Column(db.String(100))

    def __init__(self, FirstName, LastName, Email, Password):
        self.FirstName=FirstName,
        self.LastName=LastName,
        self.Email=Email,
        self.Password=Password

class UserSchema(ma.Schema):
    class Meta:
        fields = ('FirstName', 'LastName', 'Email', 'Password')

users_schema = UserSchema()
users_schema = UserSchema(many=True)

