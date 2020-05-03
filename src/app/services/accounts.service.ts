import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Account } from '../models/account';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(
    private api: HttpClient,
    private errorHandler: ErrorHandlerService,
    private toast: NbToastrService,
    private route: Router
  ) { }


  baseApiUrl = environment.apiRoute;

  header = new HttpHeaders(
    { Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  'Content-Type': 'application/json; charset=utf-8'});

  accounts = new BehaviorSubject<Account>(null);

  getAccounts() {

  }

}
