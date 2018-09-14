var express = require('express');
var router = express.Router();
const {userInfo} = require('../controllers/user');
const isLogin = require('../midlewares/isLogin');
/* GET users listing. */
router.get('/', isLogin, userInfo);

module.exports = router;
