// var db = require('../db');
// var Sequelize = require('sequelize');
// var Promise = require('bluebird');

// //update to use SEQUELIZE:

// module.exports = {

//   messages: {
//     get: function(callback) {
//       //add sequelize code here
//       //get all messages
//       db.messages.findAll()
//         .then(function(data) {
//           console.log('data from findAll: ', data);
//           callback(null, data);
//         })
//         .catch(function(err) {
//           callback(err, 0);
//         })
//     },
//     post: function(mssgText, username, roomname, callback) {
//       //get the userid
//       const userId = users.findOne({ include: userid });
//       console.log('userId: ', userId);
//       db.messages.create({ mssg: mssgText, username: userId, roomname: roomname })
//         .then(function(data) {
//           console.log('data from create: ', data);
//           callback(null, data);
//         })
//         .catch(function(err) {
//           callback(err, 0);
//         })
//     }
//   },

//   users: {
//     get: function(username, callback) {
//       // messages.findAll({ include: userid });
//       db.messages.findAll({
//         include: [{
//           model: users,
//           required: true,
//         }]
//       }).then(posts => {
//         console.log('posts: ', posts);
//         callback(null, posts);
//       }).catch(error => {
//         callback(error, 0);
//       })
//     },
//     post: function(username, callback) {
//       db.users.create({username: username})
//       .then(function(data) {
//         console.log('data from users create: ', data);
//         callback(null, data);
//       })
//       .catch(function(err) {
//         callback(err, 0);
//       })
//     }
//   }

// }

module.exports = {

  messages: {

    get: function (callback) {
      console.log('inside models.messages.get');
      //need to use a join here grab all messages from specific user
      db.query('SELECT * FROM messages', function(err, results, fields) {
          if(err){
            console.log(err);
            callback(err, 0);
          } else {
            console.log('results from db get query: ', results);
            callback(null, results);
          }
        });
    },

    post: function (mssg, username, roomname, callback) {
      console.log('post mssg from client: ', mssg);
      //grab just one row from each table, only insert into if it's not there
      db.query('INSERT IGNORE INTO messages (mssg, userid, roomname) VALUES (?, (select users.id from users where username = ?), ?)', [mssg, username, roomname], (err, results, fields) => {
        if(err) {
          callback(err, 0);
        } else {
          callback(null, results);
        }
      });
    }
  },

  users: {
    get: function (user, callback) {
      db.query('select * from messages inner join users on users.username = ?', user, (err, results, fields) => {
        if(err) {
        console.log(err);
        } else {
        return data;
        }
      });
    },
    postUser: function (username, callback) {
      console.log('inside models post: ', username);
      //only insert into if it doesn't already exist
      //only add in user if user is unique
      // WHERE NOT EXISTS ( SELECT * FROM
      db.query('INSERT IGNORE INTO users (username) VALUES (?)', username, (err, results, fields) => {
        if (err) {
          callback(err, 0);
        } else {
          callback(null, results);
        }
      });
    }
  },

}

