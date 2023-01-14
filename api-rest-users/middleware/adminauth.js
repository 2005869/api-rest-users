var jwt = require('jsonwebtoken');
var secret = 'ahuhafduhadsfuhdufhufidsjagfgkldsfdsk';

module.exports = function(req, res, next){

    const authToken = req.headers['authorization'];

    if (authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];

        try{
            var decoded = jwt.verify(token, secret);

            if (decoded.role == 1){
                console.log(decoded);
                next();
            }else{
                res.status(403);
                res.send('not authorized');
                return;
            }
            
        }catch(err){
            res.status(403);
            res.send('not authorized');
            return;
        }
        

    }else{
        res.status(403);
        res.send('not auth');
        return;
    }
}