import { Component, OnInit } from '@angular/core';
import * as bcrypt from "bcryptjs";
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  pseudo?: String
  password?: String

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  register () {
    if (this.pseudo && this.password) {
      console.log (this.pseudo, this.password)
      const salt = bcrypt.genSaltSync(10);
      
      let hash = bcrypt.hashSync(this.password.toString (), salt);
      this.authService.register (this.pseudo, hash)
    }
  }
}
