import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';
import { NebularModule } from '../sharedModule/nebular/nebular.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared-components/header/header.component';
import { SettingsModule } from './settings/settings.module';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children : [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'settings', loadChildren: './settings/settings.module#SettingsModule'
      },
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NebularModule,
    SettingsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class PagesModule { }
