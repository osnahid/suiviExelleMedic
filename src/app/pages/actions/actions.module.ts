import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from './actions.component';
import { InstallationsComponent } from './installations/installations.component';
import { MaintenancesComponent } from './maintenances/maintenances.component';
import { InterventionsComponent } from './interventions/interventions.component';



@NgModule({
  declarations: [ActionsComponent, InstallationsComponent, MaintenancesComponent, InterventionsComponent],
  imports: [
    CommonModule
  ]
})
export class ActionsModule { }
