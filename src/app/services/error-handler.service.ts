import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toast: NbToastrService,
    private router: Router
  ) { }

  getErrorStatus(error: HttpErrorResponse) {
    // if (error.statusText === 'Unauthorized') {
    //   this.toast.warning('your session has expired!', '401');
    //   this.router.navigate(['auth/login']);
    // }
    console.log(error);
    if (error.error) {
      Object.keys(error.error).forEach(key => {
        this.toast.warning((typeof error.error[key] === 'object')? error.error[key][0] : error.error[key], key);
      });
    }
  }
}

