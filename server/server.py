from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)

load_dotenv()

import restaurants
import auth

app.register_blueprint(restaurants.restaurants, url_prefix='/api/restaurants')
app.register_blueprint(auth.auth, url_prefix='/auth')

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv('PORT'))
