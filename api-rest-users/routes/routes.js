var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require('../controllers/UserController');
const User = require("../models/User");
var adminAuth = require('../middleware/adminauth');
var tokenAuth = require('../middleware/tokenauth');

// HomeController
router.get('/', HomeController.index);


// UserController
router.post('/user', UserController.create);
router.get('/user', tokenAuth, UserController.index);
router.get('/user/:id', UserController.findUserById);
router.put('/user/', UserController.edit);
router.delete('/user/:id', tokenAuth ,UserController.remove);
router.post('/recoverypassword', UserController.recovery_password);
router.post('/changepassword', UserController.changePassword);
router.post('/login', UserController.login);
router.post('/validate', tokenAuth, HomeController.validade);

module.exports = router;