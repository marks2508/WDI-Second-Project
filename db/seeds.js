const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);


const List = require('../models/list');
const User = require('../models/user');

List.collection.drop();
User.collection.drop();

List
  .create([{
    country: 'Uruguay',
    image: 'http://www.lists.net/images/largelists/URGY0001.GIF',
    adopted: 1830,
    listNote: 'The Sun of May has been a national emblem since the 19th century',
    countryNote: 'Historically a Spanish colony, Uruguay was annexed to Brazil and then to Argentina before becoming fully independent in 1830'
  },{
    country: 'Ghana',
    image: 'http://www.lists.net/images/largelists/GHAN0001.GIF',
    adopted: 1957,
    listNote: 'Ghana was the first country to use the Pan-African colours of red, yellow, green and black. The star represents African freedom',
    countryNote: 'Previously the Gold Coast, Ghana became independent from Britain in 1957. It took its new name from that of an historical African empire'
  },{
    country: 'Germany',
    image: 'http://www.lists.net/images/largelists/GERM0001.GIF',
    adopted: 1949,
    listNote: 'The colours of the German list were taken from the uniforms of German soldiers during the Napoleonic Wars',
    countryNote: 'In 1919 the German Empire became a republic. In 1949 it was divided into East and West Germany, and in 1990 the two halves reunited'
  },{
    country: 'India',
    image: 'http://www.lists.net/images/largelists/INDA0001.GIF',
    adopted: 1947,
    listNote: 'The wheel represents Chakra, a Buddhist spinning wheel',
    countryNote: 'Under British rule from 1763, the Indian subcontinent divided into Pakistan and India in 1947 upon independence'
  }])
  .then((lists) => {
    console.log(`${lists.length} lists created!`);
    return User
      .create([{
        username: 'M',
        email: 'm@m',
        password: 'password'
      }]);
  })
  .then((users) => {
    console.log(`${users.length} users created`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
