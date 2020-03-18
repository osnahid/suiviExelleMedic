import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  rightSideBarCollapse = false;

  constructor(
    private sidebarService: NbSidebarService,
  ) { }

  ngOnInit(): void {
  }
  toggleSidebar() {
    if (this.rightSideBarCollapse) {
      this.sidebarService.collapse('right');
      this.rightSideBarCollapse = !this.rightSideBarCollapse;
    }
    this.sidebarService.toggle(true, 'left');
  }
}
