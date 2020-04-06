import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(
    private api: HttpClient,
    private errorHandler: ErrorHandlerService,
    private toast: NbToastrService,
    private route: Router
  ) { }


  baseApiUrl = 'http://127.0.0.1:8001/api/';
  header = new HttpHeaders(
    { Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  'Content-Type': 'application/json; charset=utf-8'});

  companies = new BehaviorSubject<Company[]>(null);


  getCompanies() {
    this.api.get(this.baseApiUrl + 'companies', {
      headers: this.header
    }).subscribe((success: Company[]) => {
      this.companies.next(success);
    }, error => {
      this.errorHandler.getErrorStatus(error);
    });
  }
}
