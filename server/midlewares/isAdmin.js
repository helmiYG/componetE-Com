module.exports = {
    isAdmin: (req, res, next) => {
        let userLogin = req.userLogin
        if(userLogin.role === 'admin'){
            next()
        }else{
            res.status(403).json({
                msg: 'you are not authorized'
            })
        }
    }
};