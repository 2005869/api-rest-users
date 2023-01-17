class HomeController{

    async index(req, res){
        res.send("api rest users");
    }

    async validade(req, res){
        res.send('ok');
    }

}

module.exports = new HomeController();