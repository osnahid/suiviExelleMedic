import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { MENU_ITEMS } from '../models/menu';
import { Subscription } from 'rxjs';



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
    private sidebarService: NbSidebarService
  ) { }

  menu = MENU_ITEMS;


  ngOnInit(): void {
    this.loading = true;
    const sub = this.nbMenuService.onItemClick().subscribe((item: any) => {
      this.nbMenuService.collapseAll();
      this.sidebarService.compact('left');
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  expand() {
    // this.sidebarService.toggle(true, 'left');
    this.sidebarService.compact('left');

  }
}
