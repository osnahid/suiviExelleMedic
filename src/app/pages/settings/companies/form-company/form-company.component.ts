import { Component, OnInit, Inject } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormClientComponent } from 'src/app/pages/clients/form-client/form-client.component';
import { CompaniesService } from 'src/app/services/companies.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.scss']
})
export class FormCompanyComponent implements OnInit {

  loading = false;
  newCompany = new Company();
  constructor(
    private toast: NbToastrService,
    public dialogRef: MatDialogRef<FormClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyApi: CompaniesService
  ) { }

  ngOnInit(): void {
    if (this.data.action === 'edit') {
      Object.keys(this.data.company).forEach(key => {
        this.newCompany[key] = this.data.company[key];
      });
    }
  }
  onFileChanged(event) {

  }

  onAdd(form) {
    this.loading = true;
    if (form !== undefined) {
      if (form.valid) {
        if (this.data.action === 'edit') {
          this.companyApi.editCompany(this.newCompany);
        } else if (this.data.action === 'add') {
          this.companyApi.addCompany(this.newCompany);
        }
        this.dialogRef.close();
      } else {
        this.toast.warning('', 'veuillez remplir tous les champs!');
        this.loading = false;
      }
    }
  }


}
