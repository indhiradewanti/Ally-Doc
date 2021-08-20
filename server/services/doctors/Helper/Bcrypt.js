const bcrypt = require('bcryptjs')

function hashSync(password){
    return bcrypt.hashSync(password, 8)
}

function compareSync(password, hash){
    return bcrypt.compareSync(password, hash)
}

module.exports = { hashSync, compareSync }