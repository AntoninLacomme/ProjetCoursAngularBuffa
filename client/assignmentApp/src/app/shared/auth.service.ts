import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import * as bcrypt from "bcryptjs";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  pseudo? : String;

  constructor(private router:Router,
    private userService: UserService) { }

  // appelé quand on rempli le formualire login / password
  logIn () {
    this.loggedIn = true
  }

  // appelé par un bouton de déconnexion
  logOut () {
    this.loggedIn = false;
  }

  isAdmin () {
    const isUserAdmin = new Promise ((resolve, reject) => {
      resolve (this.loggedIn);
    })

    return isUserAdmin;
  }

  logging () {
    if (!this.loggedIn) { this.router.navigate (["logging/login"]); }
  }

  log (pseudo: String, passwordNotHash: string) {
    this.pseudo = pseudo;
    this.userService.getUser (pseudo).subscribe (user => {
      if (user && user.password) {
        this.loggedIn = bcrypt.compareSync (passwordNotHash, user.password.toString ())
        if (this.loggedIn) {
          this.router.navigate (["home"]);
        }
      }
    })
  }

  register (pseudo: String, passwordHash: String) {
    this.userService.postUser (pseudo, passwordHash).subscribe (mess => { 
      if (mess.saved) {
        this.router.navigate (["home"]);
      }
    });
  }

  
}
