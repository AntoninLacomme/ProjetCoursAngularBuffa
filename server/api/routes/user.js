let User = require('../model/user');

// Récupérer tous les assignments (GET)
function getUser (req, res) {
    let name = req.query.name;
    
    User.findOne({name: name}, (err, user) => {
        if(err){
            res.send(err)
        }
        res.send(user);
    });
}

// Ajout d'un assignment (POST)
function postUser (req, res){
    let user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    console.log (user);
    user.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ saved: true })
    })
}

module.exports = { getUser, postUser };
