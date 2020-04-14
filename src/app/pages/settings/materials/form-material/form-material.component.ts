import { Component, OnInit, Inject } from '@angular/core';
import { MaterialsService } from 'src/app/services/materials.service';
import { Material } from 'src/app/models/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-form-material',
  templateUrl: './form-material.component.html',
  styleUrls: ['./form-material.component.scss']
})
export class FormMaterialComponent implements OnInit {


  loading = false;
  newMaterial = new Material();
  img_url = null;

  constructor(
    private toast: NbToastrService,
    public dialogRef: MatDialogRef<FormMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private materialService: MaterialsService
  ) { }

  ngOnInit(): void {
    if (this.data.action === 'edit') {
      Object.keys(this.data.material).forEach(key => {
        if (key === 'image') {
          this.img_url = 'http://127.0.0.1:8001' + this.data.material[key];
        } else {
          this.newMaterial[key] = this.data.material[key];
        }
      });
    }
    this.newMaterial.company_id = this.data.company_id;
  }
  onFileChanged(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.img_url = e.target.result;
      this.newMaterial.image = event.target.files[0];
    };
    reader.readAsDataURL(event.target.files[0]); // convert to base64 string
  }

  onAdd(form) {
    this.loading = true;
    if (form !== undefined) {
      if (form.valid) {
        if (this.data.action === 'edit') {
          this.materialService.editMaterial(this.newMaterial);
        } else if (this.data.action === 'add') {
          this.materialService.saveMaterial(this.newMaterial);
        }
        this.dialogRef.close();
      } else {
        this.toast.warning('', 'veuillez remplir tous les champs!');
        this.loading = false;
      }
    }
  }

}
