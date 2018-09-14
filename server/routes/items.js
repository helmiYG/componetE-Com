const router = require('express').Router()
const {insert, getItem, update, remove, buyItem} = require('../controllers/item');
const isLogin = require('../midlewares/isLogin')
const {isAdmin} = require('../midlewares/isAdmin');
router.post('/', isLogin, isAdmin, insert)
      .get('/', getItem)
      .put('/buy', buyItem)
      .put('/:id', isLogin, isAdmin, update)
      .delete('/:id', isLogin, isAdmin, remove)

module.exports = router