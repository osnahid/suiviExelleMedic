import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { ClientsService } from 'src/app/services/clients.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';
import { Action } from 'src/app/models/action';
import { Subscription } from 'rxjs';
import { FormClientComponent } from 'src/app/pages/clients/form-client/form-client.component';
import { ActionService } from 'src/app/services/action.service';
import { User } from 'src/app/models/user';
import { NbStepperComponent } from '@nebular/theme';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent implements OnInit, OnChanges, OnDestroy {

  actionSub = new Subscription();
  subscriptions: Subscription[] = [];
  action = new Action();
  allCustomers: Customer[] = [];
  filterCustomers: Customer[] = [];
  account = new User();
  mobile = false;
  @Input() type: string;
  @Input() stepper: NbStepperComponent;

  constructor(
    private responsive: ResponsiveService,
    private clientService: ClientsService,
    private authS: AuthService,
    private dialog: MatDialog,
    private actionService: ActionService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.responsive.mobile.subscribe(mobile => this.mobile = mobile));
    this.subscriptions.push(this.authS.user.subscribe(user => {
      if (user === null) {
        this.authS.setUserFromLocalStorage();
      } else {
        this.account = user;
      }
    }));
    this.subscriptions.push(this.clientService.clients.subscribe(clients => {
      if (clients === null) {
        this.clientService.getClients();
      } else {
        this.allCustomers = clients;
        this.filterCustomers = clients;

      }
    }));
    this.subscriptions.push(this.clientService.selectedClient.subscribe(client => {
      if (client !== null) {
        this.selectClient({option: {id: client.id}});
      }
    }));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.type.previousValue) {
      if (this.type === 'installation' && this.type !==  changes.type.previousValue) {
        this.actionSub.unsubscribe();
        this.actionService.resetIntervention();
        this.actionSub = this.actionService.theNewInstallation.subscribe(newInstallation => {
          this.action = newInstallation;
        });
      } else if (this.type === 'intervention' && this.type !==  changes.type.previousValue) {
        this.actionSub.unsubscribe();
        this.actionService.resetInstallation();
        this.actionSub = this.actionService.theNewIntervention.subscribe(newIntervention => {
          this.action = newIntervention;
        });
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.actionSub.unsubscribe();
  }

  filterAutoCompleteClient(event) {
    if (event.length > 0) {
      this.filterCustomers = this.allCustomers.filter(customer => customer.name.toLowerCase().includes(String(event).toLowerCase()));
      if (this.filterCustomers.length === 0) {
        const customer = new Customer();
        customer.id = 0;
        customer.name = 'aucun client n\'existe';
        customer.phone = 'essayez d\'en ajouter un nouveau';
        this.filterCustomers.push(customer);
      }
    } else {
      this.filterCustomers = this.allCustomers;
    }
  }

  selectClient(event) {
    if (event.option.id === 0) {
      this.OpenAddModalCustomer();
    } else {
      this.action.client = this.allCustomers.find(cus => cus.id === event.option.id);
    }
  }

  onAdd(form) {
    if (form.valid) {
      this.action.account = this.account;
      if (this.type === 'intervention') {
        this.actionService.setNewIntervention(this.action);
      } else if (this.type === 'installation') {
        this.actionService.setNewInstallation(this.action);
      }
      this.stepper.next();
    }
  }



  OpenAddModalCustomer() {
    this.dialog.open(FormClientComponent, {
      data: {
        action: 'add',
      },
      width: this.responsive.getModelWidth()
    });
  }

}
