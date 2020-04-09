import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  subscriptions: Subscription[] = [];
  loading = false;
  user = new User();

  constructor(
    private authS: AuthService,
    private toast: NbToastrService
  ) { }

  ngOnInit(): void {
  }

}
