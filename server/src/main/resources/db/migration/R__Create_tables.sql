BEGIN;

DROP TABLE IF EXISTS location CASCADE;

DROP TABLE IF EXISTS location_address CASCADE;

DROP TABLE IF EXISTS location_hours CASCADE;

DROP TABLE IF EXISTS stylist CASCADE;

DROP TABLE IF EXISTS service CASCADE;

DROP TABLE IF EXISTS stylist_service CASCADE;

DROP TABLE IF EXISTS testimonial CASCADE;

DROP TABLE IF EXISTS user_info CASCADE;

DROP TABLE IF EXISTS customer CASCADE;

CREATE TABLE location (
    id SERIAL PRIMARY KEY,
    path VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    note VARCHAR(255) NOT NULL,
    google_map_link VARCHAR(255)
);

CREATE TABLE location_address (
    id SERIAL PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip VARCHAR(255) NOT NULL,
    location_id INTEGER NOT NULL,
    FOREIGN KEY (location_id) REFERENCES location (id)
);

CREATE TABLE location_hours (
    id SERIAL PRIMARY KEY,
    day INTEGER NOT NULL,
    open VARCHAR(255) NOT NULL,
    close VARCHAR(255) NOT NULL,
    location_id INTEGER NOT NULL,
    FOREIGN KEY (location_id) REFERENCES location (id)
);

CREATE TABLE stylist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    location_id INTEGER NOT NULL,
    FOREIGN KEY (location_id) REFERENCES location (id)
);

CREATE TABLE service (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE stylist_service (
    id SERIAL PRIMARY KEY,
    price INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    stylist_id INTEGER NOT NULL,
    FOREIGN KEY (service_id) REFERENCES service (id),
    FOREIGN KEY (stylist_id) REFERENCES stylist (id)
);

CREATE TABLE testimonial (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quote VARCHAR(255) NOT NULL
);

CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL
);

CREATE TABLE user_info (
    id SERIAL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    roles VARCHAR(25) NOT NULL,
    customer_id INTEGER NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer (id)
);

COMMIT;