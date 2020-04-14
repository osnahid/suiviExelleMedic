import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Material } from '../models/material';
import { ErrorHandlerService } from './error-handler.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

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


  baseApiUrl = 'http://127.0.0.1:8001/api';
  header = new HttpHeaders(
    { Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  'Content-Type': 'application/json; charset=utf-8'});

  loader = new BehaviorSubject<boolean>(true);
  allMaterials = new BehaviorSubject<Material[]>(null);
  materialsByCompany = new BehaviorSubject<Material[]>(null);

  getAllMaterials() {
    this.loader.next(true);
    this.api.get(this.baseApiUrl + '/materials', { headers: this.header}).subscribe((success: Material[]) => {
      this.allMaterials.next(success);
    },
    error => this.errorHandler.getErrorStatus(error),
    () => {
      this.loader.next(false);
    }
    );
  }

  getMaterialsByCompany(company_id: number) {
    this.loader.next(true);
    this.api.get(this.baseApiUrl + '/companies/' + company_id + '/materials', { headers: this.header}).pipe(map(object => {
      const materials: Material[] = [];
      Object.keys(object).forEach(key => materials.push(object[key]));
      return materials;
    })).subscribe((success: Material[]) => {
      this.materialsByCompany.next(success);
    },
    error => this.errorHandler.getErrorStatus(error),
    () => this.loader.next(false));
  }

  getFormDataFromObject(material: Material) {
    const formData: FormData = new FormData();

    Object.keys(material).forEach(key => {
      if ((material['image'] && key === 'image') || (key !== 'image' && material[key])) {
        formData.append(key, material[key]);
      }
    });

    return formData;
  }

  saveMaterial(material: Material) {
    this.loader.next(true);

    const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('accessToken')});
    headers.append('Content-Type', 'multipart/form-data');


    this.api.post(
    this.baseApiUrl + '/companies/' + material.company_id + '/materials',
    this.getFormDataFromObject(material),
    {headers}).subscribe((success: any) => {
      this.toast.success('', success.status);
      this.actionToList('add', success.material);
    }, error => {
      this.errorHandler.getErrorStatus(error);
      this.loader.next(false);
    },
    () => this.loader.next(false));
  }

  editMaterial(material: Material) {
    this.loader.next(true);
    const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('accessToken')});
    headers.append('Content-Type', 'multipart/form-data');

    this.api.post(
    this.baseApiUrl + '/companies/' + material.company_id + '/materials/' + material.id,
    this.getFormDataFromObject(material),
    {headers}
    ).subscribe((success: any) => {
      this.toast.success('', success.status);
      this.actionToList('edit', success.material);
    }, error => this.errorHandler.getErrorStatus(error),
    () => this.loader.next(false));
  }

  deleteMaterial(material: Material) {
    this.loader.next(true);
    this.api.delete(this.baseApiUrl + '/materials/' + material.id, { headers: this.header}).subscribe((success: any) => {
      this.toast.danger('', success.status);
      this.actionToList('delete', material);
    },
    error => this.errorHandler.getErrorStatus(error),
    () => this.loader.next(false));
  }


  actionToList(action: string, material: Material) {
    if (this.allMaterials.getValue() !== null) {
      const materials = this.allMaterials.getValue();
      if (action === 'add') {
       materials.push(material);
      } else if (action === 'edit') {
        const index = materials.findIndex(mat => mat.id === material.id);
        materials[index] = material;
      } else if (action === 'delete') {
        const index = materials.findIndex(mat => mat.id === material.id);
        materials.splice(index, 1);
      }
      this.allMaterials.next(materials);
    }
    if (this.materialsByCompany.getValue() !== null) {
      const materials = this.materialsByCompany.getValue();
      if (action === 'add') {
       materials.push(material);
      } else if (action === 'edit') {
        const index = materials.findIndex(mat => mat.id === material.id);
        materials[index] = material;
      } else if (action === 'delete') {
        const index = materials.findIndex(mat => mat.id === material.id);
        materials.splice(index, 1);
      }
      this.materialsByCompany.next(materials);
    }
  }
}
