import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { NbToastrService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { Subscription, fromEventPattern } from 'rxjs';
import { Customer, Employee } from 'src/app/models/customer';
import { Column } from 'src/app/shared-components/osn-table/column';
import { OsnTableConfig } from 'src/app/shared-components/osn-table/config';
import { MatDialog } from '@angular/material/dialog';
import { FormClientComponent } from '../form-client/form-client.component';
import { FormEmployeComponent } from './form-employe/form-employe.component';
import { ConfirmationModalComponent } from 'src/app/shared-components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {

  subscribtions: Subscription[] = [];
  customer = new Customer();
  loading = false;
  columnsClients: Column[] =  [
    {column: 'name', name: 'nom', type: 'string'},
    {column: 'type', name: 'type', type: 'string'},
    {column: 'city', name: 'ville', type: 'string'},
    {column: 'phone', name: 'telephone', type: 'phone'},
    {column: 'email', name: 'email', type: 'string'},
    {column: 'location', name: 'adresse', type: 'string'},
  ];

  columnsEmploye: Column[] =  [
    {column: 'name', name: 'nom', type: 'string'},
    {column: 'type', name: 'type', type: 'string'},
    {column: 'phone', name: 'telephone', type: 'phone'},
    {column: 'email', name: 'email', type: 'string'},
  ];

  osnTableConfig: OsnTableConfig = {
    sortable: true,
    actions: [
      {
        action: 'edit',
        icon: 'edit-2-outline',
        status: 'info',
        toolTipIcon: 'edit-2',
        toolTipStatus: 'info',
        toolTipText: 'modifier cet employé'
      },
      {
        action: 'delete',
        icon: 'trash-2-outline',
        status: 'danger',
        toolTipIcon: 'trash-2',
        toolTipStatus: 'danger',
        toolTipText: 'supprimer cet employé'
      }
    ]
  };


  constructor(
    private clientsApi: ClientsService,
    private toast: NbToastrService,
    private router: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loading = true;
    const sub1 = this.router.params.subscribe(params => {
      if (params.client_id) {
        const sub = this.clientsApi.selectedClient.asObservable().subscribe((success: Customer) => {
          if (success === null) {
            this.clientsApi.getClient(params.client_id);
          } else {
            this.customer = success;
            this.loading = false;
          }
        });
        this.subscribtions.push(sub);
      }
    });
    this.subscribtions.push(sub1);
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach(sub => {
      sub.unsubscribe();
    });
    this.clientsApi.selectedClient.next(null);
  }

  actionHandler(event) {
    if (event.action === 'delete') {
      this.delete(event.object);
    } else if (event.action === 'edit') {
      this.dialog.open(FormEmployeComponent, {
        data: {
          action: 'edit',
          employee: event.object
        },
        width: '50vw'
      });
    }
  }

  delete(employe: Employee) {
    if (employe.id) {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        data: {
          confim: false,
          message: 'Êtes-vous sûr de vouloir supprimer cet employee ?'
        },
        width: '40vw'
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data === true) {
          this.clientsApi.deleteEmploye(employe.id);

        }
      });
    }
  }

  openEditModal() {
    this.dialog.open(FormClientComponent, {
      data: {
        action: 'edit',
        customer: this.customer
      },
      width: '50vw'
    });
  }

  openAddEmployeModal() {
    this.dialog.open(FormEmployeComponent, {
      data: {
        action: 'add',
        customer_id: this.customer.id
      },
      width: '50vw'
    });
  }
}
