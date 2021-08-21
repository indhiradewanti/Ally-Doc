const errorHandling = (err, req, res, next) => {
    // console.log(err)
    const message = err.message
    const code = err.code || 500
    switch(err.code){
        case 400:
            res.status(code).json({message})
            break;
        case 401:
            res.status(code).json({message})
            break;
        case 403:
            res.status(code).json({message})
            break;
        case 500:
            res.status(code).json({message})
            break
        case 404:
            res.status(code).json({message})
            break
        default:
            res.status(500).json(err)
    }
}

module.exports = errorHandling