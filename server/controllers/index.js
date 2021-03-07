var models = require('../models');
var db = require('../db');
// var Sequelize = require('sequelize');
var Promise = require('bluebird');

//update to use SEQUELIZE:

module.exports = {

  messages: {
    get: function (req, res) {
      db.Message.findAll({include: [User]})
        .complete( (err, results) => {
          if (err) {
            res.status(500).send();
          } else {
            res.json(results);
          }
        });
    },
    post: function (req, res) {
      db.User.findOrCreate({ username: req.body.username })
        .complete( (err, results) => {
          if (err) {
            res.status(500).send();
          } else {
            let params = {
              mssg: req.body[text],
              userid: results.id,
              roomname: req.body[roomname]
            };
            db.Message.create(params)
              .complete( (err, results) => {
                if (err) {
                  res.status(500).send();
                } else {
                  res.sendStatus(201) ;
                }
              });
          ``}
        });
    }
  },

  users: {
    get: function (req, res) {
      db.Users.findAll()
        .complete( (err, results) => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.json(results);
          }
        })
    },
    post: function (req, res) {
      User.create({username: req.body.username})
        .complete( (err, results) => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
    }
  }

}


//