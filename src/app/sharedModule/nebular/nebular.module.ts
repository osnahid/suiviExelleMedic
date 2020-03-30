import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbThemeModule,
  NbLayoutModule,
  NbIconModule,
  NbActionsModule,
  NbUserModule,
  NbMenuModule,
  NbSidebarModule,
  NbSidebarService,
  NbCardModule,
  NbSpinnerModule,
  NbToastrModule,
  NbInputModule,
  NbAlertModule,
  NbSelectModule,
  NbContextMenuModule,
  NbRadioModule,
  NbDatepickerModule,
  NbButtonModule,
  NbToggleModule,
  NbTabsetModule,
  NbTooltipModule,
  NbListModule,
  NbCalendarModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NbToastrModule.forRoot({
      destroyByClick: true,
      hasIcon: true
    }),
    NbIconModule,
    NbActionsModule,
    NbUserModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbSidebarModule,
    NbInputModule,
    NbRadioModule,
    NbButtonModule,
    NbDatepickerModule,
    NbListModule,
    NbDatepickerModule.forRoot(),
    NbCardModule,
    NbAlertModule,
    NbSelectModule,
    NbToggleModule,
    NbSpinnerModule,
    NbTabsetModule,
    NbTooltipModule,
    NbCalendarModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule
  ],
  exports: [
    NbToastrModule,
    NbThemeModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbActionsModule,
    NbUserModule,
    NbMenuModule,
    NbContextMenuModule,
    NbSidebarModule,
    NbInputModule,
    NbRadioModule,
    NbButtonModule,
    NbDatepickerModule,
    NbDatepickerModule,
    NbCardModule,
    NbAlertModule,
    NbSelectModule,
    NbToggleModule,
    NbSpinnerModule,
    NbTabsetModule,
    NbTooltipModule,
    NbListModule,
    NbCalendarModule
  ],
  providers: [
    NbSidebarService,
  ]
})
export class NebularModule { }
