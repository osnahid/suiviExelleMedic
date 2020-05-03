import { Injectable } from '@angular/core';
import { Action } from '../models/action';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  actions = new BehaviorSubject<Action[]>(null);
  private newInstallation = new BehaviorSubject<Action>(new Action());
  theNewInstallation = this.newInstallation.asObservable();
  private newIntervention = new BehaviorSubject<Action>(new Action());
  theNewIntervention = this.newIntervention.asObservable();


  constructor() { }

  setNewInstallation(installation: Action) {
    this.newInstallation.next(installation);
  }

  resetInstallation() {
    this.newInstallation.next(new Action());
  }

  setNewIntervention(intervention: Action) {
    this.newIntervention.next(intervention);
  }

  resetIntervention() {
    this.newIntervention.next(new Action());
  }
}
