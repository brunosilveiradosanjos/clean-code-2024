postgres://postgres:123456@localhost:5432/app
sudo docker run --name api-ccca-pg -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_PASSWORD=123456 -e POSTGRESQL_DATABASE=app -p 5432:5432 bitnami/postgresql

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

INSERT INTO ccca.item (category, description, price, width, height, length, weight) VALUES ('Instrument','Guitar', 10000, 100, 50, 15, 3);
INSERT INTO ccca.item (category, description, price, width, height, length, weight) VALUES ('Accessory','Amplifier', 5000, 50, 50, 50, 22);
INSERT INTO ccca.item (category, description, price, width, height, length, weight) VALUES ('Accessory','Cable', 50, 30, 10, 10, 1);

create table ccca.coupon (
code text,
percentage numeric,
expire_date timestamp,
primary key (code)
);

insert into ccca.coupon (code, percentage, expire_date) values ('20OFF', 20, '2021-10-10T10:00:00');
insert into ccca.coupon (code, percentage, expire_date) values ('10OFF', 10, '2021-10-10T10:00:00');
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