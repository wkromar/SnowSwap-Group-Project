
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Set up database called: snowswaps

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (100) NOT NULL,
    "first_name" VARCHAR (100) NOT NULL,
    "last_name" VARCHAR (100) NOT NULL,
    "auth_level" INT DEFAULT 0 NOT NULL,
    "user_image" TEXT, 
    "preferred_payment" VARCHAR (50),
    "payment_username" VARCHAR (80)
);


CREATE TABLE "categories" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL
);

INSERT INTO "categories" ("name")
VALUES ('ski'),('ski_binding'),('ski_boots'),('snowboard'),('snowboard_boots'),
('snowboard_bindings'),('apparel'),('helmet');

CREATE TABLE "items" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "cat_id" INT REFERENCES "categories",
    "title" VARCHAR (100),
    "size" VARCHAR (20),
    "price" DECIMAL,
    "flex" VARCHAR (50),
    "style" VARCHAR (50),
    "brand" VARCHAR (50),
    "shape" VARCHAR (50),
    "gender" VARCHAR (50),
    "profile" VARCHAR (50),
    "condition" VARCHAR (50),
    "lacing_system" VARCHAR (50),
    "purchased" BOOLEAN,
    "description" VARCHAR (1000),
    "type" VARCHAR (50)
);


CREATE TABLE "images" (
    "id" SERIAL PRIMARY KEY,
    "item_id" INT REFERENCES "items",
    "url" TEXT
);

CREATE TABLE "swaps" (
    "id" SERIAL PRIMARY KEY,
    "owner" INT REFERENCES "user",
    "name" VARCHAR (100),
    "is_private" BOOLEAN,
    "start_date" DATE,
    "sell_date" DATE,
    "stop_date" DATE,
    "swap_open" BOOLEAN DEFAULT FALSE,
    "swap_img" TEXT,
    "access_code" TEXT
);

CREATE TABLE "swap_users" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "swap_id" INT REFERENCES "swaps"
);

CREATE TABLE "favorites" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "item_id" INT REFERENCES "items"
);

CREATE TABLE "swap_item_join" (
    "id" SERIAL PRIMARY KEY,
    "item_id" INT REFERENCES "items",
    "swap_id" INT REFERENCES "swaps"
);




-- Dummy Data

INSERT INTO "items"
    ("user_id",
     "cat_id",
     "title",
     "size",
     "price",
     "flex",
     "style",
     "brand",
     "shape",
     "gender",
     "profile",
     "condition",
     "lacing_system",
     "purchased",
     "description"
     )
VALUES  ('1', '2', 'KSwiss Skiis', '167', '60', '', 'racing', 'KSwiss', '', 'Mens', 'rocker', 'used', '', 'false', 'These skiis are incredible, super fast, but they need a wax!')
        ('1', '2', 'KSwiss Skiis', '167', '60', '', 'racing', 'KSwiss', '', 'Mens', 'rocker', 'used', '', 'false', 'These skiis are incredible, super fast, but they need a wax!')
        ('1', '2', 'KSwiss Skiis', '167', '60', '', 'racing', 'KSwiss', '', 'Mens', 'rocker', 'used', '', 'false', 'These skiis are incredible, super fast, but they need a wax!')
        ('1', '2', 'KSwiss Skiis', '167', '60', '', 'racing', 'KSwiss', '', 'Mens', 'rocker', 'used', '', 'false', 'These skiis are incredible, super fast, but they need a wax!')
        ('1', '2', 'KSwiss Skiis', '167', '60', '', 'racing', 'KSwiss', '', 'Mens', 'rocker', 'used', '', 'false', 'These skiis are incredible, super fast, but they need a wax!')
        ('1', '2', 'KSwiss Skiis', '167', '60', '', 'racing', 'KSwiss', '', 'Mens', 'rocker', 'used', '', 'false', 'These skiis are incredible, super fast, but they need a wax!')
        ('1', '2', 'KSwiss Skiis', '167', '60', '', 'racing', 'KSwiss', '', 'Mens', 'rocker', 'used', '', 'false', 'These skiis are incredible, super fast, but they need a wax!')
        ('1', '2', 'KSwiss Skiis', '167', '60', '', 'racing', 'KSwiss', '', 'Mens', 'rocker', 'used', '', 'false', 'These skiis are incredible, super fast, but they need a wax!')
        ('1', '2', 'KSwiss Skiis', '167', '60', '', 'racing', 'KSwiss', '', 'Mens', 'rocker', 'used', '', 'false', 'These skiis are incredible, super fast, but they need a wax!')
        ('1', '2', 'KSwiss Skiis', '167', '60', '', 'racing', 'KSwiss', '', 'Mens', 'rocker', 'used', '', 'false', 'These skiis are incredible, super fast, but they need a wax!');

INSERT INTO "images" ("item_id", "url")
    VALUES ('1', 'https://i.imgur.com/n8eVxIk.jpg');

-- QUICK REMOVAL COMMANDS
DROP TABLE "swaps" CASCADE;

-- SWAP JOINS CONNECTION ITEMS TO SWAP_ITEMS_JOINS TO SWAPS
SELECT * FROM "items" JOIN "swap_item_join" ON "swap_item_join".item_id ="items".id 
INNER JOIN "swaps" ON "swaps".id = "swap_item_join".swap_id ;
