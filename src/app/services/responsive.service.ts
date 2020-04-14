import { Injectable } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  mobile = new BehaviorSubject<boolean>(true);

  constructor(
    private sidebarService: NbSidebarService,
    breakpointObserver: BreakpointObserver
    ) {
      breakpointObserver
    .observe(['(max-width: 700px)'])
    .subscribe(
      (state: BreakpointState) => {
        if (state.matches) {
          this.mobile.next(true);
          this.sidebarService.collapse('left');
        } else {
          this.mobile.next(false);
          this.sidebarService.compact('left');
        }
      }
    );
    }

    getModelWidth() {
      if (this.mobile.value) {
        return '100vw';
      } else {
        return '400px';
      }
    }




}
