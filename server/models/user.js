const mongoose = require('mongoose');
const Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
    name: {type: String, required : [true, 'name is required']},
    email: {type: String, unique: [true, 'email is already in use'], required : [true, 'email is required']},
    address: {type: String, required : [true, 'address is required']},
    phone: {type: String, required : [true, 'phone is required']},
    password: {type: String, required : [true, 'password is required']},
    role: {type: String, default: 'user'},
})

userSchema.plugin(uniqueValidator);

let User = mongoose.model('User',userSchema)
module.exports = User