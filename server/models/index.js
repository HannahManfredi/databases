var db = require('../db');

module.exports = {

  messages: {

    get: function (callback) { // a function which produces all the messages
      //send a query to mysql db
      console.log('inside models.messages.get');
      db.query('SELECT * FROM messages', [], function(err, results, fields) {
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
      db.query('INSERT INTO messages (mssg, userid, roomid) VALUES (?, (select users.id from users where username = ?), (select rooms.id from rooms where roomname = ?))', [mssg, username, roomname], (err, results, fields) => {
        if(err){
          callback(err, 0);
        } else {
          callback(null, results);
        }
      });
    }
  },

  users: {
    // Ditto as above.
    get: function () {
      db.query('select * from users', (err, results, fields) => {
        if(err) {
        console.log(err);
        } else {
        return data;
        }
      });
    },
    postUser: function (username, callback) {
      console.log('inside models post: ', username);
      db.query('INSERT INTO users (username) VALUES ("' + username + '")', (err, results, fields) => {
        if (err) {
          callback(err, 0);
        } else {
          callback(null, results);
        }
      });
    }
  }

}

