const express        = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser     = require('body-parser');
const routes         = require('./config/routes');
const morgan         = require('morgan');
const session        = require('express-session');
const User           = require('./models/user');
const methodOverride = require('method-override');
const flash          = require('express-flash');
const mongoose       = require('mongoose');
mongoose.Promise     = require('bluebird');
const app            = express();

const { port, dbURI } = require('./config/environment');
mongoose.connect(dbURI);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(session({
  secret: process.env.SESSION_SECRET || 'this is a secret',
  resave: false,
  saveUnitialized: false
}));

app.use(flash());

app.use((req, res, next) => {
  if (!req.session.userId) return next();
  User
    .findById(req.session.userId)
    .exec()
    .then((user) => {
      if(!user) {
        return req.session.regenerate(() => {
          res.redirect('/');
        });
      }
      res.locals.user = user;
      res.locals.isLoggedIn = true;
      next();
    });
});

app.use(routes);

app.listen(port, () => console.log(`Express is listening to port ${port}`));
