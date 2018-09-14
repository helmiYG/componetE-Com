const mongoose = require('mongoose');
const Schema = mongoose.Schema

let itemSc = new Schema ({itemName: String, price: Number, qty: Number, total: Number})
let transactionSchema = new Schema({
    itemCart: [itemSc],
    totalPrice: Number, 
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
})

let Transaction = mongoose.model('Transaction',transactionSchema)
module.exports = Transaction