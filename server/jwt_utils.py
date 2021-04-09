import jwt
import datetime
import os
from dotenv import load_dotenv
from functools import wraps
from flask import jsonify, request

load_dotenv()

def jwt_generator(id):
    payload = {
        "user": str(id),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=45)
    }

    return jwt.encode(payload, os.getenv('JWT_SECRET'), algorithm="HS256")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers['token']

        if not token:
            return jsonify({'message': 'Authorization denied'}), 403

        try:
            verify = jwt.decode(token, os.getenv('JWT_SECRET'), algorithm="HS256")
            print(verify['user'])
        except:
            return jsonify({'message': 'Token not valid'}), 401
        
        return f(verify, *args, **kwargs)

    return decorated
