let Matiere = require('../model/matiere');

// Récupérer tous les assignments (GET)
function getMatieres (req, res) {  
    Matiere.find({}, (err, mat) => {
        if(err){
            res.send(err)
        }
        console.log (mat)
        res.send(mat);
    });
}
module.exports = { getMatieres };
