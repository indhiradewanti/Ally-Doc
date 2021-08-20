const errorHandling = (err, req, res, next) => {
    console.log(err)
    switch(err.code){
        case 400:
            res.status(err.code).json({message: err.message})
            break;
        case 401:
            res.status(err.code).json({message: err.message})
            break;
        case 403:
            res.status(err.code).json({message: err.message})
            break;
        case 500:
            res.status(err.code).json({message: err.message})
        default:
            res.status(500).json({message: 'Internal server error'})
    }
}