CREATE DATABASE chat;

USE chat;
CREATE TABLE users (
  id int primary key,
  username varchar(100)
);
CREATE TABLE rooms (
  id int primary key,
  roomname varchar(100)
);

CREATE TABLE messages (
  id int primary key,
  text varchar(100),
  room int not null,
  person int not null,
  foreign key (room) references users(id),
  foreign key (person) references rooms(id)
);

-- ALTER TABLE users ALTER id SET DEFAULT 1;
-- ALTER TABLE messages ALTER id SET DEFAULT 1;
-- ALTER TABLE messages ALTER room SET DEFAULT 1;
-- ALTER TABLE messages ALTER person SET DEFAULT 1;

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

