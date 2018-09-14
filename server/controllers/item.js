const Item = require('../models/item');

module.exports = {
    insert: (req, res) => {
        Item.create(req.body)
            .then(result => {
                res.status(200).json({
                    msg: 'insert succes'
                })
            })
            .catch(err => {
                res.status(400).json({
                    msg: 'insert failed'
                })
            })
    },

    getItem: (req, res) => {
        Item.find()
            .then((result) => {
                if (result.length > 0) {
                    res.status(200).json(result)
                } else {
                    res.status(200).json({ msg: 'data not found' })
                }
            })
            .catch((err) => {
                res.status(400).json({
                    msg: err.message
                })
            });
    },

    update: (req, res) => {
        Item.findOne({ _id: req.params.id })
            .then((item) => {
                if (item) {
                    Item.updateOne({ _id: req.params.id }, {
                        $set: {
                            name: req.body.name || item.name,
                            stock: req.body.stock || item.stock,
                            price: req.body.price || item.price,
                            category: req.body.category || item.category,
                        }
                    })
                        .then((result) => {
                            res.status(200).json({ msg: 'update succes', result })
                        })
                        .catch((err) => {
                            res.status(400).json({
                                msg: err.message
                            })
                        });
                } else {
                    res.status(200).json({ msg: 'data not found' })
                }
            }).catch((err) => {
                res.status(400).json({
                    msg: err.message
                })
            });

    },

    remove: (req, res) => {
        Item.findOne({ _id: req.params.id })
            .then((item) => {
                if (item) {
                    Item.deleteOne({ _id: req.params.id })
                        .then((result) => {
                            res.status(200).json({ msg: 'delete succes', result })
                        })
                        .catch((err) => {
                            res.status(400).json({
                                msg: err.message
                            })
                        });
                } else {
                    res.status(200).json({ msg: 'data not found' })
                }
            })
            .catch((err) => {
                res.status(400).json({
                    msg: err.message
                })
            });

    },

    buyItem: ( req, res ) => {
       
       Item.findById(req.body.id)
       .then((result) => {
          if(result){
            Item.updateOne({_id : req.body.id}, {$set: {stock : result.stock-1}})
            .then(() => {
                
            }).catch(() => {
                console.log(err);
            });
          }
       }).catch((err) => {
           console.log(err);
           
       });
        
        //

    }
}