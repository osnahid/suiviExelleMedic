import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from 'src/app/models/customer';
import { ClientsService } from 'src/app/services/clients.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-form-employe',
  templateUrl: './form-employe.component.html',
  styleUrls: ['./form-employe.component.scss']
})
export class FormEmployeComponent implements OnInit {

  newEmploye = new Employee();
  loading = false;
  constructor(
    private toast: NbToastrService,
    public dialogRef: MatDialogRef<FormEmployeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientApi: ClientsService
  ) { }

  ngOnInit(): void {
    if (this.data.action === 'edit') {
      Object.keys(this.newEmploye).forEach(key => {
        this.newEmploye[key] = this.data.employee[key];
      });
    }
  }

  onAdd(form) {
    this.loading = true;
    if (form !== undefined) {
      if (form.valid) {
        if (this.data.action === 'edit') {
          this.clientApi.editEmployee(this.newEmploye.customer_id, this.newEmploye);
        } else if (this.data.action === 'add') {
          this.clientApi.addEmployee(this.data.customer_id, this.newEmploye);
        }
        this.dialogRef.close();
      } else {
        this.toast.warning('', 'veuillez remplir tous les champs!');
        this.loading = false;
      }
    }
  }

}
