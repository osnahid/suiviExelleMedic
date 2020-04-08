import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';
import { NebularModule } from '../sharedModule/nebular/nebular.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared-components/header/header.component';

import { ListLastestInstallationComponent } from './dashboard/list-lastest-installation/list-lastest-installation.component';
import { ListSoonExpiredSubscriptionComponent } from './dashboard/list-soon-expired-subscription/list-soon-expired-subscription.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { MaterialAngularModule } from '../sharedModule/material-angular/material-angular.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormClientComponent } from './clients/form-client/form-client.component';
import { FormsModule } from '@angular/forms';
import { FormEmployeComponent } from './clients/client/form-employe/form-employe.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { SettingsModule } from './settings/settings.module';

const routes: Routes = [

  {
    path: '',
    component: PagesComponent,
    children : [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'clients',
        component: ClientsComponent
      },
      {
        path: 'clients/:client_id',
        component: ClientComponent
      },
      {
        path: 'subscriptions',
        component: SubscriptionsComponent
      }
    ]
  },

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
    FormClientComponent,
    FormEmployeComponent,
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
    FormClientComponent,
    FormEmployeComponent,
  ]
})
export class PagesModule { }
