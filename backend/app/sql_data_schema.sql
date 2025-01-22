DROP DATABASE IF EXISTS leafy_factory;

CREATE DATABASE leafy_factory;
\c leafy_factory 

DROP TABLE IF EXISTS product_cost;
DROP TABLE IF EXISTS products_raw_materials;
DROP TABLE IF EXISTS raw_materials;
DROP TABLE IF EXISTS work_orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS factories;
DROP TABLE IF EXISTS production_lines;
DROP TABLE IF EXISTS machines;
DROP TABLE IF EXISTS jobs_machines;
DROP TABLE IF EXISTS production_data;

CREATE TABLE products (
    id_product SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_description VARCHAR(1000) NOT NULL
);

CREATE TABLE work_orders(
    id_work SERIAL PRIMARY KEY,
    planned_start_date TIMESTAMP WITH TIME ZONE,
    planned_end_date TIMESTAMP WITH TIME ZONE,
    actual_start_date TIMESTAMP WITH TIME ZONE,
    actual_end_date TIMESTAMP WITH TIME ZONE,
    quantity INT NOT NULL,
    wo_status VARCHAR(100),
    creation_date TIMESTAMP WITH TIME ZONE,
    product_id INT NOT NULL,
    nOk_products INT,
    FOREIGN KEY (product_id) REFERENCES products(id_product)
);

CREATE TABLE raw_materials(
    id_raw_material SERIAL PRIMARY KEY,
    item_code VARCHAR(100) NOT NULL UNIQUE,
    raw_material_name VARCHAR(100) NOT NULL,
    raw_material_description VARCHAR(100) NOT NULL,
    unit_measurement VARCHAR(100) NOT NULL,
    raw_material_stock int NOT NULL,
    raw_material_status VARCHAR(100) NOT NULL,
    raw_material_currency VARCHAR(100) NOT NULL,
    cost_per_part DECIMAL(10, 2) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL
);

CREATE TABLE products_raw_materials(
    id_products_raw_materials SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    raw_material_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id_product),
    FOREIGN KEY (raw_material_id) REFERENCES raw_materials(id_raw_material)
);

CREATE TABLE product_cost(
    id_cost SERIAL PRIMARY KEY,
    raw_material_cost_per_product DECIMAL(10, 2),
    overhead_per_product DECIMAL(10, 2),
    total_cost_per_product DECIMAL(10, 2),
    cost_ok_with_overhead DECIMAL(10, 2),
    cost_nok_with_overhead DECIMAL(10, 2),
    total_cost_per_wo DECIMAL(10, 2),
    actual_total_cost DECIMAL(10, 2),
    work_id INT NOT NULL UNIQUE,
    FOREIGN KEY (work_id) REFERENCES work_orders(id_work)
);

CREATE TABLE jobs(
    id_job SERIAL PRIMARY KEY,
    target_output INT NOT NULL,
    nOk_products INT,
    quality_rate INT,
    job_status VARCHAR(100) NOT NULL,
    creation_date TIMESTAMP WITH TIME ZONE,
    work_id INT NOT NULL,
    FOREIGN KEY (work_id) REFERENCES work_orders (id_work)
);

CREATE TABLE factories(
    id_factory SERIAL PRIMARY KEY,
    factory_name VARCHAR(100) NOT NULL,
    factory_location VARCHAR(100) NOT NULL,
    factory_timestamp TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE production_lines(
    id_production_line SERIAL PRIMARY KEY,
    factory_id INT NOT NULL,
    FOREIGN KEY (factory_id) REFERENCES factories(id_factory)
);

CREATE TABLE machines(
    id_machine SERIAL PRIMARY KEY,
    machine_status VARCHAR(100) NOT NULL,
    last_maintenance TIMESTAMP WITH TIME ZONE NOT NULL,
    operator VARCHAR(100) NOT NULL,
    avg_output DECIMAL(10, 2),
    reject_count DECIMAL(10, 2),
    production_line_id INT NOT NULL,
    temp_values DECIMAL(10, 2) NOT NULL,
    vib_values DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (production_line_id) REFERENCES production_lines(id_production_line)
);

CREATE TABLE jobs_machines(
    id_jobs_machines SERIAL PRIMARY KEY,
    job_id INT NOT NULL,
    machine_id INT NOT NULL, 
    FOREIGN KEY (job_id) REFERENCES jobs(id_job),
    FOREIGN KEY (machine_id) REFERENCES machines(id_machine)
);


CREATE TABLE production_data(
    id_production_data SERIAL PRIMARY KEY,
    part_status VARCHAR(100) NOT NULL,
    creation_date TIMESTAMP WITH TIME ZONE NOT NULL,
    machine_id INT NOT NULL, 
    job_id INT NOT NULL,
    FOREIGN KEY (job_id) REFERENCES jobs(id_job),
    FOREIGN KEY (machine_id) REFERENCES machines(id_machine)
);


INSERT INTO products (product_name, product_description) 
VALUES 
(
    '2 Step ladder',
    'Two Step Ladder - Folding Small 2 Step Stool 330lbs with Non-Slip Feets, Aluminum Lightweight Metal Step Stool by CHEAGO, Portable Solid Handy Work Ladder for Home, Kitchen, RV, Garage'
),
(
    'Titanium Hammer',
    'Titanium Hammer With Curved Hickory Handle'
);


INSERT INTO raw_materials (item_code, raw_material_name, raw_material_description, unit_measurement, raw_material_stock, raw_material_status, cost_per_part, raw_material_currency, quantity)
VALUES 
( 'hinges_ss', 'Stainless steel hinge', 'Stainless steel hinge', 'pieces', 10000, 'high', 1.5, 'USD', 2.0 ),
( 'screw_ss', 'Stainless steel screw', 'Stainless steel screw', 'pieces', 100000, 'high', 0.05, 'USD', 32.0 ),
( 'aluminum_6061', 'Aluminum', 'lightweight aluminum', 'kg', 10000, 'high', 3, 'USD', 1.9 ),
( 'brackets_gs', 'Galvanized bracket', 'Galvanized brackets anti-corrosion', 'pieces', 10000, 'high', 2.5, 'USD', 8.0 ),
( 'titanium_lw', 'Lightweight titanium', 'Lightweight titanium known for its strength and lightweight properties', 'kg', 10000, 'high', 30, 'USD', 0.45),
( 'wood_hc', 'Hickory wood', 'Durable, lightweight, and shock-resistant, ideal for tool handles.', 'kg', 10000, 'high', 4, 'USD', 0.2),
( 'magnet_nm', 'Neodymium magnet', 'Strong magnet embedded in the hammer head to hold nails.', 'kg', 10000, 'high', 50, 'USD', 0.01),
( 'fasteners_ham', 'Steel fasteners', 'Steel fasteners for titanium hammers.', 'kg', 10000, 'high', 1, 'USD', 0.02);

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

INSERT INTO factories(factory_name, factory_location, factory_timestamp) 
VALUES 
(
    'qro_fact_1',
    'Plant A',
    '2024-10-31 14:25:00'
);

INSERT INTO production_lines(factory_id) 
VALUES 
(
    1
),
(
    1
);

INSERT INTO machines(machine_status, last_maintenance, operator, avg_output, reject_count, production_line_id, temp_values, vib_values) 
VALUES 
(
    'Available',
    '2024-10-31 14:25:00',
    'Ada Lovelace',
    3000,
    25,
    1,
    70,
    3
),
(
    'Available',
    '2024-10-31 14:25:00',
    'Claude Jones',
    3000,
    25,
    1,
    70,
    3
),
(
    'Available',
    '2024-10-31 14:25:00',
    'Grace Conway',
    3000,
    25,
    2,
    70,
    3
),
(
    'Available',
    '2024-10-31 14:25:00',
    'Frida Sidik',
    3000,
    25,
    2,
    70,
    3
);

