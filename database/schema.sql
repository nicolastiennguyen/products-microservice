-- DROP DATABASE IF EXISTS products

-- CREATE DATABASE products;

-- \c products

CREATE TABLE features (
id SERIAL PRIMARY KEY,
product_id INTEGER NOT NULL,
feature VARCHAR(100) NOT NULL,
value VARCHAR(100) NOT NULL
);

CREATE TABLE photos (
id SERIAL PRIMARY KEY,
styleId INTEGER NOT NULL,
url TEXT NOT NULL,
thumbnail_url TEXT NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slogan VARCHAR(1000) NOT NULL,
  description VARCHAR (1000) NOT NULL,
  category VARCHAR(100) NOT NULL,
  default_price INTEGER NOT NULL
);

CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  current_product_id INTEGER NOT NULL,
  related_product_id INTEGER NOT NULL
);

CREATE TABLE sku (
id SERIAL PRIMARY KEY,
styleId INTEGER NOT NULL,
size VARCHAR(10) NOT NULL,
quantity INTEGER NOT NULL
);

CREATE TABLE styles (
id SERIAL PRIMARY KEY,
productId INTEGER NOT NULL,
name VARCHAR(100) NOT NULL,
sale_price VARCHAR(10),
original_price VARCHAR(10),
default_style TEXT NOT NULL
);



COPY features FROM '/Users/nicolasnguyen/hackreactor2207/products-server/.csv/features.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/Users/nicolasnguyen/hackreactor2207/products-server/.csv/photos.csv' DELIMITER ',' CSV HEADER;
COPY products FROM '/Users/nicolasnguyen/hackreactor2207/products-server/.csv/product.csv' DELIMITER ',' CSV HEADER;
COPY related FROM '/Users/nicolasnguyen/hackreactor2207/products-server/.csv/related.csv' DELIMITER ',' CSV HEADER;
COPY sku FROM '/Users/nicolasnguyen/hackreactor2207/products-server/.csv/skus.csv' DELIMITER ',' CSV HEADER;
COPY styles FROM '/Users/nicolasnguyen/hackreactor2207/products-server/.csv/styles.csv' DELIMITER ',' NULL as 'null' CSV HEADER;

ALTER TABLE styles ALTER COLUMN default_style TYPE BOOL using default_style::TEXT::BOOL;

CREATE INDEX features_index ON features(product_id);
CREATE INDEX photos_index ON photos(styleId);
CREATE INDEX related_index ON related(current_product_id);
CREATE INDEX sku_index ON sku(styleId);
CREATE INDEX styles_index ON styles(productId);
