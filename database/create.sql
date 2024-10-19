drop SCHEMA if EXISTS ccca CASCADE;
create schema ccca;

create table ccca.item (
	id serial primary key,
	category text,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight integer
);

insert into ccca.item (category, description, price, width, height, length, weight) values ('Instruments', 'Guitar', 1000, 100, 50, 15, 3);
insert into ccca.item (category, description, price, width, height, length, weight) values ('Instruments', 'Amplifier', 5000, 50, 50, 50, 22);
insert into ccca.item (category, description, price, width, height, length, weight) values ('Accessories', 'Cable', 30, 10, 10, 10, 1);
insert into ccca.item (category, description, price, width, height, length, weight) values ('Instruments', 'Bass', 2299.99, 150, 50, 15, 5);

create table ccca.coupon (
	code text,
	percentage numeric,
	expire_date timestamp,
	primary key (code)
);

insert into ccca.coupon (code, percentage, expire_date) values ('20OFF', 20, '2050-10-10T10:00:00');
insert into ccca.coupon (code, percentage, expire_date) values ('10OFF', 10, '2050-10-10T10:00:00');
insert into ccca.coupon (code, percentage, expire_date) values ('20OFF_EXPIRED', 20, '2020-10-10T10:00:00');

create table ccca.order (
	id serial,
	coupon_code text,
	code text,
	cpf text,
	issue_date timestamp,
	freight numeric,
	serial integer,
	primary key (id)
);

create table ccca.order_item (
	id_order integer,
	id_item integer,
	price numeric,
	quantity integer,
	primary key (id_order, id_item)
);

create table ccca.tax_table (
	id serial primary key,
	id_item integer,
	type text,
	value numeric
);

insert into ccca.tax_table (id_item, type, value) values (1, 'default', 15);
insert into ccca.tax_table (id_item, type, value) values (2, 'default', 15);
insert into ccca.tax_table (id_item, type, value) values (3, 'default', 5);
insert into ccca.tax_table (id_item, type, value) values (1, 'november', 5);
insert into ccca.tax_table (id_item, type, value) values (2, 'november', 5);
insert into ccca.tax_table (id_item, type, value) values (3, 'november', 1);
alter table ccca.order add column taxes numeric;

create table ccca.stock_entry (
	id serial primary key,
	id_item integer,
	operation text,
	quantity integer,
	date timestamp default now()
);

insert into ccca.stock_entry (id_item, operation, quantity) values (1, 'in', 10);
insert into ccca.stock_entry (id_item, operation, quantity) values (2, 'in', 10);
insert into ccca.stock_entry (id_item, operation, quantity) values (3, 'in', 10);