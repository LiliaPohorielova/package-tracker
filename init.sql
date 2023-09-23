SELECT 'CREATE DATABASE packages'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'packages')\gexec
SELECT 'CREATE DATABASE deliveries'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'deliveries')\gexec
-- create table if not exists packages.package
-- (
--     id          serial primary key,
--     name        varchar(255) not null,
--     description text         not null,
--     price       numeric(10, 2) default 0.00 not null,
--     created_at  timestamp    default now() not null,
--     updated_at  timestamp    default now() not null
-- );
