let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    let limite = (req.query["limit"] !== undefined) ? parseInt(req.query["limit"]) : 50;
    let skip = (req.query["skip"] !== undefined) ? parseInt(req.query["skip"]) : 0;
    Assignment.find({}, null, { skip: skip, limit: limite }, (err, assignments) => {
        if(err){
            res.send(err)
        }
        res.send(assignments);
    });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;
    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
async function postAssignment(req, res){
    let assignment = new Assignment(req.body);
    assignment.id = await Assignment.count() + 1;
    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}

function countAssignment (req, res) {
    Assignment.countDocuments({}, (err, count) => {
        if (err) { res.send (err) }
        res.send ({count: count})
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment, countAssignment};
