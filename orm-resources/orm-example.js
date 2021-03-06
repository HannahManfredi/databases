/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

// var Sequelize = require('sequelize');
const { Sequelize, Model, DataTypes } = require('sequelize');
var db = new Sequelize('chat', 'root', '');

//check connection:
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */

// var User = db.define('User', {
//   username: Sequelize.STRING
// });

class User extends Model {}
  User.init({
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
    connection,
    modelName: 'User'
});

class Message extends Model {}
  Message.init({
  uid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mssg:{
  type:DataTypes.STRING,
  allowNull: false
  }
}, {
    db,
    modelName:'Mesages'
});

User.belongsTo(Message, {foreignKey: uid});
Message.hasOne(User, {foreignKey: uid});
Room.belongsTo(Message, {foreignKey: uid});
Message.hasOne(Room, {foreignKey: uid});

/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
User.sync()
  .then(function() {
    // Now instantiate an object and save it:
    return User.create({username: 'Jean Valjean'});
  })
  .then(function() {
    // Retrieve objects from the database:
    return User.findAll({ where: {username: 'Jean Valjean'} });
  })
  .then(function(users) {
    users.forEach(function(user) {
      console.log(user.username + ' exists');
    });
    db.close();
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    db.close();
  });
