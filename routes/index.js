// jshint esversion: 8
const express = require('express'); //calls express
const router = express.Router(); //gets the router portion of express


router.get('/', (req, res) => { //Takes the request and then sends a response
  res.render('index'); //the router will render everything in the index.ejs file as its response
});

module.exports = router; //need to export the router so the server has access to it.
