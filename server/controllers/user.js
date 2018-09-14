const User = require('../models/user');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

module.exports = {
    register: ( req, res ) => {
        let {name, email, password, address, phone} = req.body
        let hash = bcrypt.hashSync(password, salt);
        User.create({
            name: name,
            email: email,
            password: hash,
            address: address,
            phone: phone
        })
        .then(() => {
            res.status(200).json({
                msg: 'register succes'
            })
        })
        .catch((err) => {
            res.status(500).json({
                err
            })
        });
    }, 
    signin: ( req, res ) => {
        let {email, password} = req.body
        User.findOne({email: email})
        .then((userLogin) => {
            if (userLogin) {
                let result = bcrypt.compareSync(password, userLogin.password);
                if (result) {
                   let token = jwt.sign({
                       name: userLogin.name,
                       email: userLogin.email
                   }, process.env.secret) 
                   res.status(200).json({
                       msg: 'login succes',
                       token,
                       loginName: userLogin.name,
                       loginAddress: userLogin.address,
                       loginPhone: userLogin.phone

                   })
                } else {
                    res.status(400).json({
                        msg: 'password wrong',
                    })
                }
            } else {
                res.status(400).json({
                    msg: 'user not found',
                })

            }
        })
        .catch((err) => {
            res.status(400).json({
                err
            })

        });
    },

    userInfo: ( req, res) => {
        res.status(200).json({
            loginName: req.userLogin.name,
            loginAddress: req.userLogin.address,
            loginPhone: req.userLogin.phone
        })
    }
};

