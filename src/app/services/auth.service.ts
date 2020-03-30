import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged = new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject<User>(null);
  headers = new HttpHeaders({ 'Content-type': 'application/json'});
  header = new HttpHeaders(
    { Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  'Content-Type': 'application/json; charset=utf-8'});

  baseApiUrl = 'http://127.0.0.1:8001/api/';

  constructor(
    private api: HttpClient,
    private router: Router
  ) {

  }


  setHttpHeader() {
    const token = localStorage.getItem('accessToken');
    this.header = new HttpHeaders({ Authorization: 'Bearer ' + token, 'Content-Type': 'application/json; charset=utf-8'});
  }

  setUser(user) {
    this.user.next(user);
  }

  isAuthenticated(): boolean {

    if (localStorage.getItem('accessToken') === null) {
      this.router.navigateByUrl('auth');
    } else {
      this.setHttpHeader();
    }

    return localStorage.getItem('accessToken') !== null;
  }

  logMe(email, password) {
    return this.api.post( this.baseApiUrl + 'login', {email, password}, {headers: this.headers} );
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('auth');
  }

}
