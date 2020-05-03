import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Software } from '../models/software';
import { ErrorHandlerService } from './error-handler.service';
import { NbToastrService } from '@nebular/theme';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SoftwaresService {
  constructor(
    private api: HttpClient,
    private errorHandler: ErrorHandlerService,
    private toast: NbToastrService
  ) { }


  baseApiUrl = environment.apiRoute;

  header = new HttpHeaders(
    { Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  'Content-Type': 'application/json; charset=utf-8'});

  loader = new BehaviorSubject<boolean>(true);
  allSoftwares = new BehaviorSubject<Software[]>(null);
  softwaresByCompany = new BehaviorSubject<Software[]>(null);
  companyName = new BehaviorSubject<string>(null);

  getAllSoftwares() {
    this.loader.next(true);
    this.api.get<Software[]>(this.baseApiUrl + 'softwares', { headers: this.header}).pipe(map((softs: Software[]) => {
      softs.forEach(soft => {
        const img = String(soft.image);
        img.replace('\\', '/');
        console.log(img);

      });
      return softs;
    })).subscribe((success: Software[]) => {
      console.log(success);

      this.allSoftwares.next(success);
    },
    error => this.errorHandler.getErrorStatus(error),
    () => {
      this.loader.next(false);
    }
    );
  }

  getSoftwaresByCompany(company_id: number) {
    this.loader.next(true);
    this.api.get(this.baseApiUrl + 'companies/' + company_id + '/softwares', { headers: this.header}).pipe(map(object => {
      const softwares: Software[] = [];
      Object.keys(object).forEach(key => softwares.push(object[key]));
      return softwares;
    })).subscribe((success: Software[]) => {
      this.softwaresByCompany.next(success);
    },
    error => this.errorHandler.getErrorStatus(error),
    () => this.loader.next(false));
  }

  getFormDataFromObject(software: Software) {
    const formData: FormData = new FormData();

    Object.keys(software).forEach(key => {
      if ((software['image'] && key === 'image') || (key !== 'image' && software[key])) {
        formData.append(key, software[key]);
      }
    });

    return formData;
  }

  saveSoftware(software: Software) {
    this.loader.next(true);

    const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('accessToken')});
    headers.append('Content-Type', 'multipart/form-data');

    console.log(software);
    console.log(this.getFormDataFromObject(software));

    this.api.post(
    this.baseApiUrl + 'companies/' + software.company_id + '/softwares',
    this.getFormDataFromObject(software),
    {headers}).subscribe((success: any) => {
      this.toast.success('', success.status);
      this.actionToList('add', success.software);
    }, error => {
      this.errorHandler.getErrorStatus(error);
      this.loader.next(false);
    },
    () => this.loader.next(false));
  }

  editSoftware(software: Software) {
    this.loader.next(true);
    const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('accessToken')});
    headers.append('Content-Type', 'multipart/form-data');

    this.api.post(
    this.baseApiUrl + 'softwares/' + software.id,
    this.getFormDataFromObject(software),
    {headers}
    ).subscribe((success: any) => {
      this.toast.success('', success.status);
      this.actionToList('edit', success.software);
    }, error => this.errorHandler.getErrorStatus(error),
    () => this.loader.next(false));
  }

  deleteSoftware(software: Software) {
    this.loader.next(true);
    this.api.delete(this.baseApiUrl + 'softwares/' + software.id, { headers: this.header}).subscribe((success: any) => {
      this.toast.danger('', success.status);
      this.actionToList('delete', software);
    },
    error => this.errorHandler.getErrorStatus(error),
    () => this.loader.next(false));
  }


  actionToList(action: string, software: Software) {
    const fun = (softwares: Software[]) => {
      if (action === 'add') {
        softwares.push(software);
       } else if (action === 'edit') {
         const index = softwares.findIndex(mat => mat.id === software.id);
         softwares[index] = software;
       } else if (action === 'delete') {
         const index = softwares.findIndex(mat => mat.id === software.id);
         softwares.splice(index, 1);
       }
      return softwares;
    };
    if (this.allSoftwares.getValue() !== null) {
      const softwares = this.allSoftwares.getValue();
      this.allSoftwares.next(fun(softwares));
    }
    if (this.softwaresByCompany.getValue() !== null) {
      const softwares = this.softwaresByCompany.getValue();
      this.softwaresByCompany.next(fun(softwares));
    }
  }

}
