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
    item_code VARCHAR(100) NOT NULL,
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
    raw_materials_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id_product),
    FOREIGN KEY (raw_materials_id) REFERENCES raw_materials(id_raw_material)
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

