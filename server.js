// jshint esversion: 8
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express'); //imports express from express library
const app = express(); //get the app portion of that
const expressLayouts = require('express-ejs-layouts'); //get the express layout package
const bodyParser = require('body-parser'); //get body parser library.

//The server needs to know the router exists
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');

//Configuring the Express Application
app.set('view engine', 'ejs'); //sets the view engine, ejs is the view engine we're using.
app.set('views', __dirname + '/views'); //Views come from views, All the views will go to current directory name/views
app.set('layout', 'layouts/layout');//every file will be put into this file so we don't have to duplicate the repeating html like header/footer.
app.use(expressLayouts);//Tell that app that we want to use expressLayouts
app.use(express.static('public'));//will contain our style sheets, js, images, etc. Public is a common name given.
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false })); //tell express how to use that body parser library.

const mongoose = require('mongoose'); //import mongoose.
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }); //sets up connection for our database. Use the newer updated parser.
const db = mongoose.connection; //access the connection to see if we are successfully connected
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose')); //Log success once upon the first time.

app.use('/', indexRouter); //Use the router we created.
app.use('/authors', authorRouter); //Use the router we created, they'll all be prepended with "/authors"

app.listen(process.env.PORT || 3000); //pulls from an environment variable
