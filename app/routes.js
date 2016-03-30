var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/alpha-beta-banners/', function (req, res) {
  res.render('elements/alpha-beta-banners');
});

router.get('/buttons/', function (req, res) {
  res.render('elements/buttons');
});

router.get('/colour/', function (req, res) {
  res.render('elements/colour');
});

router.get('/data/', function (req, res) {
  res.render('elements/data');
});

router.get('/errors/', function (req, res) {
  res.render('elements/errors');
});

router.get('/footer/', function (req, res) {
  res.render('elements/footer');
});

router.get('/form-elements/', function (req, res) {
  res.render('elements/form-elements');
});

router.get('/header/', function (req, res) {
  res.render('elements/header');
});

router.get('/icons-images/', function (req, res) {
  res.render('elements/icons-images');
});

router.get('/layout/', function (req, res) {
  res.render('elements/layout');
});

router.get('/naming-services/', function (req, res) {
  res.render('elements/naming-services');
});

router.get('/typography/', function (req, res) {
  res.render('elements/typography');
});

module.exports = router;
