const List = require('../models/list');

function listsIndex(req, res) {
  List
    .find()
    .exec()
    .then((lists) => {
      res.render('lists', { lists });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function listsNew(req, res) {
  res.render('lists/new');
}

function listsShow(req, res) {
  List
    .findById(req.params.id)
    .exec()
    .then((list) => {
      if(!list) return res.status(404).send('Not found');
      res.render('lists/show', { list });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function listsCreate(req, res) {
  List
    .create(req.body)
    .then((list) => {
      req.flash('success', `${list.country} has been added`);
      res.redirect('/lists'); // redirect user back to the index page
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function listsEdit(req, res) {
  List
    .findById(req.params.id)
    .exec()
    .then((list) => {
      if(!list) return res.status(404).send('Not found');
      res.render('lists/edit', { list });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function listsUpdate(req, res) {
  List
    .findById(req.params.id)
    .exec()
    .then((list) => {
      if(!list) return res.status(404).send('Not found');
      list = Object.assign(list, req.body);
      return list.save();
    })
    .then((list) => {
      req.flash('success', `${list.country} has been edited`);
      res.redirect(`/lists/${list.id}`);
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function listsDelete(req, res) {
  List
    .findById(req.params.id)
    .exec()
    .then((list) => {
      if(!list) return res.status(404).send('Not found');
      return list.remove();
    })
    .then(() => {
      res.redirect('/lists');
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

module.exports = {
  index: listsIndex,
  new: listsNew,
  show: listsShow,
  create: listsCreate,
  edit: listsEdit,
  update: listsUpdate,
  delete: listsDelete
};
