const fs = require ("fs");

function writeFile (path, content) {
    fs.writeFileSync (path, content, err => {
        if (err) {
            console.error (err);
            return;
        }
    })
}

function readFile (path, callback) {
    fs.readFile(path, 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
    
        callback (data);
    })
}
const matieres = [
    {
        "nomMatiere": "Base de Donnée",
        "imageMatiere": "bdd.png",
        "photoProf": "prof1.jpg"
    },
    {
        "nomMatiere": "Technologies Web",
        "imageMatiere": "technoweb.png",
        "photoProf": "prof2.jpg"
    },
    {
        "nomMatiere": "Grails",
        "imageMatiere": "grails.png",
        "photoProf": "prof3.jpg"
    },
    {
        "nomMatiere": "Clustering",
        "imageMatiere": "clustering.jpg",
        "photoProf": "prof4.jpg"
    },
    {
        "nomMatiere": "Gestion de Projet",
        "imageMatiere": "projet.png",
        "photoProf": "prof5.jpg"
    },
    {
        "nomMatiere": "Manipulation 3D",
        "imageMatiere": "3d.jpg",
        "photoProf": "prof6.jpg"
    }
];

readFile ("./MOCK_DATA_2.json", (data) => {
    let data_parsed = JSON.parse (data).map ((v, index) => {
        let matiere = matieres[Math.floor(Math.random () * matieres.length)]
        v.id = index;
        v.nomMatiere = matiere.nomMatiere;
        v.imageMatiere = matiere.imageMatiere;
        v.photoProf = matiere.photoProf;
        v.remarque = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        v.note = (Math.floor (Math.random () * 2)) ? null : Math.floor (Math.random () * 20);
        v.rendu = v.note !== null;
        return v;
    })
    writeFile ("./MOCK_DATA_PARSED.json", JSON.stringify (data_parsed, null, 0))
})
