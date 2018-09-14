var express = require('express');
var router = express.Router();
var {register, signin} = require('../controllers/user');

/* GET home page. */
router.post('/', register )
      .post('/signin', signin)

module.exports = router;
