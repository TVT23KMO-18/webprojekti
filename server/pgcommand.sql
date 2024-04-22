CREATE TABLE "users" (
    iduser SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE "favourites" (
    movieid INT PRIMARY KEY,
    iduser INT
);

CREATE TABLE "group" (
    idgroup SERIAL PRIMARY KEY,
    groupname TEXT
);

CREATE TABLE "group_membership" (
    idgroup_membership SERIAL PRIMARY KEY,
    iduser INT NOT NULL,
    idgroup INT NOT NULL
);

CREATE TABLE "reviews" (
    idreviews SERIAL PRIMARY KEY,
    iduser INT NOT NULL,
    review_text TEXT,
    review_num INT NOT NULL,
    movieid INT
);

ALTER TABLE favourites
ADD CONSTRAINT fk_favourites_iduser
FOREIGN KEY (iduser)
REFERENCES users(iduser)
ON DELETE CASCADE;

ALTER TABLE group_membership
ADD CONSTRAINT fk_group_membership_iduser
FOREIGN KEY (iduser)
REFERENCES users(iduser)
ON DELETE CASCADE;

ALTER TABLE group_membership
ADD CONSTRAINT fk_group_membership_idgroup
FOREIGN KEY (idgroup)
REFERENCES "group"(idgroup)
ON DELETE CASCADE;

ALTER TABLE reviews
ADD CONSTRAINT fk_reviews_iduser
FOREIGN KEY (iduser)
REFERENCES users(iduser)
ON DELETE CASCADE;

ALTER TABLE reviews
ADD COLUMN serieid INT;

ALTER TABLE reviews
ALTER COLUMN movieid DROP NOT NULL;

ALTER TABLE "group"
ADD COLUMN "description" TEXT

ALTER TABLE "group"
ADD COLUMN "owner" TEXT

TRUNCATE TABLE reviews;

CREATE TABLE group_movies (
    idgroup_movies SERIAL PRIMARY KEY,
    serieid INT,
    movieid INT,
    idgroup INT,
    iduser INT,
    FOREIGN KEY (iduser) REFERENCES users(iduser) ON DELETE CASCADE,
    FOREIGN KEY (idgroup) REFERENCES "group"(idgroup) ON DELETE CASCADE
);

CREATE TABLE group_reviews (
    idgroup_reviews SERIAL PRIMARY KEY,
    idgroup INT,
    idreviews INT,
    FOREIGN KEY (idgroup) REFERENCES "group"(idgroup),
    FOREIGN KEY (idreviews) REFERENCES reviews(idreviews)
);
CREATE TABLE group_event(
    idshow SERIAL PRIMARY KEY,
    eventid INTEGER NOT NULL,
    idgroup INTEGER,
    FOREIGN KEY (idgroup) REFERENCES "group"(idgroup)
);
TRUNCATE TABLE group_reviews;

ALTER TABLE group_event
ADD COLUMN startingTime TIMESTAMP,
ADD COLUMN urlToShow VARCHAR(255),
ADD COLUMN theatre VARCHAR(100);
