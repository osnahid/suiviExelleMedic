import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: 'pages', pathMatch: 'full'
  },
  {
    path: 'pages',
    loadChildren : './pages/pages.module#PagesModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
