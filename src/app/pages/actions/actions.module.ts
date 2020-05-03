import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsRoutingModule } from './actions-routing.module';
import { ActionsComponent } from './actions.component';
import { InstallationsComponent } from './installations/installations.component';
import { InterventionsComponent } from './interventions/interventions.component';
import { AddActionComponent } from './add-action/add-action.component';
import { NebularModule } from 'src/app/sharedModule/nebular/nebular.module';
import { MaterialAngularModule } from 'src/app/sharedModule/material-angular/material-angular.module';
import { FormsModule } from '@angular/forms';
import { InformationsComponent } from './add-action/informations/informations.component';
import { SubscriptionComponent } from './add-action/subscription/subscription.component';
import { MatSoftComponent } from './add-action/mat-soft/mat-soft.component';
import { TasksComponent } from './add-action/tasks/tasks.component';


@NgModule({
  declarations: [
    ActionsComponent, InstallationsComponent, InterventionsComponent, AddActionComponent, InformationsComponent, SubscriptionComponent, MatSoftComponent, TasksComponent
  ],
  imports: [
    CommonModule,
    ActionsRoutingModule,
    FormsModule,
    NebularModule,
    MaterialAngularModule
  ]
})
export class ActionsModule { }
