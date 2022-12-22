var knex = require('../database/connection');
var bcrypt = require('bcrypt');

class User{
    async new(name, email, password){
        
        try{
            var hash = await bcrypt.hash(password, 10);
            await knex.insert({name, email, password: hash, role: 0}).table('users');
        }catch(err){
            console.log(err);
            res.status(400);
        }
        
    }

    async findEmail(email){
        try{
            var result = await knex.select("*").from("users").where({email: email});
            
            if (result.length > 0){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err);
            return false;
        }
        
    }

    async findAll(){
        try{
            var result = await knex.select(['id', 'name', 'email', 'role']).table('users');

            return result;
        }catch(err){
            console.log(err);
            return [];
        }
        
    }

    async findById(id){
        try{
            var result = await knex.select(['id', 'name', 'email', 'role']).where({id:id}).table('users');

            return result;
        }catch(err){
            console.log(err);
            return [];
        }
        
    }
}

module.exports = new User();