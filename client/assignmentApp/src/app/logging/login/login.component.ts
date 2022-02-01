import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pseudo?: string;
  password?: string;
  user?: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logging ();
  }

  login () {
    if (this.pseudo && this.password) {
      //const salt = bcrypt.genSaltSync(10);
      
      //bcrypt.hashSync(this.password, salt),
      this.authService.log (this.pseudo, this.password)
    }
  }
}
