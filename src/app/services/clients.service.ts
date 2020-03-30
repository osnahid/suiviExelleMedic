import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../models/customer';
import { ErrorHandlerService } from './error-handler.service';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private api: HttpClient,
    private errorHandler: ErrorHandlerService,
    private toast: NbToastrService
  ) { }


  baseApiUrl = 'http://127.0.0.1:8001/api/';
  header = new HttpHeaders(
    { Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  'Content-Type': 'application/json; charset=utf-8'});

  clients = new BehaviorSubject<Customer[]>(null);

  getClients() {
    this.api.get(this.baseApiUrl + 'customers', {
      headers: this.header
    }).subscribe((success: Customer[]) => {
      console.log(success);
      this.clients.next(success);
    }, error => {
      this.errorHandler.getErrorStatus(error);

    });
  }

  deleteClient(id) {
    this.api.delete(this.baseApiUrl + 'customers/' + id, {
      headers: this.header
    }).subscribe((success) => {
      this.toast.success('', 'le client a été supprimé');
      this.getClients();
    }, error => {
      this.errorHandler.getErrorStatus(error);
    });
  }
}
