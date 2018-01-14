const User = require('../models/user');

// Render the login form
function newRoute(req, res) {
  res.render('sessions/new');
}

// Login a user
function createRoute(req, res) {
  User
    .findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).render('sessions/new', { message: 'Unrecognised credentials, please try again' });
      }
      // storing users id inside the session that is saved on the server
      req.session.userId = user.id;
      req.flash('info', `Welcome, ${user.username}`);
      res.redirect('/lists');
    })
    .catch(() => {
      res.status(500).end();
    });
}

function deleteRoute(req, res) {
  return req.session.regenerate(() => {
    res.redirect('/');
  });
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
