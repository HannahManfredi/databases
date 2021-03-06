var models = require('../models');

module.exports = {

  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      console.log('inside controllers get');
      models.messages.get((err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.statusCode = 200;
            res.header("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify(data));
          }
      })
    },
    post: function (req, res) { // a function which handles posting a message to the database
      console.log('post from messages: ', req);
      let mssg = req.body;
      let mssgText = mssg['text'];
      let roomname = mssg['roomname'];
      let username = mssg['username'];
      models.messages.post(mssgText, username, roomname, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.statusCode = 200;
          res.end(JSON.stringify(data));
        }
      });
    }
  },

  users: {
    get: function (req, res) {
      let username = req.body.user;
      console.log('username inside users get: ', username);
      models.users.get(username, (err, data) => {
        if (err) {
          res.status(500).send();
        } else {
          res.statusCode = 200;
          res.end(JSON.stringify(data));
        }
      });
    },
    post: function (req, res) {
      console.log('insde post from /users: ', req);
      models.users.post(req.body.user, (err, data) => {
        if (err) {
          res.status(500).send();
        } else {
          res.statusCode = 200;
          res.end(JSON.stringify(data));
        }
      });
    }
  },

};
