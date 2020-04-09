import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NebularModule } from '../sharedModule/nebular/nebular.module';
import { FormsModule } from '@angular/forms';
import { MaterialAngularModule } from '../sharedModule/material-angular/material-angular.module';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { NoDataComponent } from './no-data/no-data.component';
import { OsnPaginationComponent } from './osn-table/osn-pagination/osn-pagination.component';
import { OsnTableComponent } from './osn-table/osn-table.component';
import { OsnProductShowcaseComponent } from './osn-product-showcase/osn-product-showcase.component';



@NgModule({
  declarations: [
    OsnTableComponent,
    OsnPaginationComponent,
    NoDataComponent,
    ConfirmationModalComponent,
    OsnProductShowcaseComponent
  ],
  imports: [
    CommonModule,
    NebularModule,
    FormsModule,
    MaterialAngularModule,
  ],
  exports: [
    OsnTableComponent,
    OsnPaginationComponent,
    NoDataComponent,
    ConfirmationModalComponent
  ],
  entryComponents: [
    ConfirmationModalComponent,
  ]
})
export class SharedComponentsModule { }
