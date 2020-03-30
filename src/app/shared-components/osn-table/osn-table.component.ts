import { Component, OnInit, Input } from '@angular/core';
import { Column } from './column';

@Component({
  selector: 'app-osn-table',
  templateUrl: './osn-table.component.html',
  styleUrls: ['./osn-table.component.scss']
})
export class OsnTableComponent implements OnInit {

  @Input() data: any[];
  @Input() columns: Column[];
  @Input() config: any;

  constructor() { }

  ngOnInit(): void {
  }

}
