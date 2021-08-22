const jwt = require('jsonwebtoken')

function authenDoctor(req, res, next) {
    let {access_token} = req.headers
    const payload = jwt.verify(access_token, process.env.SECRET_KEY)
    if(payload.role === "Doctor"){
        next()
    }else if(!payload){
        throw { code: 403, message: 'Forbidden to access'}
    }
}

module.exports = authenDoctor