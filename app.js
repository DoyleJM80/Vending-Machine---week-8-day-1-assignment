const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const parseurl = require('parseurl');

const app = express();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/jbvending');

app.use('/static', express.static('static'));
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// API ENDPOINTS
// render index page with all vending machine items available
app.get('/api/items/', function(req, res) {
  res.json({});
});

// on index if vendor to log in page
app.get('/login', function(req, res) {
  res.redirect('/login', {});
});

// on index form for choosing item
app.get('/api/items/:id', function(req, res) {
  res.redirect('/detail');
});

// on index form for vendors only to go to edit page
app.get('/update', function(req, res) {
  res.redirect('update', {});
});

//

app.listen(3000, function() {
  console.log('listening');
});
