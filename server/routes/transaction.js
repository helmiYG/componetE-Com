const router = require('express').Router()
const {insert, remove, getTr} = require('../controllers/transaction');
const isLogin = require('../midlewares/isLogin');
router.post('/', isLogin, insert)
      .get('/', isLogin, getTr)
      .put('/:id', remove)

module.exports = router