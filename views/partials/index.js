const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const routes = require('./config/routes');

const { port, dbURI } = require('./config/environment');

mongoose.connect(dbURI);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => console.log(`Express started on port: ${port}`));
