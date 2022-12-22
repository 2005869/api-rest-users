var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require('../controllers/UserController');

// HomeController
router.get('/', HomeController.index);


// UserController
router.post('/user', UserController.create);

module.exports = router;