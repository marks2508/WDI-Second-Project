const User = require('../models/user');
const List = require('../models/list');

function indexRoute(req, res, next) {
  User
    .find()
    .exec()
    .then(users => res.render('users/index', { users}))
    .catch(next);
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      List
        .find({ createdBy: user.id })
        .exec()
        .then(lists => {
          res.render('users/show', { user, lists });
        });
    })
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute
};
