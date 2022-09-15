CREATE DATABASE products;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slogan VARCHAR(1000) NOT NULL,
  description VARCHAR (1000) NOT NULL,
  category VARCHAR(100) NOT NULL
);

CREATE TABLE "related" (
  "id" SERIAL PRIMARY KEY,
  "current_id" INTEGER NOT NULL,
  "related_id" INTEGER NOT NULL
);

CREATE TABLE "characteristics" (
"id" SERIAL PRIMARY KEY,
"product_id" INTEGER NOT NULL,
"feature" VARCHAR(100) NOT NULL,
"value" VARCHAR(100) NOT NULL
)

CREATE TABLE "styles" (
"id" SERIAL PRIMARY KEY,
"product_id" INTEGER NOT NULL,
"name" VARCHAR(100) NOT NULL,
"original_price" INTEGER NOT NULL,
"sale_price" INTEGER DEFAULT NULL,
"default_style" BOOLEAN DEFAULT TRUE,
)

CREATE TABLE "sku" (
"id" SERIAL PRIMARY KEY,
"style_id" INTEGER NOT NULL,
"quantity" INTEGER NOT NULL,
"size" VARCHAR(10) NOT NULL
)

CREATE TABLE "photos" (
"id" SERIAL PRIMARY KEY,
"style_id" INTEGER NOT NULL,
"thumbnail_url" VARCHAR(1000) NOT NULL,
"url" VARCHAR(1000) NOT NULL
)