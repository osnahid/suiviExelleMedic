import { Component, OnInit, OnDestroy } from '@angular/core';
import { Software } from 'src/app/models/software';
import { Subscription } from 'rxjs';
import { OsnTableConfig } from 'src/app/shared-components/osn-table/config';
import { Areas } from 'src/app/shared-components/osn-product-showcase/column-showcase';
import { Column } from 'src/app/shared-components/osn-table/column';
import { SoftwaresService } from 'src/app/services/softwares.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationModalComponent } from 'src/app/shared-components/confirmation-modal/confirmation-modal.component';
import { FormSoftwareComponent } from './form-software/form-software.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-softwares',
  templateUrl: './softwares.component.html',
  styleUrls: ['./softwares.component.scss']
})
export class SoftwaresComponent implements OnInit, OnDestroy {

  loading = true;

  softwares: Software[] = [];

  subscirptions: Subscription[] = [];

  osnTableConfig: OsnTableConfig = {
    sortable: true,
    actions: [
      {
        action: 'copy',
        icon: 'copy-outline',
        status: 'warning',
        toolTipIcon: 'copy',
        toolTipStatus: 'warning',
        toolTipText: 'duplicate ce software'
      },
      {
        action: 'edit',
        icon: 'edit-2-outline',
        status: 'info',
        toolTipIcon: 'edit-2',
        toolTipStatus: 'info',
        toolTipText: 'modifier ce software'
      },
      {
        action: 'delete',
        icon: 'trash-2-outline',
        status: 'danger',
        toolTipIcon: 'trash-2',
        toolTipStatus: 'danger',
        toolTipText: 'supprimer ce software'
      }
    ]
  };

  areas: Areas = {
    image: {
      column: 'image',
      name: 'image',
      type: 'image'
    },
    title: {
      column: 'name',
      name: 'name',
      type: 'string'
    },
    info: [
      {
        column: 'company_name',
        name: 'manufacture',
        type: 'string'
      },
      {
        column: 'version',
        name: 'version',
        type: 'string'
      }
    ]
  };
  columnsForSort: Column[] = [
    {
      column: 'name',
      name: 'nom',
      type: 'string'
    },
    {
      column: 'type',
      name: 'type',
      type: 'string'
    },
    {
      column: 'company_name',
      name: 'manufacture',
      type: 'string'
    }
  ];
  companyName = null;
  modalConfig = new MatDialogConfig();
  constructor(
    private softwareService: SoftwaresService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private responsive: ResponsiveService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.modalConfig.data = new Object();
    let subForMat;
    const subActR = this.activeRoute.params.subscribe(params => {
      if (params.company_id) {
        subForMat = this.softwareService.softwaresByCompany.subscribe((success: Software[]) => {
          if (success === null) {
            this.softwareService.getSoftwaresByCompany(params.company_id);
            this.modalConfig.data['company_id'] = params.company_id;
            this.companyName = this.softwareService.companyName.getValue();
          } else {
            this.softwares = success;
          }
        });
      } else {
        subForMat = this.softwareService.allSoftwares.subscribe((success: Software[]) => {
          if (success === null) {
            this.softwareService.getAllSoftwares();
          } else {
            this.softwares = success;
            console.log(success);
            
          }
        });
      }
    });
    this.subscirptions.push(this.softwareService.loader.asObservable().subscribe(value => this.loading = value));
    this.subscirptions.push(subActR);
    this.subscirptions.push(subForMat);
  }

  ngOnDestroy() {
    this.subscirptions.forEach(sub => sub.unsubscribe());
    this.softwareService.softwaresByCompany.next(null);
  }

  actionHandler(event) {
    if (event.action === 'edit') {
      this.openEditModal(event.object);
    } else if (event.action === 'delete') {
      this.delete(event.object);
    } else if (event.action === 'copy') {
      this.openCopyModal(event.object);
    }
  }

  openAddModal() {
    this.modalConfig.data['action'] = 'add';
    this.modalConfig.width = this.responsive.getModelWidth();
    this.modalConfig.maxWidth = this.responsive.getModelWidth();
    if (this.responsive.getModelWidth() === '100vw') {
      this.modalConfig.height = '100vh';
    } else {
      this.modalConfig.height = null;
    }
    this.dialog.open(FormSoftwareComponent, this.modalConfig);
  }

  openEditModal(software: Software) {
    this.modalConfig.data['action'] = 'edit';
    this.modalConfig.data['software'] = software;
    this.modalConfig.width = this.responsive.getModelWidth();
    this.modalConfig.maxWidth = this.responsive.getModelWidth();
    if (this.responsive.getModelWidth() === '100vw') {
      this.modalConfig.height = '100vh';
    } else {
      this.modalConfig.height = null;
    }
    this.dialog.open(FormSoftwareComponent, this.modalConfig);
  }

  openCopyModal(software: Software) {
    this.modalConfig.data['action'] = 'copy';
    this.modalConfig.data['software'] = software;
    this.modalConfig.width = this.responsive.getModelWidth();
    this.modalConfig.maxWidth = this.responsive.getModelWidth();
    if (this.responsive.getModelWidth() === '100vw') {
      this.modalConfig.height = '100vh';
    } else {
      this.modalConfig.height = null;
    }
    this.dialog.open(FormSoftwareComponent, this.modalConfig);
  }

  refresh() {
    this.softwareService.loader.next(true);
    this.softwareService.allSoftwares.next(null);
    this.softwareService.softwaresByCompany.next(null);
  }

  delete(software: Software) {
    if (software.id) {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        data: {
          confim: false,
          message: 'Êtes-vous sûr de vouloir supprimer ce software ?'
        },
        width: '40vw'
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data === true) {
          this.softwareService.deleteSoftware(software);
        }
      });
    }
  }
}
