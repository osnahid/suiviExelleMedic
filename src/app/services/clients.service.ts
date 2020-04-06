import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Customer, Employee } from '../models/customer';
import { ErrorHandlerService } from './error-handler.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

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

  clients = new BehaviorSubject<Customer[]>(null);
  selectedClient = new BehaviorSubject<Customer>(null);

  getClients() {
    this.api.get(this.baseApiUrl + 'customers', {
      headers: this.header
    }).subscribe((success: Customer[]) => {
      this.clients.next(success);
    }, error => {
      this.errorHandler.getErrorStatus(error);

    });
  }

  getClient(id) {
    this.api.get(this.baseApiUrl + 'customers/' + id, {
      headers: this.header
    }).subscribe((client: Customer) => {
      this.selectedClient.next(client);
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

  addClient(customer: Customer) {
    this.api.post(this.baseApiUrl + 'customers/', customer, {headers: this.header}).subscribe((success: any) => {
      this.toast.success('', success.status);
      const data = this.clients.getValue();
      data.push(success.customer);
      this.clients.next(data);
      this.selectedClient.next(success.customer);
      this.route.navigate(['/pages/clients/', success.customer.id]);
    }, error => {
      console.log(error);
      this.errorHandler.getErrorStatus(error);
    });
  }

  editClient(customer: Customer) {
    this.api.post(this.baseApiUrl + 'customers/' + customer.id, customer, {headers: this.header}).subscribe((success: any) => {
      this.toast.success('', success.status);
      this.selectedClient.next(success.customer);
      const data = this.clients.getValue();
      data[data.findIndex(customerE => {
        return customerE.id === success.customer.id;
      })] = success.customer;
      this.clients.next(data);
      this.route.navigate(['/pages/clients/', success.customer.id]);
    }, error => {
      this.errorHandler.getErrorStatus(error);
    });
  }


  addEmployee(customer_id: number, Employee: Employee) {
    this.api.post(this.baseApiUrl + 'customers/' + customer_id + '/employees', Employee, {headers: this.header})
    .subscribe((success: any) => {
      this.toast.success('', success.status);
      const currentClient = this.selectedClient.getValue();
      currentClient.employees.push(success.employe);
      this.selectedClient.next(currentClient);
    }, error => {
      this.errorHandler.getErrorStatus(error);
    });
  }

  editEmployee(customer_id: number, employee: Employee) {
    this.api.post(this.baseApiUrl + 'customers/' + customer_id + '/employees/' + employee.id, employee, {headers: this.header})
    .subscribe((success: any) => {
      this.toast.success('', success.status);
      const currentClient = this.selectedClient.getValue();
      currentClient.employees[currentClient.employees.findIndex(empl => empl.id === success.employe.id)] = success.employe;
      this.selectedClient.next(currentClient);
    }, error => {
      console.log(error);

      this.errorHandler.getErrorStatus(error);
    });
  }

  deleteEmploye(employe_id: number) {
    this.api.delete(this.baseApiUrl + 'employees/' + employe_id, {
      headers: this.header
    }).subscribe((success: any) => {
      this.toast.success('', success.status);
      const currentClient = this.selectedClient.getValue();
      currentClient.employees.splice(currentClient.employees.findIndex(empl => empl.id === employe_id) , 1);
      this.selectedClient.next(currentClient);
    }, error => {
      this.errorHandler.getErrorStatus(error);
    });
  }
}
