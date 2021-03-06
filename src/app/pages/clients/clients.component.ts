import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { Customer } from 'src/app/models/customer';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared-components/confirmation-modal/confirmation-modal.component';
import { Column } from 'src/app/shared-components/osn-table/column';
import { OsnTableConfig } from 'src/app/shared-components/osn-table/config';
import { Subscription } from 'rxjs';
import { FormClientComponent } from './form-client/form-client.component';
import { Router } from '@angular/router';
import { ResponsiveService } from 'src/app/services/responsive.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  loading = false;
  constructor(
    private clientService: ClientsService,
    private dialog: MatDialog,
    private route: Router,
    private responsive: ResponsiveService
  ) { }

  clients: Customer[] = [];
  columnsClients: Column[] =  [
    {column: 'name', name: 'nom', type: 'string'},
    {column: 'type', name: 'type', type: 'string'},
    {column: 'city', name: 'ville', type: 'string'},
    {column: 'phone', name: 'telephone', type: 'string'},
    {column: 'email', name: 'email', type: 'string'},
    {column: 'created_at', name: 'date de creation', type: 'date'},
  ];
  osnTableConfig: OsnTableConfig = {
    sortable: true,
    actions: [
      {
        action: 'show',
        icon: 'menu-outline',
        status: 'primary',
        toolTipIcon: 'menu',
        toolTipStatus: 'primary',
        toolTipText: 'afficher les details de client'
      },
      {
        action: 'edit',
        icon: 'edit-2-outline',
        status: 'info',
        toolTipIcon: 'edit-2',
        toolTipStatus: 'info',
        toolTipText: 'modifier ce client'
      },
      {
        action: 'delete',
        icon: 'trash-2-outline',
        status: 'danger',
        toolTipIcon: 'trash-2',
        toolTipStatus: 'danger',
        toolTipText: 'supprimer ce client'
      }
    ]
  };



  ngOnInit(): void {
    this.loading = true;
    const subscription = this.clientService.clients.subscribe(clients => {
      if (clients == null) {
        this.clientService.getClients();
      } else {
        this.clients = clients;
        this.loading = false;
      }
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => {
      subs.unsubscribe();
    });
  }

  refresh() {
    this.clientService.getClients();
    this.loading = true;
  }



  delete(customer: Customer) {
    if (customer.id) {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        data: {
          confim: false,
          message: 'Êtes-vous sûr de vouloir supprimer ce client ?'
        },
        width: this.responsive.getModelWidth()
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data === true) {
          this.clientService.deleteClient(customer.id);
        }
      });
    }
  }
  actionHandler(event) {
    if (event.action === 'edit') {
      this.openEditModal(event.object);
    } else if (event.action === 'delete') {
      this.delete(event.object);
    } else if (event.action === 'show') {
      this.route.navigate(['/pages/clients/', event.object.id]);
    }
  }

  openAddModal() {
    this.dialog.open(FormClientComponent, {
      data: {
        action: 'add',
      },
      width: '50vw'
    });
  }

  openEditModal(customer: Customer) {
    this.dialog.open(FormClientComponent, {
      data: {
        action: 'edit',
        customer
      },
      width: '50vw'
    });
  }


}
