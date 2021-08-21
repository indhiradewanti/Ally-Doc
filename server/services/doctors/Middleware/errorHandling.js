const errorHandling = (err, req, res, next) => {
    // console.log(err)
    const message = err.message
    switch(err.code){
        case 400:
            res.status(err.code).json({message})
            break;
        case 401:
            res.status(err.code).json({message})
            break;
        case 403:
            res.status(err.code).json({message})
            break;
        case 500:
            res.status(err.code).json({message})
            break
        case 404:
            res.status(err.code).json({message})
        default:
            res.status(500).json({message: 'Internal server error'})
    }
}

module.exports = errorHandling