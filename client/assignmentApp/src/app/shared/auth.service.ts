import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = true;

  constructor() { }


  // appelé quand on rempli le formualire login / password
  logIn () {
    this.loggedIn = true
    console.log (this.loggedIn)
  }

  // appelé par un bouton de déconnexion
  logOut () {
    this.loggedIn = false;
    console.log (this.loggedIn)
  }

  isAdmin () {
    const isUserAdmin = new Promise ((resolve, reject) => {
      resolve (this.loggedIn);
    })

    return isUserAdmin;
  }
}
