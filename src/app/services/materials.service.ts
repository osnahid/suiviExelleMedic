import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Material } from '../models/material';
import { ErrorHandlerService } from './error-handler.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {
  constructor(
    private api: HttpClient,
    private errorHandler: ErrorHandlerService,
    private toast: NbToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  baseApiUrl = 'http://127.0.0.1:8001/api/';
  header = new HttpHeaders(
    { Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  'Content-Type': 'application/json; charset=utf-8'});

  allMaterials = new BehaviorSubject<Material[]>(null);
  materialsByCompany = new BehaviorSubject<Material[]>(null);

  getAllMaterials() {
    this.api.get(this.baseApiUrl + '/materials', { headers: this.header}).subscribe((success: Material[]) => {
      console.log(success);
      this.allMaterials.next(success);
    }, error => this.errorHandler.getErrorStatus(error));
  }

  getMaterialsByCompany(company_id: number) {
    this.api.get(this.baseApiUrl + 'companies/' + company_id + '/materials', { headers: this.header}).subscribe((success: Material[]) => {
      console.log(success);
      this.allMaterials.next(success);
    }, error => this.errorHandler.getErrorStatus(error));
  }

  saveMaterial(material: Material) {

    const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('accessToken')});
    headers.append('Content-Type', 'multipart/form-data');

    const formData: FormData = new FormData();

    Object.keys(material).forEach(key => {
      if ((material['image'] && key === 'image') || (key !== 'image' && material[key])) {
        formData.append(key, material[key]);
      }
    });
    this.api.post(this.baseApiUrl + 'companies/' + material.company_id + '/materials', formData, {headers}).subscribe((success: any) => {
      this.toast.success('', success.status);
      // to figure out
      this.route.params.subscribe(params => {
        console.log(params);
      });
    }, error => this.errorHandler.getErrorStatus(error));
  }

  editMaterial(material: Material) {

    const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('accessToken')});
    headers.append('Content-Type', 'multipart/form-data');

    const formData: FormData = new FormData();

    Object.keys(material).forEach(key => {
      if ((material['image'] && key === 'image') || (key !== 'image' && material[key])) {
        formData.append(key, material[key]);
      }
    });
    this.api.post(
    this.baseApiUrl + 'companies/' + material.company_id + '/materials/' + material.id,
    formData,
    {headers}
    ).subscribe((success: any) => {
      this.toast.success('', success.status);
      // to figure out
      this.route.params.subscribe(params => {
        console.log(params);
      });
    }, error => this.errorHandler.getErrorStatus(error));
  }

  deleteMaterial(material_id: number) {
    this.api.delete(this.baseApiUrl + '/materials/' + material_id, { headers: this.header}).subscribe((success: any) => {
      this.toast.danger('', success.status);
    }, error => this.errorHandler.getErrorStatus(error));
  }
}
