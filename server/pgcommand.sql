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