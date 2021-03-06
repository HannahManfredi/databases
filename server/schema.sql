CREATE DATABASE chat;
USE chat;
CREATE TABLE users (
  id int auto_increment,
  username varchar(100),
  PRIMARY KEY (id)
);
CREATE TABLE messages (
  id int auto_increment,
  mssg varchar(250),
  userid int not null,
  roomname varchar(250),
  PRIMARY KEY (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

-- FOREIGN KEY (userid) REFERENCES users(id)