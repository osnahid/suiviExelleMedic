import { Component, OnInit, Inject } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent implements OnInit {
  loading = false;

  theNewCustomer = new Customer();

  constructor(
    private toast: NbToastrService,
    public dialogRef: MatDialogRef<FormClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientApi: ClientsService
  ) { }

  ngOnInit(): void {
  }

  onAdd(form) {
    this.loading = true;
    if (form !== undefined) {
      if (form.valid) {
        this.clientApi.addClient(this.theNewCustomer);
        this.dialogRef.close();
      } else {
        this.toast.warning('', 'veuillez remplir tous les champs!');
        this.loading = false;
      }
    }
  }
}
