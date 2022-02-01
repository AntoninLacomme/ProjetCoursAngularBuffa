import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Application de gestion des devoirs à rendre !"
  pseudo? = "";

  constructor (private authService:AuthService, private router:Router) {
  }

  ngOnInit () {
    this.authService.logging ();
  }

  logging () {
    this.pseudo = this.authService.pseudo?.toString ();
    return this.authService.loggedIn;
  }

  logout () {
    this.authService.logOut ();
    this.authService.logging ();
  }
}
