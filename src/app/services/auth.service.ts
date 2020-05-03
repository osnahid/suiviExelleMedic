import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { NbToastrService } from '@nebular/theme';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '../../environments/environment';


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

  baseApiUrl = environment.apiRoute;


  constructor(
    private api: HttpClient,
    private toast: NbToastrService,
    private router: Router,
    private handlerErrors: ErrorHandlerService
  ) {

  }


  setHttpHeader() {
    const token = localStorage.getItem('accessToken');
    this.header = new HttpHeaders({ Authorization: 'Bearer ' + token, 'Content-Type': 'application/json; charset=utf-8'});
  }

  setUser(user) {
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  setUserFromLocalStorage() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
      this.logOut();
    } else {
      this.user.next(user);
    }
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
    this.api.post( this.baseApiUrl + 'login', {email, password}, {headers: this.headers} ).subscribe(
      (resp: any) => {
        this.toast.success('', 'welcome');

        localStorage.setItem('accessToken', resp.success.token);
        this.setUser(resp.success.user);
        this.router.navigate(['pages/dashboard']);


    }, error => {
      this.setUser(null);
      this.handlerErrors.getErrorStatus(error);
    }
  );
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('auth');
  }

}
