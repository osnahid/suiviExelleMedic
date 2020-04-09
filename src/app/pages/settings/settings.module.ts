import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsComponent } from './settings.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CompaniesComponent } from './companies/companies.component';
import { MaterialsComponent } from './materials/materials.component';
import { SoftwaresComponent } from './softwares/softwares.component';
import { RouterModule, Routes } from '@angular/router';
import { NebularModule } from 'src/app/sharedModule/nebular/nebular.module';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { FormCompanyComponent } from './companies/form-company/form-company.component';
import { MaterialAngularModule } from 'src/app/sharedModule/material-angular/material-angular.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [

      {
        path: 'myAccount', component: MyaccountComponent
      },
      {
        path: '', redirectTo: 'myAccount', pathMatch: 'full'
      },
      {
        path: 'accounts', component: AccountsComponent
      },
      {
        path: 'partners', component: CompaniesComponent
      },
      {
        path: 'partners/:company_id/materials', component: MaterialsComponent
      },
      {
        path: 'partners/:company_id/softwares', component: SoftwaresComponent
      },
      {
        path: 'materials', component: MaterialsComponent
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
    FormsModule,
    SharedComponentsModule,
    MaterialAngularModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
    FormCompanyComponent
  ]
})
export class SettingsModule { }
