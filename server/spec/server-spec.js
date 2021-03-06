/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;
var sequelizeConnection = require('../db');

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chat'
    });
    dbConnection.connect();
    // sequelizeConnection();
    //how to truncate from sequelize
    // sequelizeConnection.drop();
       var tablename = "messages";
       var usersTable = "users";

       //figure out how to wipe out each table

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename);
    dbConnection.query('delete from ' + usersTable, done);
  });

  afterEach(function() {
    // sequelizeConnection.close();
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          console.log(results);
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].mssg).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
        // sequelizeConnection.Message.findAll()
        //   .then( () => {
        //     expect(results.length).to.equal(1);
        //   })
        //   .then( () => {
        //     expect(results[0].mssg).to.equal('In mercy\'s name, three days is all I need.');
        //   })
        //   .then ( () => {
        //     done();
        //   })
        //   .catch( (err) => {
        //     console.log(err);
        //   })
      });
    });
    done();
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
       var queryString = "insert into messages (mssg, userid, roomname) values (?, ?, ?)";
       var queryArgs = ['Men like you can never change!', 1, 'main'];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        console.log('body: ', body);
        console.log('body: ', JSON.stringify(body));
        console.log('mssg: ', messageLog[0]);
        expect(messageLog[0].mssg).to.equal('Men like you can never change!');
        expect(messageLog[0].roomname).to.equal('main');
        done();
      });
    });
  });
});

