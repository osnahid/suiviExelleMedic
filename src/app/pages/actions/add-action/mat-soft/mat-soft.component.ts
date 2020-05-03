import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NbStepperComponent } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { Action } from 'src/app/models/action';
import { MaterialsService } from 'src/app/services/materials.service';
import { SoftwaresService } from 'src/app/services/softwares.service';
import { ActionService } from 'src/app/services/action.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { Material } from 'src/app/models/material';
import { Software } from 'src/app/models/software';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { FormSoftwareComponent } from 'src/app/pages/settings/softwares/form-software/form-software.component';
import { FormMaterialComponent } from 'src/app/pages/settings/materials/form-material/form-material.component';

@Component({
  selector: 'app-mat-soft',
  templateUrl: './mat-soft.component.html',
  styleUrls: ['./mat-soft.component.scss']
})
export class MatSoftComponent implements OnInit, OnChanges, OnDestroy {

  actionSub = new Subscription();
  subscriptions: Subscription[] = [];
  action = new Action();
  filterMateriels: Material[] = [];
  allMaterials: Material[] = [];
  filterSoftwares: Software[] = [];
  allSoftwares: Software[] = [];
  mobile = false;
  baseApiUrl = 'http://127.0.0.1:8001/';
  @Input() type: string;
  @Input() stepper: NbStepperComponent;

  constructor(
    private materialService: MaterialsService,
    private softwareService: SoftwaresService,
    private actionService: ActionService,
    private dialog: MatDialog,
    private responsive: ResponsiveService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.responsive.mobile.subscribe(mobile => this.mobile = mobile));
    this.subscriptions.push(this.materialService.allMaterials.subscribe(materials => {
      if (materials === null) {
        this.materialService.getAllMaterials();
      } else {
        this.allMaterials = materials;
        this.filterMateriels = materials;
      }
    }));
    this.subscriptions.push(this.softwareService.allSoftwares.subscribe(softwares => {
      if (softwares === null) {
        this.softwareService.getAllSoftwares();
      } else {
        this.allSoftwares = softwares;
        this.filterSoftwares = softwares;
      }
    }));
    if (this.type === 'installation') {
      this.actionSub = this.actionService.theNewInstallation.subscribe(newInstallation => {
        this.action = newInstallation;
      });
    } else if (this.type === 'intervention') {
      this.actionSub = this.actionService.theNewIntervention.subscribe(newIntervention => {
        this.action = newIntervention;
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.actionSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.type.previousValue) {

    }
  }

  onAdd(form) {

  }

  OpenAddModalMateriel() {
    const modalConfig = new MatDialogConfig();
    modalConfig.data = new Object();
    modalConfig.data['action'] = 'add';
    modalConfig.width = this.responsive.getModelWidth();
    modalConfig.maxWidth = this.responsive.getModelWidth();
    if (this.responsive.getModelWidth() === '100vw') {
      modalConfig.height = '100vh';
    } else {
      modalConfig.height = null;
    }
    this.dialog.open(FormMaterialComponent, modalConfig);
  }

  selectMateriel(event) {
    if (event.option.id === 0) {
      this.OpenAddModalMateriel();
    } else {
      this.action.material.material = this.allMaterials.find(cus => cus.id === event.option.id);
    }
  }

  filterAutoCompleteMaterial(event) {
    if (event.length > 0) {
      this.filterMateriels = this.allMaterials.filter(material => material.name.toLowerCase().includes(String(event).toLowerCase()));
      if (this.filterMateriels.length === 0) {
        const material = new Material();
        material.id = 0;
        material.name = 'aucun materiel n\'existe';
        this.filterMateriels.push(material);
      }
    } else {
      this.filterMateriels = this.allMaterials;
    }
  }

  filterAutoCompleteSoftware(event) {
    if (event.length > 0) {
      this.filterMateriels = this.allMaterials.filter(software => software.name.toLowerCase().includes(String(event).toLowerCase()));
      if (this.filterSoftwares.length === 0) {
        const software = new Software();
        software.id = 0;
        software.name = 'aucun logiciel n\'existe';
        this.filterSoftwares.push(software);
      }
    } else {
      this.filterSoftwares = this.allSoftwares;
    }
  }

  selectSoftware(event) {
    if (event.option.id === 0) {
      this.OpenAddModalSoftware();
    } else {
      this.action.software = this.allSoftwares.find(cus => cus.id === event.option.id);
    }
  }

  OpenAddModalSoftware() {
    const modalConfig = new MatDialogConfig();
    modalConfig.data = new Object();
    modalConfig.data['action'] = 'add';
    modalConfig.width = this.responsive.getModelWidth();
    modalConfig.maxWidth = this.responsive.getModelWidth();
    if (this.responsive.getModelWidth() === '100vw') {
      modalConfig.height = '100vh';
    } else {
      modalConfig.height = null;
    }
    this.dialog.open(FormSoftwareComponent, modalConfig);
  }

}
