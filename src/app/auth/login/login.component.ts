import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Account } from 'src/app/models/account';
import { map } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  loading = false;
  user = new User();
  constructor(
    private authS: AuthService,
    private toast: NbToastrService
  ) { }

  ngOnInit() {
    const checkUser = this.authS.user.asObservable().subscribe(userIs => {
      if (userIs === null) {
        this.loading = false;
      } else {
        this.loading = true;
      }
    });

    this.subscriptions.push(checkUser);
  }

  ngOnDestroy() {
    this.loading = false;
    this.user = new User();
    this.subscriptions.forEach(subsc => subsc.unsubscribe());
  }

  login(form: any) {
    this.loading = !this.loading;
    if (form.valid) {
      this.authS.logMe(this.user.email, this.user.password);

    } else {
      this.toast.warning('', 'Verifiez les champs');
    }
  }
}
