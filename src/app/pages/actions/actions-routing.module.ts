import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionsComponent } from './actions.component';
import { InstallationsComponent } from './installations/installations.component';
import { InterventionsComponent } from './interventions/interventions.component';
import { AddActionComponent } from './add-action/add-action.component';


const routes: Routes = [
  {
    path: '',
    component: ActionsComponent,
    children: [
      {
        path: 'installations',
        component: InstallationsComponent
      },
      {
        path: 'interventions',
        component: InterventionsComponent
      },
      {
        path: 'adding/:type',
        component: AddActionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsRoutingModule { }
