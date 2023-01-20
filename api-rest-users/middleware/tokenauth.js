const User = require('../models/User');


module.exports = async function(req, res, next){

    var authToken = req.headers['authorization'];
    var emailToken = req.headers['email'];

    if (authToken != undefined){
        const bearer = authToken.split(' ');
        const token = bearer[1];
        
        try{
            var user = await User.findByEmail(emailToken);

            console.log(user.role);
            if (user != undefined && user.role == 1){                
                next();
            }else{
                res.status(403);
                res.send('not authorized');
                res.json({error: 'You need admin credentials'})
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