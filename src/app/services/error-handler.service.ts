import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toast: NbToastrService,
    private router: Router
  ) { }

  getErrorStatus(error: HttpErrorResponse) {
    if (error.statusText === 'Unauthorized') {
      this.toast.warning('your session has expired!', '401');
      this.router.navigate(['auth/login']);
    }
  }
}
