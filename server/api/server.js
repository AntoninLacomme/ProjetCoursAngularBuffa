let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let user = require ("./routes/user");
let matiere = require ("./routes/matieres");

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud
//const uri = "mongodb+srv://new-user-0:new-user-0@cluster0.mamas.mongodb.net/assignments?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/assignments";

// mongoimport --db assignments --collection assignments --drop --file MOCK_DATA_PARSED.json --jsonArray

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(assignment.getAssignments)
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

// app.get(prefix + "/user", (req, res) => {
//   user.getUser (req, res);
// })
// app.post (prefix + "/user", (req, res) => {
//   console.log ("POST RECEIVED")
//   user.postUser (req, res);
// })

app.route (prefix + "/user")
  .get (user.getUser)
  .post (user.postUser);

app.route (prefix + "/matiere")
  .get (matiere.getMatieres);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


