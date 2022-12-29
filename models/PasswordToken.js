var knex = require('../database/connection');
var User = require('./User');

class PasswordToken{

    async create(email){
        var user = await User.findByEmail(email);
        console.log(user.id);
        if (user != undefined){
            try{
                var token = Date.now();
                
                await knex.insert({user_id: user.id, used: 0, token: token}).table('password_tokens');
                return {status: true, token: token};
            }catch(err){
                return {status: false, err: err};
            }
            
        }else{
            return {status: false, err: 'Email not found'};
        }
    }
}

module.exports = new PasswordToken();