var Parse = {

  server: 'http://127.0.0.1:3000/classes/messages',

  userEndpoint: 'http://127.0.0.1:3000/classes/users',

  create: function(message, successCB, errorCB = null) {

    $.ajax({
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function (error) {
        console.error('chatterbox: Failed to create message', error);
      }
    });
  },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  },

  postUsername: function(username) {
    console.log('inside postUsername: ', username);
    let newUsername = {user: username};
    $.ajax({
      url: Parse.userEndpoint,
      type: 'POST',
      crossDomain: true,
      data: JSON.stringify(newUsername),
      contentType: 'application/json',
      success: () => {
        console.log('success');
      },
      error: function (error) {
        console.error('chatterbox: Failed to update username', error);
      }
    });
  }

};