const User = require('../models/User');

class UserController{
    
    async index(req, res){
        var users = await User.findAll();
        res.json(users);
    }

    async create(req, res){

        var {name, email, password} = req.body;

        if (name == undefined || email == undefined || password == undefined){
            res.status(400);
            res.json({err: 'Fill all fields in order: name, email and password'});
            return;
        }
        
        if (name.length < 3 || email.length < 4 || password.length < 8){
            res.status(400);
            res.json({err: `Check the rules:
                            1 - The lenght of name minimum is 4 chars
                            2 - Check your email
                            3 - The password require minimum of 8 chars`});
            return;
        }
        
        var emailExists = await User.findEmail(email);
        
        if (emailExists){
            res.status(406);
            res.json({err: 'email exist in database'});
            return;
        }else{
            await User.new(name, email, password);
        
            res.status(200);
            res.send('user signup with success');
            return;
        }

        
    }

    async findUserById(req, res){
        var id = req.params.id;

        if (isNaN(id)){
            res.status(400);
            res.json({err: 'ID need to be a number'});
        }else{

            try{
                var user = await User.findById(id);
    
                if (user == undefined){
                    res.status(400);
                    res.json({});
                }else{
                    res.status(200);
                    res.json(user);
                }
            }catch(err){
                console.log(err);
            }
        }

        
        
    }

   
    
}

module.exports = new UserController();