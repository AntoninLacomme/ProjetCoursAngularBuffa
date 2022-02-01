let User = require('../model/matiere');

// Récupérer tous les assignments (GET)
function getMatieres (req, res) {  
    Matiere.find((err, mat) => {
        if(err){
            res.send(err)
        }
        res.send(mat);
    });
}
module.exports = { getMatieres };
