const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);


const List = require('../models/list');
const User = require('../models/user');
const Gift = require('../models/list');

List.collection.drop();
User.collection.drop();

List
  .create([{
    name: 'Christmas'
  },{
    name: 'Birthdays'
  },{
    name: 'Anniverseries'
  }])
  .then((lists) => {
    console.log(`${lists.length} lists created`);
    return Gift
      .create([{
        name: 'Book',
        age: '35',
        interests: 'Art',
        budget: '99',
        ideas: 'Books'
      }]);
  })
  .then((gifts) => console.log(`${gifts.length} gifts created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
