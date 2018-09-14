const Transaction = require('../models/transaction');

module.exports = {
    insert: ( req, res ) => {
        const {itemCart, totalPrice} = req.body
        let userId = req.userLogin._id
        Transaction.create({
            itemCart: itemCart,
            totalPrice: totalPrice,
            userId: userId
        })
        .then((result) => {
            res.status(200).json({result, msg: 'succes'})
            
        })
        .catch((err) => {
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
