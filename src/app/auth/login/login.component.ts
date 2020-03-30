import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Account } from 'src/app/models/account';
import { map } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loading = false;
  user = new User();
  constructor(
    private authS: AuthService,
    private toast: NbToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.loading = false;
    this.user = new User();
  }

  login(form: any) {
    this.loading = !this.loading;
    if (form.valid) {
      this.authS.logMe(this.user.email, this.user.password).subscribe(
        (resp: any) => {
          // save access token in local storage
          this.toast.success('', resp.success.user.name);

          localStorage.setItem('accessToken', resp.success.token);
          this.authS.setUser(resp.success.user);
          console.log(resp.success.user.name);
          this.router.navigate(['pages/dashboard']);


      }, error => {
        this.toast.danger('', 'L\'email ou le mot de passe sont incorrectes');
        this.loading = !this.loading;
      }
    );
    } else {
      this.toast.warning('', 'Verifiez les champs');
    }
  }
}
