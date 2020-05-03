import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SoftwaresService } from 'src/app/services/softwares.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { Software } from 'src/app/models/software';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-form-software',
  templateUrl: './form-software.component.html',
  styleUrls: ['./form-software.component.scss']
})
export class FormSoftwareComponent implements OnInit, OnDestroy {


  loading = false;
  newSoftware = new Software();
  img_url = null;
  comapnies: Company[] = [];

  sub: Subscription;

  constructor(
    private toast: NbToastrService,
    public dialogRef: MatDialogRef<FormSoftwareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private SoftwareService: SoftwaresService,
    private companyService: CompaniesService
  ) { }

  ngOnInit(): void {
    if (this.data.action === 'edit' || this.data.action === 'copy') {
      Object.keys(this.data.software).forEach(key => {
        if (key === 'image') {
          this.img_url = this.data.software[key];
          if (this.data.action === 'copy') {
            this.newSoftware[key] = this.data.software[key];
          }
        } else {
          this.newSoftware[key] = this.data.software[key];
        }
      });
    }
    if (this.data.company_id) {
      this.newSoftware.company_id = this.data.company_id;
    } else {
      this.sub = this.companyService.companies.asObservable().subscribe(comp => {
        if (comp === null) {
          this.companyService.getCompanies();
        } else {
          this.comapnies = comp;
        }
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onFileChanged(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.img_url = e.target.result;
      this.newSoftware.image = event.target.files[0];
    };
    reader.readAsDataURL(event.target.files[0]); // convert to base64 string
  }

  onAdd(form) {
    this.loading = true;
    if (form !== undefined) {
      if (form.valid) {
        if (this.data.action === 'edit') {
          this.SoftwareService.editSoftware(this.newSoftware);
        } else if (this.data.action === 'add' || this.data.action === 'copy') {
          this.SoftwareService.saveSoftware(this.newSoftware);
        }
        this.dialogRef.close();
      } else {
        this.toast.warning('', 'veuillez remplir tous les champs!');
        this.loading = false;
      }
    }
  }


}
