var knex = require('../database/connection');
var bcrypt = require('bcrypt');
const PasswordToken = require('./PasswordToken');

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

    async findByEmail(email){
        try{
            var result = await knex.select(['id', 'name', 'password', 'email', 'role']).where({email:email}).table('users');
            if (result.length != 0){
                return result[0];
            }else{
                return undefined;
            }
            
        }catch(err){
            console.log(err);
            return undefined;
        }
        
    }

    async findByEmail2(email){
        try{
            var result = await knex.select(['id', 'name', 'password', 'email', 'role']).where({email:email}).table('users');
            if (result.length != 0){
                return result;
            }else{
                return undefined;
            }
            
        }catch(err){
            console.log(err);
            return undefined;
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
            if (result.length != 0){
                return result;
            }else{
                return undefined;
            }
            
        }catch(err){
            console.log(err);
            return undefined;
        }
        
    }

    async update(id, name, email, role){
        
        if (!isNaN(id) && id != undefined){
            
            var editUser = {}
            var user = await this.findById(id);
            
            if (user != undefined && user.length > 0){
                
                if (email != user.email){
                    var result = await this.findEmail(email);
                    
                    if (result == false){
                        editUser.email = email;
                    }else{
                        return {err: 'email already exist'};
                    }
                }

                if (name != undefined && name != user.name){
                    editUser.name = name;
                }
    
                if (role != undefined && !isNaN(role)){
                    editUser.role = role;
                }
    
                try{                
                    var result = await knex.update(editUser).where({id: id}).table('users');
                    return {status: true};
                }catch(err){
                    return {status: false, err};
                }

                }else{
                    return {status: false, err: 'user not find by id'};
                }                          
        }else{
            return {status: false, err: 'invalid id'};
        }
        

        
    }

    async delete(id){
        var user = await this.findById(id);
        if (user != undefined){
            try{
                await knex.delete().where({id: id}).table('users');
                return {status: true};
            }catch(err){
                return {status: false, err: err};    
            }
        }else{
            return {status: false, err: 'user with this id dont exist'};
        }
    }

    async changePassword(newPassword, id, token){

        var hash = await bcrypt.hash(newPassword, 10);

        await knex.update({password: hash}).where({id: id}).table('users');
        await PasswordToken.setUsed(token);
        
    }
}

module.exports = new User();