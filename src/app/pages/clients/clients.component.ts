import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { Customer } from 'src/app/models/customer';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared-components/confirmation-modal/confirmation-modal.component';
import { Column } from 'src/app/shared-components/osn-table/column';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {

  constructor(
    private clientService: ClientsService,
    private dialog: MatDialog,

  ) { }

  clients: Customer[] = [];
  columnsClients: Column[] =  [
    {column: 'name', name: 'nom', type: 'string'},
    {column: 'type', name: 'type', type: 'string'},
    {column: 'city', name: 'ville', type: 'string'},
    {column: 'phone', name: 'telephone', type: 'string'},
    {column: 'email', name: 'email', type: 'string'},
    {column: 'location', name: 'adresse', type: 'string'},
    {column: 'created_at', name: 'date de creation', type: 'date'},
  ];



  ngOnInit(): void {
    this.clientService.clients.subscribe(clients => {
      if (clients == null) {
        this.clientService.getClients();
      } else {
        this.clients = clients;
      }
    });
  }

  ngOnDestroy() {

  }

  applyFilter(filterValue: string) {
  }

  delete(customer: Customer, index) {
    if (customer.id) {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        data: {
          confim: false,
          message: 'Êtes-vous sûr de vouloir supprimer ce client ?'
        }
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data === true) {
          this.clientService.deleteClient(customer.id);
        }
      });
    }
  }
}
