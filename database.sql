
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
    "description" VARCHAR (1000)
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




-- ITEM INSERT

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
     "description",
     )
VALUES  ('1', '1', 'K2 Skiis', '171cm', '80', '', 'Racing', 'K2', '', 'Womens', 'Rocker', 'Lightly Used', '', 'false', 'These skiis are incredible, super fast, but they need a wax!  Willing to negotiate price.'),
        ('1', '1', 'Dynastar Argyl Skis', '175cm', '120', '', 'Alpine', 'Dynastar', '', 'Mens', 'Camber', 'Lightly Used', '', 'false', 'Dynastar is a really great brand of skiis.  Very high quality. Dont try to low-ball me.  I know what these are worth'),
        ('1', '1', 'Line Sir Francis Bacon Skis', '176cm', '95', '', 'Racing', 'Line', '', 'Mens', 'Reverse Camber', 'Lightly Used', '', 'false', 'Sir Francis Bacon really did ride these skiis!'),
        ('1', '4', 'Proto Snowboard', '160cm', '75', '', 'Freeride', 'Proto', '', 'Mens', '', 'Like New', '', 'false', 'Parting ways with this beauty, hoping to find someone to ride this bad boy.  I have outgrown this board!'),
        ('1', '2', 'Burton Snowboard', '156cm', '100', '', 'Freeride', 'Burton', '', 'Kids', '', 'Like New', '', 'false', 'Burton FOREVER! My child has outgrown this board and Im loooking for a fair price because it is in great condition.'),
        ('1', '3', 'Dalbello Ski Boots', 'XL', '110', 'Semi-flex', '', 'Dalbello', '', 'Mens', '', 'Lightly Used', 'Traditional', 'false', 'Will not negotiate price.  Firm on $110.'),
        ('1', '3', 'Nordica Ski Boots', 'L', '70', 'Semi-stiff', '', 'Nordica', '', 'Womens', '', 'Moderately Used', 'Traditional', 'false', 'Will not negotiate price.  Firm on $70.'),
        ('1', '3', 'Salomon Ski Boots', 'M', '60', 'Flex', '', 'Salomon', '', 'Womens', '', 'Heavily Used', 'Traditional', 'false', 'Salomon has a great reputation. Will not negotiate price.  Firm on $60.'),
        ('1', '3', 'Dalbello Ski Boots', 'XL', '45', 'Stiff', '', 'Dalbello', '', 'Mens', '', 'Heavily Used', 'Traditional', 'false', 'Will not negotiate price.  Firm on $45.'),
        ('1', '5', 'Snowboard Boots', 'L', '35', '', '', 'Unknown', '', 'Mens', '', 'Moderately Used', 'Traditional', 'false', 'Will not negotiate price.  Firm on $35.'),
        ('1', '4', 'Forum Snowboard', '151cm', '155', '', 'Freeride', 'Forum', '', 'Mens', '', 'Like New', '', 'false', 'Parting ways with this beauty, hoping to find someone to ride this bad boy.  I have outgrown this board!'),
        ('1', '4', 'Head Snowboard', '151cm', '110', '', 'Freeride', 'Head', '', 'Mens', '', 'Moderately Used', '', 'false', 'Sad to see this go, but I have outgrown this board!'),
        ('1', '8', 'Bevel Helmet', 'L', '40', '', '', 'Bevel', '', 'Womens', '', 'Moderately Used', '', 'false', 'This helmet has a very high safety rating.  If you are looking for a good deal on some serious head protection, look no further!!'),
        ('1', '8', 'Smith Helmet', 'L', '30', '', '', 'Smith', '', 'Mens', '', 'Lightly Used', '', 'false', 'This helmet has a very high safety rating.  If you are looking for a good deal on some serious head protection, look no further!!'),
        ('1', '8', 'Anon Ski Helmet', 'L', '30', '', '', 'Anon', '', 'Mens', '', 'Moderately Used', '', 'false', 'This helmet rocks!!!! Hope it finds a good home.'),
        ('1', '5', 'Burton Snowboard Boots', 'L', '60', '', '', 'Burton', '', 'Mens', '', 'Moderately Used', 'Traditional', 'false', 'Will not negotiate price.  Firm on $60.'),
        ('1', '5', 'Burton Snowboard Boots', 'S', '50', '', '', 'Burton', '', 'Kids', '', 'Moderately Used', 'Traditional', 'false', 'My kid outgrew these boots.  Looking for a fair price, like new.'),
        ('1', '5', 'Burton Snowboard Boots', 'S', '25', '', '', 'Burton', '', 'Kids', '', 'Moderately Used', 'Traditional', 'false', 'Very old boots.'),
        ('1', '3', 'Salomon XPro Ski Boots', 'XL', '180', 'Stiff', '', 'Salomon', '', 'Mens', '', 'New', 'Traditional', 'false', 'Brand new in the box Somolon ski boots, asking $180.  Willing to negotiate. Phone number: 611-559-5559'),
        ('1', '3', 'Technica Mach1 Ski Boots', 'L', '210', 'Stiff', '', 'Salomon', '', 'Mens', '', 'New', 'Traditional', 'false', 'Brand new in the box Technica ski boots, asking $210.'),
        ('1', '4', 'Burton Metallica Snowboard', '160cm', '200', '', 'Freeride', 'Proto', '', 'Mens', '', 'New', '', 'false', 'Brand new Burton snowboard, asking $200.'),
        ('1', '2', 'Marker Jester 16 Alpine Ski Bindings', '110mm', '70', '', '', 'Marker Jester', '', 'Mens', '', 'Heavily Used', '', 'false', 'Heavily used bindings of mine.  All in working condition, dont ask me to negotiate.'),
        ('1', '1', 'Nordic Skis', '175cm', '100', '', 'Alpine', 'Nordic', '', 'Mens', 'Rocker', 'Lightly Used', '', 'false', 'Nordic is a really great brand of skiis.  Very high quality. Shoot me an email with questions.');

-- IMAGES INSERT

INSERT INTO "images" ("item_id", "url")
    VALUES ('1', 'https://i.imgur.com/1hYaO5b.jpg'),
            ('2', 'https://i.imgur.com/OTmt2hl.jpg'),
            ('2', 'https://i.imgur.com/u5mOEUg.jpg'),
            ('2', 'https://i.imgur.com/D72vUPw.jpg'),
            ('2', 'https://i.imgur.com/f3Dp1b1.jpg'),
            ('2', 'https://i.imgur.com/jW3fUXd.jpg'),
            ('2', 'https://i.imgur.com/2guIyGB.jpg'),
            ('2', 'https://i.imgur.com/BJxRrUO.jpg'),
            ('2', 'https://i.imgur.com/2mP8iKf.jpg'),
            ('2', 'https://i.imgur.com/AICEeAy.jpg'),
            ('3', 'https://i.imgur.com/g8DiNa6.jpg'),
            ('3', 'https://i.imgur.com/h8IpX8P.jpg'),
            ('3', 'https://i.imgur.com/CcckUYf.jpg'),
            ('4', 'https://i.imgur.com/iJZ2CR5.jpg'),
            ('4', 'https://i.imgur.com/bYCAmxf.jpg'),
            ('4', 'https://i.imgur.com/viJoImR.jpg'),
            ('4', 'https://i.imgur.com/OOkyzI2.jpg'),
            ('5', 'https://i.imgur.com/hcieIm5.jpg'),
            ('5', 'https://i.imgur.com/yk4wC8c.jpg'),
            ('6', 'https://i.imgur.com/3o0jpJG.jpg'),
            ('7', 'https://i.imgur.com/aDL2wqH.jpg'),
            ('8', 'https://i.imgur.com/zf2tm7m.jpg'),
            ('9', 'https://i.imgur.com/9Sczwhm.jpg'),
            ('10', 'https://i.imgur.com/SqGDrtg.jpg'),
            ('11', 'https://i.imgur.com/o2xij4Q.jpg'),
            ('12', 'https://i.imgur.com/QnLmBOG.jpg'),
            ('13', 'https://i.imgur.com/NNVJPZF.jpg'),
            ('14', 'https://i.imgur.com/MHrRMIe.jpg'),
            ('15', 'https://i.imgur.com/hfNw2ys.jpg'),
            ('15', 'https://i.imgur.com/PyMDEfB.jpg'),
            ('15', 'https://i.imgur.com/r713PRx.jpg'),
            ('16', 'https://i.imgur.com/EKNxijH.jpg'),
            ('17', 'https://i.imgur.com/UbYuLe8.jpg'),
            ('18', 'https://i.imgur.com/AQO4wqA.jpg'),
            ('19', 'https://i.imgur.com/WpbJlWq.jpg'),
            ('20', 'https://i.imgur.com/CMahAds.jpg'),
            ('21', 'https://i.imgur.com/4OdVU3D.jpg'),
            ('22', 'https://i.imgur.com/XVEN5M0.jpg'),
            ('22', 'https://i.imgur.com/wUZBpGX.jpg'),
            ('22', 'https://i.imgur.com/0P5WkdF.jpg'),
            ('22', 'https://i.imgur.com/vCLbvSI.jpg'),
            ('22', 'https://i.imgur.com/mAKTZt8.jpg'),
            ('22', 'https://i.imgur.com/Mf8m7W4.jpg'),
            ('23', 'https://i.imgur.com/4FRxVPp.jpg');


-- FAVORITES INSERT

INSERT INTO "favorites" ("user_id", "item_id")
VALUES ('1', '2'),
('1', '3'),
('1', '4'),
('1', '8'),
('1', '10'),
('1', '12'),
('1', '19'),
('2', '4'),
('2', '5'),
('2', '9'),
('2', '12'),
('2', '13'),
('2', '17');


-- TO DO: swaps dummy data
--INSERT INTO "swaps" ()

-- TO DO: swap_item_join data
--INSERT INTO "swap_item_join" ("item_id", "swap_id")
--VALUES ('')

-- QUICK REMOVAL COMMANDS
DROP TABLE "swaps" CASCADE;

-- SWAP JOINS CONNECTION ITEMS TO SWAP_ITEMS_JOINS TO SWAPS
SELECT * FROM "items" JOIN "swap_item_join" ON "swap_item_join".item_id ="items".id 
INNER JOIN "swaps" ON "swaps".id = "swap_item_join".swap_id ;
