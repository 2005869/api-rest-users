const { user } = require('../database/secrets');
const User = require('../models/User');
const PasswordToken = require('../models/PasswordToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var secret = 'ahuhafduhadsfuhdufhufidsjagfgkldsfdsk';

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


    async edit(req, res){
        var {id, name, email, role} = req.body;

        var result = await User.update(id, name, email, role);
        console.log(result);
        console.log(result.status);
        if (result != undefined && result.status == true){
            console.log(result);
            res.status(200);
            res.json({success: 'Success'});
        }else{
            res.status(400);
            res.json({err: result.err});
        }
    }

    async remove(req, res){
        var id = req.params.id;

        var result = await User.delete(id);

        if (result.status){
            res.status(200);
            res.send('user removed');
        }else{
            res.status(406);
            res.send(result.err);
        }
    }
   
    async recovery_password(req, res){
        var email = req.body.email;

        var result = await PasswordToken.create(email);

        if (result.status){
            res.status(200);
            res.send('' + result.token);
            // Todo send email
        }else{
            res.status(406);
            res.send('result.err');
        }
    }

    async changePassword(req, res){
        var token = req.body.token;
        var newPassword = req.body.newPassword;
        var isTokenValid = await PasswordToken.validate(token);

        if (isTokenValid.status){
            await User.changePassword(newPassword, isTokenValid.token.user_id, isTokenValid.token.token);
            res.status(200);
            res.send('success');
        }else{
            res.status(406);
            res.send('invalid token');
        }
    }

    async login(req, res){
        var {email, password} = req.body;

        var user = await User.findByEmail(email);

        if (user != undefined){
            var user = await bcrypt.compare(password, user.password);
            
            if (user){
                var token = jwt.sign({email: user.email, role: user.role}, secret);
                res.status(200);
                res.json({token: token, email: email});
            }else{
                res.status(406);
                res.json({err: 'Err1: Invalid e-mail or password.'});
            }
        }else{
            res.status(406);
            res.json({err: 'Err2: Invalid e-mail or password.'});
        }
    }
}

module.exports = new UserController();