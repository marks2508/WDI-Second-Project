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
    .populate('createdBy')
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
  req.body.createdBy = req.user; // attaching the whole user obj to the req.body
  List
    .create(req.body)
    .then((list) => {
      req.flash('success', `${list.name} has been added`);
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
      req.flash('success', `${list.name} has been edited`);
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



function createCommentRoute(req,res,next) {
  req.body.createdBy = req.user;
  List
    .findById(req.params.id)
    .exec()
    .then((list) => {
      if(!list) return res.notFound();
      list.comments.push(req.body);
      return list.save();
    })
    .then((list) => {
      res.redirect(`/lists/${list.id}`);
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest(`/lists/${req.params.id}`, err.toString());
      }
      next(err);
    });
}

function deleteCommentRoute(req,res,next) {
  List
    .findById(req.params.id)
    .exec()
    .then((list) => {
      if(!list) return res.notFound();
      const comment = list.comments.id(req.params.commentId);
      comment.remove();
      return list.save();
    })
    .then((list) => {
      res.redirect(`/lists/${list.id}`);
    })
    .catch(next);
}

function newGiftRoute(req,res) {
  List
    .findById(req.params.id)
    .exec()
    .then((list) => {
      if(!list) return res.status(404).send('Not found');
      res.render('gifts/new', { list });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function createGiftRoute(req,res, next) {
  List
    .findById(req.params.id)
    .exec()
    .then(list => {
      if (!list) return res.notFound();
      list.gifts.push(req.body);
      return list.save();
    })
    .then(() => res.redirect(`/lists/${req.params.id}`))
    .catch((err) => {
      if (err.name === 'ValidationError') res.badRequest(`/lists/${req.params.id}`, err.toString());
      next(err);
    });
}

function editGiftRoute(req,res) {
  List
    .findById(req.params.id)
    .exec()
    .then((list) => {
      if(!list) return res.status(404).send('Not found');
      res.render('gifts/edit', { list });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function deleteGiftRoute(req, res, next) {
  List
    .findById(req.params.id)
    .exec()
    .then(list => {
      if (!list) return res.notFound();
      const gift = list.gifts.id(req.params.giftId);
      gift.remove();
      return list.save();
    })
    .then(list => res.redirect(`/lists/${list.id}`))
    .catch(next);
}

module.exports = {
  index: listsIndex,
  new: listsNew,
  show: listsShow,
  create: listsCreate,
  edit: listsEdit,
  update: listsUpdate,
  delete: listsDelete,
  newGift: newGiftRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute,
  createGift: createGiftRoute,
  editGift: editGiftRoute,
  deleteGift: deleteGiftRoute
};


// .findById(req.params.id)
// .exec()
// .then((list) => {
//   if(!list) return res.status(404).send('Not found');
//   res.render('gifts/edit', { list });
// })
// .catch((err) => {
//   res.status(500).render('error', { err });
// });
