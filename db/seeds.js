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
    username: 'Mike',
    email: 'mike.hayden@ga.co',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'Mark',
    email: 'm@m',
    password: 'm',
    passwordConfirmation: 'm'
  }, {
    username: 'Tom',
    email: 'tom@tom',
    password: 't',
    passwordConfirmation: 't'
  },{
    username: 'Dick',
    email: 'dick@dick',
    password: 'p',
    passwordConfirmation: 'p'
  }, {
    username: 'Harry',
    email: 'harry@harry',
    password: 'p',
    passwordConfirmation: 'p'
  }, {
    username: 'James',
    email: 'james@james',
    password: 'p',
    passwordConfirmation: 'p'
  }, {
    username: 'Will',
    email: 'will@will',
    password: 'p',
    passwordConfirmation: 'p'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return List
      .create([{
        name: 'Christmas',
        createdBy: users[1],
        gifts: [{
          name: 'Brother',
          age: '22',
          interests: 'Films, art, music',
          budget: '10',
          ideas: 'iTunes voucher'
        }]
      },{
        name: 'Birthday',
        createdBy: users[1],
        gifts: [{
          name: 'Wife',
          age: '25',
          interests: 'Painting, travelling',
          budget: '50',
          ideas: 'easel'
        }]
      }, {
        name: 'Anniverseries',
        createdBy: users[1],
        gifts: [{
          name: 'Dad',
          age: '69',
          interests: 'art',
          budget: '99',
          idea: 'books, cd, clothes'
        }]
      }, {
        name: 'Christmas 2018',
        createdBy: users[2],
        gifts: [{
          name: 'Sister',
          age: '17',
          interests: 'Reading, seeing friends',
          budget: '30',
          ideas: 'Autumn by Ali Smith'
        }]
      }, {
        name: 'Kids birthdays',
        createdBy: users[3],
        gits: [{
          name: 'Sister',
          age: '17',
          interests: 'Reading, seeing friends',
          budget: '30',
          ideas: 'Autumn by Ali Smith'
        }]
      }, {
        name: 'Chanukah 2018',
        createdBy: users[4],
        gifts: [{
          name: 'Steve',
          age: '47',
          interests: 'Movies, Arsenal',
          budget: '30',
          ideas: 'Autumn by Ali Smith'
        }]
      }, {
        name: 'Christmas 2018',
        createdBy: users[5],
        gifts: [{
          name: 'Sister',
          age: '17',
          interests: 'Reading, seeing friends',
          budget: '30',
          ideas: 'Autumn by Ali Smith'
        }]
      }]);
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
