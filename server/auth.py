from flask import Blueprint, request, jsonify
import bcrypt
from jwt_utils import jwt_generator, token_required
from flask_cors import CORS


auth = Blueprint('auth', __name__)
CORS(auth)

import models

@auth.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    user = models.Users.query.filter_by(email=email).first()

    if user is None:
        return jsonify('Password or Email is incorrect'), 401
    
    valid_password = bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8'))

    if not valid_password:
        return jsonify('Password or Email is incorrect'), 401

    token = jwt_generator(user.id)

    return jsonify({"token": str(token)})

@auth.route('/register', methods=['POST'])
def register():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']

    user = models.Users.query.filter_by(email=email).first()

    if user is not None:
        return jsonify("User already exists"), 401

    salt = bcrypt.gensalt(10)

    bcrypt_password = bcrypt.hashpw(password.encode('utf-8'), salt)

    new_user = models.Users(name, email, bcrypt_password.decode('utf-8'))

    models.db.session.add(new_user)
    models.db.session.commit()

    token = jwt_generator(new_user.id)

    return jsonify({"token": str(token)})

@auth.route('/verify', methods=['GET'])
@token_required
def verify(verify):
    return jsonify(True)

@auth.route('/user', methods=['GET'])
@token_required
def review(verify):
    user = models.Users.query.get(verify['user'])
    return jsonify({'name': user.name})
