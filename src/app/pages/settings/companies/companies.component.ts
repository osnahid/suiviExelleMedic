import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompaniesService } from 'src/app/services/companies.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { Column } from 'src/app/shared-components/osn-table/column';
import { OsnTableConfig } from 'src/app/shared-components/osn-table/config';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

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
    this.companiesApi.companies.subscribe( (data: Company[]) => {
      if (data === null) {
        this.companiesApi.getCompanies();
      } else {
        this.companies = data;
        this.loading = false;
      }
    });
  }
  openAddModal() {

  }

  refresh() {

  }

  actionHandler(event) {

  }

}
