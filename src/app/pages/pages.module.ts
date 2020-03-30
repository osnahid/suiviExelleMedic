import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';
import { NebularModule } from '../sharedModule/nebular/nebular.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared-components/header/header.component';
import { ConfirmationModalComponent } from '../shared-components/confirmation-modal/confirmation-modal.component';
import { OsnTableComponent } from '../shared-components/osn-table/osn-table.component';

import { ListLastestInstallationComponent } from './dashboard/list-lastest-installation/list-lastest-installation.component';
import { ListSoonExpiredSubscriptionComponent } from './dashboard/list-soon-expired-subscription/list-soon-expired-subscription.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { MaterialAngularModule } from '../sharedModule/material-angular/material-angular.module';
import { MatDialogModule } from '@angular/material/dialog';

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
        path: 'clients', component: ClientsComponent
      },
      {
        path: 'clients/:client_id', component: ClientComponent
      },
      {
        path: 'subscriptions', component: SubscriptionsComponent
      },
      {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    HeaderComponent,
    ListLastestInstallationComponent,
    ListSoonExpiredSubscriptionComponent,
    ClientsComponent,
    ClientComponent,
    ConfirmationModalComponent,
    OsnTableComponent
  ],
  imports: [
    CommonModule,
    NebularModule,
    MaterialAngularModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
    ConfirmationModalComponent
  ]
})
export class PagesModule { }
