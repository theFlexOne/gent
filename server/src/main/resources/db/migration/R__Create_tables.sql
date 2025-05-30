BEGIN;

DROP TABLE IF EXISTS location CASCADE;

CREATE TABLE location (
    id SERIAL PRIMARY KEY,
    path VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    note VARCHAR(255) NOT NULL,
    google_map_link VARCHAR(255)
);

DROP TABLE IF EXISTS testimonial CASCADE;

CREATE TABLE testimonial (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quote TEXT NOT NULL
);

DROP TABLE IF EXISTS location_address CASCADE;

CREATE TABLE location_address (
    id SERIAL PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip VARCHAR(255) NOT NULL,
    location_id INTEGER NOT NULL,
    FOREIGN KEY (location_id) REFERENCES location (id)
);

DROP TABLE IF EXISTS location_hours CASCADE;

CREATE TABLE location_hours (
    id SERIAL PRIMARY KEY,
    day INTEGER NOT NULL,
    open VARCHAR(255) NOT NULL,
    close VARCHAR(255) NOT NULL,
    location_id INTEGER NOT NULL,
    FOREIGN KEY (location_id) REFERENCES location (id)
);

DROP TABLE IF EXISTS stylist CASCADE;

CREATE TABLE stylist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    location_id INTEGER NOT NULL,
    FOREIGN KEY (location_id) REFERENCES location (id)
);

DROP TABLE IF EXISTS service CASCADE;

CREATE TABLE service (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

DROP TABLE IF EXISTS stylist_service CASCADE;

CREATE TABLE stylist_service (
    id SERIAL PRIMARY KEY,
    price INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    stylist_id INTEGER NOT NULL,
    FOREIGN KEY (service_id) REFERENCES service (id),
    FOREIGN KEY (stylist_id) REFERENCES stylist (id)
);

COMMIT;