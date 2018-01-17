const express = require('express');
const router  = express.Router();
const statics = require('../controllers/statics');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const lists = require('../controllers/lists');

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in');
      res.redirect('/login');
    });
  }
  return next();
}

router.get('/', (req, res) => res.render('index'));

router.route('/lists')
  .get(lists.index)
  .post(lists.create);

router.route('/lists/new')
  .get(lists.new);

router.route('/lists/:id')
  .get(lists.show)
  .put(lists.update)
  .delete(secureRoute, lists.delete);

router.get('/lists/:id/edit', secureRoute, lists.edit);

router.route('/lists/:id/comments')
  .post(lists.createComment);

router.route('/lists/:id/comments/:commentId')
  .delete(lists.deleteComment);

router.route('/lists/:id/gifts/new')
  .get(lists.newGift);

router.route('/lists/:id/gifts')
  .post(lists.createGift);

router.route('/lists/:id/gifts/:giftId/edit')
  .get(lists.editGift);

router.route('/lists/:id/gifts/:giftId')
  .get(lists.showGift)
  .put(lists.updateGift)
  .delete(lists.deleteGift);

router.route('/lists/help')
  .get(lists.helpShow);

router.route('/register')
  .get(registrations.new) // Render the register form
  .post(registrations.create); // Handle the submit of the register form

router.route('/login')
  .get(sessions.new) // Render the login form
  .post(sessions.create); // Handle the submit of the login form

router.route('/logout')
  .get(sessions.delete);

// We will protect this route so that you can only access it if you're logged in
router.route('/secret')
  .get(secureRoute, statics.secret);



module.exports = router;
