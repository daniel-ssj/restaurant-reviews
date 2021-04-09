from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import CheckConstraint
from server import db, ma
import datetime
import uuid

class Restaurant(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(50), nullable=False)
    price_range = db.Column(db.Integer(), nullable=False)
    CheckConstraint('price_range >=0', name='ck_price_min')
    CheckConstraint('price_range <=5', name='ck_price_max')

    def __init__(self, name, location, price_range):
        self.name = name
        self.location = location
        self.price_range = price_range

class Users(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

class Reviews(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    restaurant_id = db.Column(UUID(as_uuid=True), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    review = db.Column(db.Text(), nullable=False)
    rating = db.Column(db.Integer(), nullable=False)
    date_posted = db.Column(db.Date(), nullable=False, default=datetime.date.today())
    CheckConstraint('rating => 1', name='ck_rating_min')
    CheckConstraint('rating <= 5', name='ck_rating_max')

    def __init__(self, restaurant_id, name, review, rating):
        self.restaurant_id = restaurant_id
        self.name = name
        self.review = review
        self.rating = rating

class RestaurantSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'location', 'price_range')

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'password')

class ReviewSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'review', 'rating', 'date_posted')

restaurant_schema = RestaurantSchema()
restaurants_schema = RestaurantSchema(many=True)

user_schema = UserSchema()
users_schema = UserSchema(many=True)

review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)
