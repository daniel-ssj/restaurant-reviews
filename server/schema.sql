CREATE DATABASE restaurant_review;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE restaurant (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check (price_range >= 0 and price_range <= 5)
);

CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE reviews (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    restaurant_id uuid NOT NULL REFERENCES restaurant(id),
    name VARCHAR(100) NOT NULL REFERENCES users(name),
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);
