from flask import Blueprint, request, jsonify
from statistics import mean
import time
from collections import namedtuple

restaurants = Blueprint('restaurants', __name__)

import models

@restaurants.route('/', methods=['GET'])
def get_restaurants():
    query = models.db.session.execute('select * from restaurant left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurant.id = reviews.restaurant_id;')

    res = []

    Record = namedtuple('Record', query.keys())
    records = [Record(*r) for r in query.fetchall()]

    for r in records:
        res.append({
            'name': r.name,
            'location': r.location,
            'price_range': r.price_range,
            'id': r.id,
            'restaurant_id': r.restaurant_id,
            'count': int(r.count) if r.count is not None else 0,
            'average_rating': float(r.average_rating) if r.average_rating is not None else 0
        })

    return jsonify(res)

@restaurants.route('/<id>', methods=['GET'])
def get_restaurant(id):
    query = models.db.session.execute('select * from restaurant left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurant.id = reviews.restaurant_id where id = :id', {'id': id})

    res = []

    Record = namedtuple('Record', query.keys())
    records = [Record(*r) for r in query.fetchall()]

    for r in records:
        res.append({
            'name': r.name,
            'location': r.location,
            'price_range': r.price_range,
            'id': r.id,
            'restaurant_id': r.restaurant_id,
            'count': int(r.count) if r.count is not None else 0,
            'average_rating': float(r.average_rating) if r.average_rating is not None else 0
        })

    reviews = models.reviews_schema.dump(models.Reviews.query.filter_by(restaurant_id=id))

    return jsonify(res, reviews)
    

@restaurants.route('/', methods=['POST'])
def add_restaurant():
    name = request.json['name']
    location = request.json['location']
    price_range = request.json['price_range']

    new_restaurant = models.Restaurant(name, location, price_range)

    models.db.session.add(new_restaurant)
    models.db.session.commit()

    return models.restaurant_schema.jsonify(new_restaurant)

@restaurants.route('/<id>', methods=['PUT'])
def update_restaurant(id):
    restaurant = models.Restaurant.query.get(id)

    name = request.json['name']
    location = request.json['location']
    price_range = request.json['price_range']

    restaurant.name = name
    restaurant.location = location
    restaurant.price_range = price_range

    models.db.session.commit()

    return models.restaurant_schema.jsonify(restaurant)

@restaurants.route('/<id>', methods=['DELETE'])
def delete_restaurant(id):
    _restaurant = models.Restaurant.query.get(id)

    models.db.session.delete(_restaurant)
    models.db.session.commit()

    return models.restaurant_schema.jsonify(_restaurant)

@restaurants.route('/<id>/addreview', methods=['POST'])
def add_review(id):
    name = request.json['name']
    review = request.json['review']
    rating = request.json['rating']
    new_review = models.Reviews(id, name, review, rating)

    models.db.session.add(new_review)
    models.db.session.commit()

    return models.review_schema.jsonify(new_review)
