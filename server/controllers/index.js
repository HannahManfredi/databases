var models = require('../models');
//chat server
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
    // Ditto as above
    get: function (req, res) {
      console.log('get req from users: ', req)
    },
    post: function (req, res) {
      console.log('insde post from /users: ', req);
      //if we get a post req from client to users endpt
        //store the username in database
      console.log('req.body.user: ', req.body.user);
      // console.log('username: ', username);
      // console.log(models.users.postUser);
      models.users.postUser(req.body.user, (err, data) => {
        if (err) {
          res.status(500).send();
        } else {
          res.statusCode = 200;
          res.end(JSON.stringify(data));
        }
      });
    }
  }

};
