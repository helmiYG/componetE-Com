const mongoose = require('mongoose');
const Schema = mongoose.Schema


let transactionSchema = new Schema({
    itemCart: [],
    totalPrice: Number, 
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})

let Transaction = mongoose.model('Transaction',transactionSchema)
module.exports = Transaction