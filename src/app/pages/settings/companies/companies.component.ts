import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompaniesService } from 'src/app/services/companies.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { Column } from 'src/app/shared-components/osn-table/column';
import { OsnTableConfig } from 'src/app/shared-components/osn-table/config';
import { FormCompanyComponent } from './form-company/form-company.component';
import { ConfirmationModalComponent } from 'src/app/shared-components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  loading = false;
  constructor(
    private companiesApi: CompaniesService,
    private dialog: MatDialog,
    private route: Router
  ) { }

  companies: Company[] = [];
  columnsCompanies: Column[] =  [
    {column: 'logo', name: 'logo', type: 'image'},
    {column: 'name', name: 'nom', type: 'string'},
    {column: 'location', name: 'adresse', type: 'string'},
    {column: 'phone', name: 'telephone', type: 'string'},
    {column: 'support_email', name: 'email', type: 'string'}
  ];
  osnTableConfig: OsnTableConfig = {
    sortable: true,
    actions: [
      {
        action: 'softwares',
        icon: 'browser-outline',
        status: 'primary',
        toolTipIcon: 'browser',
        toolTipStatus: 'primary',
        toolTipText: 'afficher les logiciels'
      },
      {
        action: 'materials',
        icon: 'cube-outline',
        status: 'success',
        toolTipIcon: 'cube',
        toolTipStatus: 'success',
        toolTipText: 'afficher les produits'
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
    const sub = this.companiesApi.companies.subscribe( (data: Company[]) => {
      if (data === null) {
        this.companiesApi.getCompanies();
      } else {
        this.companies = data;
        this.loading = false;
      }
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  openAddModal() {
    this.dialog.open(FormCompanyComponent, {
      data: {
        action: 'add'
      },
      width: '50vw'
    });
  }

  openEditModal(company: Company) {
    this.dialog.open(FormCompanyComponent, {
      data: {
        action: 'edit',
        company
      },
      width: '40vw'
    });
  }


  refresh() {
    this.companiesApi.getCompanies();
    this.loading = true;
  }

  actionHandler(event) {
    if (event.action === 'delete') {
      this.delete(event.object);
    } else if (event.action === 'edit') {
      this.openEditModal(event.object);
    }
  }

  delete(company: Company) {
    const confirm = this.dialog.open(ConfirmationModalComponent, {
      data: {
        confim: false,
        message: 'Êtes-vous sûr de vouloir supprimer ce partenaire ?'
      },
      width: '40vw'
    });
    confirm.afterClosed().subscribe(e => {
      if (e === true) {
        this.companiesApi.deleteCompany(company);

      }
    });
  }

}
