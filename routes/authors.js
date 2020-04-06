// jshint esversion: 10
const express = require('express'); //calls express
const router = express.Router(); //gets the router portion of express
const Author = require('../models/author'); //Need to import this to pass the data from our author model to our router

// All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
    });
  } catch {
    res.redirect('/');
  }
});

//New Author Route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() }); //these variables are set to our ejs file.
});

// Create Author Route
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`);
    red.redirect(`authors`);
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author'
    });
  }
});

module.exports = router; //need to export the router so the server has access to it.
