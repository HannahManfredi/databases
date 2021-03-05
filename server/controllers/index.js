var models = require('../models');
//chat server
module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      console.log('inside controllers get');
      models.messages.get((err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log('data from controller get: ', data);
            res.header("Access-Control-Allow-Origin", "*");
            res.write(JSON.stringify(data));
            res.statusCode = 200;
            res.end();
          }
      })
    },
    post: function (req, res) { // a function which handles posting a message to the database
      console.log('post from messages: ', req);
      let mssg = req.body; //{ username: 'rabbit', text: 'hello world', roomname: 'lobby' },
      let username = req.body.username;
      let mssgText = mssg['text']; //req.body.text
      let roomname = mssg['roomname'];
      console.log(roomname);
      models.messages.post(mssgText, roomname, username, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.statusCode = 200;
          res.end();
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
      //if we get a post req from client to users endpt
        //invoke post messages
        //store the username
          //and send it to messages.post
      console.log('post from users: ', req);
      let mssg = req.body;
      //body: { username: 'Valjean' },
      console.log('post mssg: ', mssg);
    }
  }
};
