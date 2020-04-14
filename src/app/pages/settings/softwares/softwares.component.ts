import { Component, OnInit, OnDestroy } from '@angular/core';
import { Software } from 'src/app/models/software';
import { Subscription } from 'rxjs';
import { OsnTableConfig } from 'src/app/shared-components/osn-table/config';
import { Areas } from 'src/app/shared-components/osn-product-showcase/column-showcase';
import { Column } from 'src/app/shared-components/osn-table/column';
import { SoftwaresService } from 'src/app/services/softwares.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private softwareService: SoftwaresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loading = true;
    let subForMat;
    const subActR = this.activeRoute.params.subscribe(params => {
      if (params.company_id) {
        subForMat = this.softwareService.softwaresByCompany.subscribe((success: Software[]) => {
          if (success === null) {
            this.softwareService.getsoftwaresByCompany(params.company_id);
          } else {
            this.softwares = success;
          }
        });
      } else {
        subForMat = this.softwareService.allsoftwares.subscribe((success: Software[]) => {
          if (success === null) {
            this.softwareService.getAllsoftwares();
          } else {
            this.softwares = success;
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
  }

  openAddModal() {

  }
  refresh() {
    this.softwareService.loader.next(true);
    this.softwareService.allsoftwares.next(null);
    this.softwareService.softwaresByCompany.next(null);
  }

  delete(software: Software) {
    this.softwareService.deletesoftware(software.id);
  }

}
