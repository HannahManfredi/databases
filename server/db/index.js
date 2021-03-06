//make sequelize connection here

const { Sequelize, DataTypes } = require('sequelize');
var connection = new Sequelize('chat', 'root', '');

connection
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = (sequelize, DataTypes) => {
  const users = connection.define('users', {
    uid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      tableName: 'users'
    });
    return users;
};

console.log(users === connection.models.users); //true

module.exports = (sequelize, DataTypes) => {
  const messages = connection.define('messages', {
    uid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mssg: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roomname: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      tableName: 'messages'
    });
    return messages;
};

console.log(messages === connection.models.messages); //true

users.sync();
messages.sync();

//{ force: true }
// var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'chat'
// });

// connection.connect();

// connection.end();

//export connection

module.exports = connection;


