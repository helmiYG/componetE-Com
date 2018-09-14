const jwt = require('jsonwebtoken');
const User = require('../models/user')

isLogin = function( req, res, next){
    let token = req.headers.token
    if(token){
        let decode = jwt.verify(token, process.env.secret)
        User.findOne({email: decode.email})
        .then(( isLogin ) => {
            if( isLogin ){
                req.userLogin = isLogin
                next()
            }else{
                res.status(400).json({msg: 'please login first'})
            }
        })
        .catch(( err ) => {
            res.status(400).json({msg: 'please login first'})
        })
    }else{
        res.status(400).json({msg: 'please login first'})
    }
}

module.exports = isLogin