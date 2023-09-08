CREATE TABLE user_details (
id serial PRIMARY KEY,
name VARCHAR not NULL,
gender VARCHAR,
dob timestamp,
email VARCHAR,
password VARCHAR,
avg_income NUMERIC (15, 2),
metro boolean
);

CREATE TABLE transactions (
id uuid PRIMARY KEY,
user_id INT NOT NULL,
txdate TIMESTAMP,
details VARCHAR,
withdrawal NUMERIC (15, 2),
deposit NUMERIC (15, 2),
balance NUMERIC (15, 2),
category varchar
);

CREATE TABLE categories (
id serial PRIMARY KEY,
keywords text [],
details VARCHAR,
category varchar
);



