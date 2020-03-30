import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import {MatDialogModule} from '@angular/material/dialog';





@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    CommonModule,
    MatMenuModule,
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatMenuModule,
  ]
})
export class MaterialAngularModule { }
