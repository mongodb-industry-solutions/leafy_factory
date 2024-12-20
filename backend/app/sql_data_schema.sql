DROP DATABASE IF EXISTS leafy_factory;

CREATE DATABASE leafy_factory;
USE leafy_factory;

DROP TABLE IF EXISTS product_cost;
DROP TABLE IF EXISTS products_raw_materials;
DROP TABLE IF EXISTS raw_materials;
DROP TABLE IF EXISTS work_orders;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id_product INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    product_description VARCHAR(1000) NOT NULL
);

CREATE TABLE work_orders(
    id_work INT PRIMARY KEY AUTO_INCREMENT,
    planned_start_date DATETIME,
    planned_end_date DATETIME,
    actual_start_date DATETIME,
    actual_end_date DATETIME,
    quantity INT NOT NULL,
    wo_status VARCHAR(100),
    creation_date DATETIME,
    product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id_product)
);

CREATE TABLE raw_materials(
    id_raw_material INT PRIMARY KEY AUTO_INCREMENT,
    item_code VARCHAR(100) NOT NULL UNIQUE,
    raw_material_name VARCHAR(100) NOT NULL,
    raw_material_description VARCHAR(100) NOT NULL,
    unit_measurement VARCHAR(100) NOT NULL,
    raw_material_stock int NOT NULL,
    raw_material_status VARCHAR(100) NOT NULL,
    raw_material_currency VARCHAR(100) NOT NULL,
    cost_per_part DECIMAL(10, 2) NOT NULL
);

CREATE TABLE products_raw_materials(
    id_products_raw_materials INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    raw_material_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id_product),
    FOREIGN KEY (raw_material_id) REFERENCES raw_materials(id_raw_material)
);

CREATE TABLE product_cost(
    id_cost INT PRIMARY KEY AUTO_INCREMENT,
    raw_material_cost_per_product DECIMAL(10, 2) NOT NULL,
    overhead_per_product DECIMAL(10, 2) NOT NULL,
    total_cost_per_product DECIMAL(10, 2) NOT NULL,
    cost_ok_with_overhead DECIMAL(10, 2) NOT NULL,
    cost_nok_with_overhead DECIMAL(10, 2) NOT NULL,
    nOk_products INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id_product)
);


INSERT INTO products (product_name, product_description) 
VALUES 
(
    "2 Step ladder",
    "Two Step Ladder - Folding Small 2 Step Stool 330lbs with Non-Slip Feets, Aluminum Lightweight Metal Step Stool by CHEAGO, Portable Solid Handy Work Ladder for Home, Kitchen, RV, Garage"
),
(
    "Titanium Hammer",
    "Titanium Hammer With Curved Hickory Handle"
);


INSERT INTO raw_materials (item_code, raw_material_name, raw_material_description, unit_measurement, raw_material_stock, raw_material_status, cost_per_part, raw_material_currency)
VALUES 
( "hinges_ss", "Stainless steel hinge", "Stainless steel hinge", "pieces", 10000, "high", 1.5, "USD" ),
( "screw_ss", "Stainless steel screw", "Stainless steel screw", "pieces", 100000, "high", 0.05, "USD" ),
( "aluminum_6061", "Aluminum", "lightweight aluminum", "kg", 10000, "high", 3, "USD" ),
( "brackets_gs", "Galvanized bracket", "Galvanized brackets anti-corrosion", "pieces", 10000, "high", 2.5, "USD" ),
( "titanium_lw", "Lightweight titanium", "Lightweight titanium known for its strength and lightweight properties", "kg", 10000, "high", 30, "USD"),
( "wood_hc", "Hickory wood", "Durable, lightweight, and shock-resistant, ideal for tool handles.", "kg", 10000, "high", 4, "USD"),
( "magnet_nm", "Neodymium magnet", "Strong magnet embedded in the hammer head to hold nails.", "kg", 10000, "high", 50, "USD"),
( "fasteners_ham", "Steel fasteners", "Steel fasteners for titanium hammers.", "kg", 10000, "high", 1, "USD");

INSERT INTO products_raw_materials (product_id, raw_material_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8);


