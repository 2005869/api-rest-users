var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require('../controllers/UserController');
const User = require("../models/User");

// HomeController
router.get('/', HomeController.index);


// UserController
router.post('/user', UserController.create);
router.get('/user', UserController.index);
router.get('/user/:id', UserController.findUserById);
router.put('/user/', UserController.edit);
router.delete('/user/:id', UserController.remove);
router.post('/recoverypassword', UserController.recovery_password);
router.post('/changepassword', UserController.changePassword);
router.post('/login', UserController.login);

module.exports = router;