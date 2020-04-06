import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsComponent } from './settings.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CompaniesComponent } from './companies/companies.component';
import { MaterialsComponent } from './materials/materials.component';
import { SoftwaresComponent } from './softwares/softwares.component';
import { RouterModule, Routes } from '@angular/router';
import { OsnTableComponent } from 'src/app/shared-components/osn-table/osn-table.component';
import { NebularModule } from 'src/app/sharedModule/nebular/nebular.module';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { FormCompanyComponent } from './companies/form-company/form-company.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'settings/', redirectTo: 'myAccount', pathMatch: 'full'
      },
      {
        path: 'myAccount', component: MyaccountComponent
      },
      {
        path: 'accounts', component: AccountsComponent
      },
      {
        path: 'partners', component: CompaniesComponent
      },
      {
        path: 'materiels', component: MaterialsComponent
      },
      {
        path: 'softwares', component: SoftwaresComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    SettingsComponent,
    MyaccountComponent,
    AccountsComponent,
    CompaniesComponent,
    MaterialsComponent,
    SoftwaresComponent,
    FormCompanyComponent
  ],
  imports: [
    CommonModule,
    NebularModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SettingsModule { }
