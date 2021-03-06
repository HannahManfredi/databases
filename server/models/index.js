var db = require('../db');

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

  rooms: {
    post: function(room, callback) {
      console.log('inside rooms post');
      //only insert into if it doesn't already exist
      db.query('INSERT INTO rooms (roomname) VALUES (?)', room, (err, results, fields) => {
        if (err) {
          callback(err, 0);
        } else {
          callback(null, results);
        }
      });
    }
  }

}

