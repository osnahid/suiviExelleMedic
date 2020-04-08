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

  addCompany(company: Company) {
    this.api.post(this.baseApiUrl + 'companies', company, {
      headers: this.header
    }).subscribe((success: any) => {
      this.toast.success('', success.status);
      const currentData = this.companies.getValue();
      currentData.push(success.company);
      this.companies.next(currentData);
    }, error => this.errorHandler.getErrorStatus(error));
  }

  editCompany(company: Company) {
    this.api.post(this.baseApiUrl + 'companies/' + company.id, company, {
      headers: this.header
    }).subscribe((success: any) => {
      this.toast.success('', success.status);
      const currentData = this.companies.getValue();
      const index = currentData.findIndex(comp => success.company.id === comp.id);
      currentData[index] = success.company;
      this.companies.next(currentData);
    }, error => this.errorHandler.getErrorStatus(error));
  }

  deleteCompany(company: Company) {
    this.api.delete(this.baseApiUrl + 'companies/' + company.id, {
      headers: this.header
    }).subscribe((success: any) => {
      this.toast.danger('', success.status);
      const currentData = this.companies.getValue();
      currentData.splice(currentData.findIndex(comp => comp.id === company.id), 1);
      this.companies.next(currentData);
    }, error => this.errorHandler.getErrorStatus(error));
  }
}
