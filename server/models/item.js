const mongoose = require('mongoose');
const Schema = mongoose.Schema

let itemSchema = new Schema({
    name: {type: String, required : true},
    stock: {type: Number, required : true},
    price: {type: Number, required : true},
    category : {type: String, required : true},
    img: {type: String, required : true},
})

let Item = mongoose.model('Item',itemSchema)
module.exports = Item