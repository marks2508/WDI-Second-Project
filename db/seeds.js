const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);

const List = require('../models/list');
const User = require('../models/user');

List.collection.drop();
User.collection.drop();

User
  .create([{
    username: 'mickyginger',
    email: 'mike.hayden@ga.co',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'mark',
    email: 'm@m',
    password: 'm',
    passwordConfirmation: 'm'
  }, {
    username: 'tom',
    email: 'tom@tom',
    password: 't',
    passwordConfirmation: 't'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return List
      .create([{
        name: 'Christmas',
        createdBy: users[0]
      },{
        name: 'Birthday',
        createdBy: users[0]
      }]);
  })
  .then((lists) => console.log(`${lists.length} hotels created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
