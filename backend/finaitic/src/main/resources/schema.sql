CREATE TABLE user_details (
id uuid PRIMARY KEY,
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
user_id uuid NOT NULL,
txdate TIMESTAMP,
strdate VARCHAR,
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


INSERT INTO categories(keywords,details,category) values (ARRAY['SALARY'],'salary','SALARY');
INSERT INTO categories(keywords,details,category) values (ARRAY['INSURANCE'],'insurance','INSURANCE');
INSERT INTO categories(keywords,details,category) values (ARRAY['EMI'],'emi','EMI');
INSERT INTO categories(keywords,details,category) values (ARRAY['CASHWITH','NEFT','IMPS','RTGS','UPI'],'bank transfers','BANK TRANSFERS');
INSERT INTO categories(keywords,details,category) values (ARRAY['DINEOUT','SWIGGY','ZOMATO','VEGETABLE'],'food','FOOD');
INSERT INTO categories(keywords,details,category) values (ARRAY['INSTAMART'],'utilities','UTILITIES');
INSERT INTO categories(keywords,details,category) values (ARRAY['CAB'],'transport','TRANSPORT');
INSERT INTO categories(keywords,details,category) values (ARRAY['SHOPPING'],'shopping','SHOPPING');
INSERT INTO categories(keywords,details,category) values (ARRAY['INT'],'interest','INTEREST');
INSERT INTO categories(keywords,details,category) values (ARRAY['BOOKMYSHOW','NETFLIX'],'entertainment','ENTERTAINMENT');
INSERT INTO categories(keywords,details,category) values (ARRAY['VODAFONE','JIO','E-BILL'],'bill payment','BILL PAYMENT');
INSERT INTO categories(keywords,details,category) values (ARRAY['RENT'],'rent','RENT');



