create schema ccca;

create table ccca.item(
    id          serial,
    description text,
    price       numeric,
    width       integer,
    height      integer,
    length      integer,
    weight      integer
)