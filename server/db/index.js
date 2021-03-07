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

const User = connection.define('User', {
  // uid: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true
  // },
  username: Sequelize.STRING
});

console.log(User === connection.models.User);

const Message = connection.define('Message', {
  // uid: {
  //   type: DataTypes.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true
  // },
  mssg: Sequelize.STRING,
  // allowNull: false,
  roomname: Sequelize.STRING,
});

console.log(Message === connection.models.Message); //true

User.hasMany(Message);
Message.belongsTo(User);

User.sync();
Message.sync();

module.exports.User = User;
module.exports.Message = Message;
// module.exports = connection;

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




