class UserController{
    
    async index(req, res){}

    async create(req, res){
        console.log(req.body);
        res.send('get body of req');
    }
}

module.exports = new UserController();