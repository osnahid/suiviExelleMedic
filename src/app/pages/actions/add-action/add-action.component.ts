import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, DoCheck, ViewChild, AfterViewInit } from '@angular/core';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Action } from 'src/app/models/action';
import { ClientsService } from 'src/app/services/clients.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared-components/confirmation-modal/confirmation-modal.component';
import { Customer } from 'src/app/models/customer';
import { FormClientComponent } from '../../clients/form-client/form-client.component';
import { ActionService } from 'src/app/services/action.service';
import { NbStepperComponent } from '@nebular/theme';


@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.scss']
})
export class AddActionComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('stepper') nbStepper: NbStepperComponent;
  mobile = false;
  subscriptions: Subscription[] = [];
  action = new Action();
  actionSub = new Subscription();
  stepControl = {valid: true, reset: () => {}};
  type = '';
  constructor(
    private responsive: ResponsiveService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private actionService: ActionService
  ) { }




  ngOnInit(): void {
    this.subscriptions.push(this.responsive.mobile.asObservable().subscribe(mobile => this.mobile = mobile));
  }

  ngAfterViewInit() {
    this.subscriptions.push(this.router.params.subscribe(params => {
      this.type = params.type;
      if (this.type === 'installation') {
        this.actionSub = this.actionService.theNewInstallation.subscribe(newInstallation => {
          this.action = newInstallation;
        });
      } else if (this.type === 'intervention') {
        this.actionSub = this.actionService.theNewIntervention.subscribe(newIntervention => {
          this.action = newIntervention;
        });
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }



}
