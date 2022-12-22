class UserController{
    
    async index(req, res){}

    async create(req, res){

        var {name, email, password} = req.body;

        if (name == undefined || email == undefined || password == undefined){
            res.status(400);
            res.json({err: 'Fill all fields in order: name, email and password'});
        }
        
        if (name.length < 3 || email.length < 4 || password.length < 8){
            res.status(400);
            res.json({err: `Check the rules:
                            1 - The lenght of name minimum is 4 chars
                            2 - Check your email
                            3 - The password require minimum of 8 chars`});
        }
        
        res.status(200);
        res.send('get body of req');
    }

   
    
}

module.exports = new UserController();