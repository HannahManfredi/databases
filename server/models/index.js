var db = require('../db');

module.exports = {
  messages: {

    get: function (callback) { // a function which produces all the messages
      //send a query to mysql db
      console.log('inside models.messages.get');
      db.query('select * from messages', [], function(err, results) {
          if(err){
            console.log(err);
            callback(err);
          } else {
            console.log('results from db get query: ', results);
            callback(results);
          }
        });
    },

    post: function (mssg, roomname, username, callback) {
      console.log('post mssg from client: ', mssg);
      let queryStr = 'insert into messages (id, text, room, person) values (id, "mssg", ?, ?) on duplicate key update id=id+1';
      db.query(queryStr, (err, results) => {
        if(err){
          callback(err);
        } else {
          callback(results);
        }
      });
    },

    users: {
      // Ditto as above.
      get: function () {
        return db.query('select * from users', (err, data) => {
          if(err) {
          console.log(err);
          } else {
          return data;
          }
        });
      },
      post: function (username) {
        console.log('end');
      }
    }
  }
}

