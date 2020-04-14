import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialsService } from 'src/app/services/materials.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Material } from '../../../models/material';
import { Subscription } from 'rxjs';
import { OsnTableConfig } from 'src/app/shared-components/osn-table/config';
import { Areas } from 'src/app/shared-components/osn-product-showcase/column-showcase';
import { Column } from 'src/app/shared-components/osn-table/column';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormMaterialComponent } from './form-material/form-material.component';
import { ConfirmationModalComponent } from 'src/app/shared-components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit, OnDestroy {

  loading = true;

  materials: Material[] = [];

  subscirptions: Subscription[] = [];

  osnTableConfig: OsnTableConfig = {
    sortable: true,
    actions: [
      {
        action: 'edit',
        icon: 'edit-2-outline',
        status: 'info',
        toolTipIcon: 'edit-2',
        toolTipStatus: 'info',
        toolTipText: 'modifier ce client'
      },
      {
        action: 'delete',
        icon: 'trash-2-outline',
        status: 'danger',
        toolTipIcon: 'trash-2',
        toolTipStatus: 'danger',
        toolTipText: 'supprimer ce client'
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
        column: 'type',
        name: 'type',
        type: 'string'
      },
      {
        column: 'characteristics',
        name: 'caractéristiques',
        type: 'string'
      },
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

  modalConfig = new MatDialogConfig();
  constructor(
    private materialService: MaterialsService,
    private router: Router,
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
        subForMat = this.materialService.materialsByCompany.subscribe((success: Material[]) => {
          if (success === null) {
            this.materialService.getMaterialsByCompany(params.company_id);
            this.modalConfig.data['company_id'] = params.company_id;
          } else {
            this.materials = success;
          }
        });
      } else {
        subForMat = this.materialService.allMaterials.subscribe((success: Material[]) => {
          if (success === null) {
            this.materialService.getAllMaterials();
          } else {
            this.materials = success;
          }
        });
      }
    });
    this.subscirptions.push(this.materialService.loader.asObservable().subscribe(value => this.loading = value));
    this.subscirptions.push(subActR);
    this.subscirptions.push(subForMat);
  }

  ngOnDestroy() {
    this.subscirptions.forEach(sub => sub.unsubscribe());
    this.materialService.materialsByCompany.next(null);
  }

  actionHandler(event) {
    if (event.action === 'edit') {
      this.openEditModal(event.object);
    } else if (event.action === 'delete') {
      this.delete(event.object);
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
    this.dialog.open(FormMaterialComponent, this.modalConfig);
  }

  openEditModal(material: Material) {
    this.modalConfig.data['action'] = 'edit';
    this.modalConfig.data['material'] = material;
    this.modalConfig.width = this.responsive.getModelWidth();
    this.modalConfig.maxWidth = this.responsive.getModelWidth();
    if (this.responsive.getModelWidth() === '100vw') {
      this.modalConfig.height = '100vh';
    } else {
      this.modalConfig.height = null;
    }
    this.dialog.open(FormMaterialComponent, this.modalConfig);
  }

  refresh() {
    this.materialService.loader.next(true);
    this.materialService.allMaterials.next(null);
    this.materialService.materialsByCompany.next(null);
  }

  delete(material: Material) {
    if (material.id) {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        data: {
          confim: false,
          message: 'Êtes-vous sûr de vouloir supprimer ce produits ?'
        },
        width: '40vw'
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data === true) {
          this.materialService.deleteMaterial(material);
        }
      });
    }
  }
}
