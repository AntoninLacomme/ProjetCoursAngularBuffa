import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs'
import { LoggingService } from './logging.service';
import { url } from './data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "api/user"

  constructor(private loggingService: LoggingService, private http:HttpClient) {
    this.url = url + this.url;
   }

  getUser (name: String, passwordNotHash: String): Observable<User | undefined> {
    return this.http.get<User> (this.url + "?name=" + name + "&password=" + passwordNotHash);
  }

  postUser (pseudo: String, password: String): Observable<any> {
    let user = new User ();
    user.name = pseudo;
    user.password = password;
    console.log (user, this.url);
    
    return this.http.post<User> (this.url, user)
	}

}
