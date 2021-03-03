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
  messages varchar(100),
  room int not null,
  person int not null,
  foreign key (room) references users(id),
  foreign key (person) references rooms(id)
);

-- ALTER TABLE messages
-- ADD

-- ALTER TABLE messages
-- ADD FOREIGN KEY (user) REFERENCES users(id);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
