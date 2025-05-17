const handleError = (statusCode , message)=>{

    const error = new Error() ;
    error.message = message ;
    error.statusCode = statusCode ;

    return error ;




}

module.exports = {handleError}