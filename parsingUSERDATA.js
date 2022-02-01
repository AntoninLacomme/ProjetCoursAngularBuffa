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

const data = [{
    "name": "Lorens",
    "password": "$2a$10$A1Qkl4JGQqKeAHzj/sLWx.35DIORiqPGeDBeo6T7960NxrG2UmgVS"
  }, {
    "name": "Zeke",
    "password": "$2a$10$Ssn/pxj4YlOWLxyTQulK0.EwfvziEYYEp2ml9Vn3ayFwtIcaC1Fke"
  }, {
    "name": "Richie",
    "password": "$2a$10$m8q10xijvsiCFjx8FfYgFu1.EjEuhrshALBROZByoHrsvrM1jzs/y"
  }, {
    "name": "Reggie",
    "password": "$2a$10$s4TJ4vMkMaoi2GVyillaYeggG8xPJSShGJQi0bLP3RB6vg62F9BaO"
  }, {
    "name": "Bearnard",
    "password": "$2a$10$uulKuhw37oHkruhos88TNOAVX2b0q5XWqmh6PfdACESKNdup52wvW"
  }, {
    "name": "Sonny",
    "password": "$2a$10$xWK7ZDN5t.tdC4nrFY8/Uu5o6/C2JYSej1ZosYC36x9ioStc1Mw6C"
  }, {
    "name": "Ephrem",
    "password": "$2a$10$KO0OAym7yHtRwXoTxWWSE.6.tyLrcKed6T9boQ./ghocxnkI2kAIa"
  }, {
    "name": "Germaine",
    "password": "$2a$10$bwEe3y.JvsirdfNKz4fO1edaylHg9qZpmWV0VQ5qy7HjK/pD8L./a"
  }, {
    "name": "Garret",
    "password": "$2a$10$.I5GdNFkKRu5lKnFeuXZW..cX5/U4d53meX0mAzj0wmowMF/XD39i"
  }, {
    "name": "Udell",
    "password": "$2a$10$YPcXNMED/D0zAZ6C8pABzu.gWHWyw1Rd7aUi2ASWhmsHUHK7zNADC"
  }, {
    "name": "Myron",
    "password": "$2a$10$8v9522Ihbb6eWmR64IU9c.Q20simPgBy37L4fsXnlX2aMTU1czGMO"
  }, {
    "name": "Nicolai",
    "password": "$2a$10$Ao3rHvlkDpN1dHXtvcC0Ze2e6ulrtg24eHFK6yzQwxxcX9bsfewl2"
  }, {
    "name": "Boonie",
    "password": "$2a$10$ytpOBuFm4Bp0tg92zvukl.v/s.A00ONootii.RX55C0wHmS3ZGvpu"
  }, {
    "name": "Chick",
    "password": "$2a$10$eo80T0JGfXhHifxxw4DgE.qCrDMhY2wYlYtuJ/PRlMMKx/SYHpL3O"
  }, {
    "name": "Anthony",
    "password": "$2a$10$stUpG2swLJfViTV5Rv88Ou1e51idNAzjrP3vteg7f0nATqKdaDCkO"
  }, {
    "name": "Budd",
    "password": "$2a$10$7W0lPt1eYqIkJHU/E2v5A.kYGojm7p8MuVgCFfxrIwmsBGYgcn44."
  }, {
    "name": "Monte",
    "password": "$2a$10$QEBaZxpoAA7QE4LsaMZtk.dJy2KnKNw2YeTrnI0Viq3wqUzi1zNou"
  }, {
    "name": "Buddy",
    "password": "$2a$10$ZtkVnDxjB8rEi0qOlELwo.kqJtO4PYYqFLcISJFhATEwhgXiibYiy"
  }, {
    "name": "Sigismund",
    "password": "$2a$10$j/J/J/s.3fDNDBTWKDtouOrEw2pw.RyV8DxuPpug8kq/8dJqmIqnm"
  }, {
    "name": "Abbe",
    "password": "$2a$10$xmuVbnGxc5.okZIX0O3pQOgiEuDmWdm1cxHivJnWNi/XS9.7fdYOG"
  }];


writeFile ("./USER_PARSED_DATA.json", JSON.stringify (data, null, 0))