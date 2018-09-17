const Transaction = require('../models/transaction');

module.exports = {
    insert: ( req, res ) => {
        let userId = req.userLogin._id
        const {itemCart, totalPrice} = req.body
        Transaction.create({
            itemCart: itemCart,
            totalPrice: totalPrice,
            userId: userId
        })
        .then((result) => {
            console.log('masuk then');
            res.status(200).json({result, msg: 'succes'})
            
        })
        .catch((err) => {
            console.log('masuk err');
            
            res.status(400).json(err)
        });
    },

    remove: ( req, res) => {
        Transaction.deleteOne( {_id : req.params.id})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    },

    getTr: ( req, res ) => {
        Transaction.find({userId: req.userLogin._id})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    }
};
