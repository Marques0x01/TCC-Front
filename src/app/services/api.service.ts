import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserLogin, UserRegister } from '../models/user/user';
import { environment } from '../../environments/environment.dev';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  // Http Headers
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  Register(user: UserRegister) {
    return this.http.post(this.baseUrl + '/auth/signup', user);
  }

  Login(user: UserLogin) {
    return this.http.post(this.baseUrl + '/auth/signin', user);
  }

  Logout(){
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }

  GetAllUsers(){
    return this.http.get(this.baseUrl + '/users');
  }
}
