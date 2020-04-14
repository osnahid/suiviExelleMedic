import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Software } from '../models/software';
import { ErrorHandlerService } from './error-handler.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SoftwaresService {

  constructor(
    private api: HttpClient,
    private errorHandler: ErrorHandlerService,
    private toast: NbToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  baseApiUrl = 'http://127.0.0.1:8001/api';
  header = new HttpHeaders(
    { Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  'Content-Type': 'application/json; charset=utf-8'});

  loader = new BehaviorSubject<boolean>(true);
  allsoftwares = new BehaviorSubject<Software[]>(null);
  softwaresByCompany = new BehaviorSubject<Software[]>(null);

  getAllsoftwares() {
    this.api.get(this.baseApiUrl + '/softwares', { headers: this.header}).subscribe((success: Software[]) => {
      console.log(success);
      this.allsoftwares.next(success);
    }, error => this.errorHandler.getErrorStatus(error),
    () => this.loader.next(false));
  }

  getsoftwaresByCompany(company_id: number) {
    this.api.get(this.baseApiUrl + 'companies/' + company_id + '/softwares', { headers: this.header}).subscribe((success: Software[]) => {
      console.log(success);
      this.allsoftwares.next(success);
    }, error => this.errorHandler.getErrorStatus(error),
    () => this.loader.next(false));
  }

  savesoftware(software: Software) {

    const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('accessToken')});
    headers.append('Content-Type', 'multipart/form-data');

    const formData: FormData = new FormData();

    Object.keys(software).forEach(key => {
      if ((software['image'] && key === 'image') || (key !== 'image' && software[key])) {
        formData.append(key, software[key]);
      }
    });
    this.api.post(this.baseApiUrl + 'companies/' + software.company_id + '/softwares', formData, {headers}).subscribe((success: any) => {
      this.toast.success('', success.status);
      // to figure out
      this.route.params.subscribe(params => {
        console.log(params);
      });
    }, error => this.errorHandler.getErrorStatus(error),
    () => this.loader.next(false));
  }

  editsoftware(software: Software) {

    const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('accessToken')});
    headers.append('Content-Type', 'multipart/form-data');

    const formData: FormData = new FormData();

    Object.keys(software).forEach(key => {
      if ((software['image'] && key === 'image') || (key !== 'image' && software[key])) {
        formData.append(key, software[key]);
      }
    });
    this.api.post(
    this.baseApiUrl + 'companies/' + software.company_id + '/softwares/' + software.id,
    formData,
    {headers}
    ).subscribe((success: any) => {
      this.toast.success('', success.status);
      // to figure out
      this.route.params.subscribe(params => {
        console.log(params);
      });
    }, error => this.errorHandler.getErrorStatus(error),
    () => this.loader.next(false));
  }

  deletesoftware(software_id: number) {
    this.api.delete(this.baseApiUrl + '/softwares/' + software_id, { headers: this.header}).subscribe((success: any) => {
      this.toast.danger('', success.status);
    }, error => this.errorHandler.getErrorStatus(error),
    () => this.loader.next(false));
  }
}
