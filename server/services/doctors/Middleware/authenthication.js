const jwt = require('jsonwebtoken')

function authenDoctor(req, res, next) {
    try{
        let {access_token} = req.headers
        const payload = jwt.verify(access_token, process.env.SECRET_KEY)
        if(payload.role === "Doctor"){
            next()
        }else{
            throw { code: 403, message: 'Forbidden to access'}
        }
    }catch(err){
        const code = err.code;
        const message = err.message;
        next({
            code, message
        })
    }
}

module.exports = authenDoctor