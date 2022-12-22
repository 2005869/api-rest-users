class HomeController{

    async index(req, res){
        res.send("api rest users");
    }

}

module.exports = new HomeController();