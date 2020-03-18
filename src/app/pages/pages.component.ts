import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { MENU_ITEMS } from '../models/menu';



@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  loading = false;
  constructor(
    private nbMenuService: NbMenuService
  ) { }

  menu = MENU_ITEMS;


  ngOnInit(): void {
    this.loading = true;
  }
  expand() {
    this.nbMenuService.onItemClick().subscribe((item: any) => {

    });
  }
}
