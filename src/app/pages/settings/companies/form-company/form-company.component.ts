
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
  img_url = null;

  constructor(
    private toast: NbToastrService,
    public dialogRef: MatDialogRef<FormClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyApi: CompaniesService
  ) { }

  ngOnInit(): void {
    if (this.data.action === 'edit') {
      Object.keys(this.data.company).forEach(key => {
        if (key === 'logo') {
          this.img_url = 'http://127.0.0.1:8001' + this.data.company[key];
        } else {
          this.newCompany[key] = this.data.company[key];
        }
      });
    }
  }
  onFileChanged(event) {
    console.log(event);
    const reader = new FileReader();
    reader.onload = (e) => {
      this.img_url = e.target.result;
      this.newCompany.logo = event.target.files[0];
    };
    reader.readAsDataURL(event.target.files[0]); // convert to base64 string
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
