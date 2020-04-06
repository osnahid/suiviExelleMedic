import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NebularModule } from './sharedModule/nebular/nebular.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialAngularModule } from './sharedModule/material-angular/material-angular.module';
import { SharedComponentsModule } from './shared-components/shared-components.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NebularModule,
    HttpClientModule,
    SharedComponentsModule,
    AuthModule,
    MaterialAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
