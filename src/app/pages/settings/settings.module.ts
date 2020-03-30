import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CompaniesComponent } from './companies/companies.component';
import { MaterialsComponent } from './materials/materials.component';
import { SoftwaresComponent } from './softwares/softwares.component';


@NgModule({
  declarations: [SettingsComponent, MyaccountComponent, AccountsComponent, CompaniesComponent, MaterialsComponent, SoftwaresComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
