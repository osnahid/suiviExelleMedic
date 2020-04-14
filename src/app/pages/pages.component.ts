import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { MENU_ITEMS } from '../models/menu';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ResponsiveService } from '../services/responsive.service';



@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  loading = false;
  constructor(
    private nbMenuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private responsive: ResponsiveService
    ) {

    }


  menu = MENU_ITEMS;
  mobile = true;

  ngOnInit(): void {
    this.loading = true;
    const sub = this.nbMenuService.onItemClick().subscribe((item: any) => {
      this.nbMenuService.collapseAll();
      if (this.mobile) {
        this.sidebarService.collapse('left');
      } else {
        this.sidebarService.compact('left');
      }
    });
    this.subscriptions.push(sub);
    const sub1 = this.responsive.mobile.asObservable().subscribe(value => {
      this.mobile = value;
    });
    this.subscriptions.push(sub1);

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  expand() {
    if (this.mobile) {
      this.sidebarService.collapse('left');
    } else {
      this.sidebarService.compact('left');
    }
  }
}
