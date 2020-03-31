import { Component, OnInit, Input } from '@angular/core';
import { Column } from './column';
import { OsnTableConfig } from './config';

@Component({
  selector: 'app-osn-table',
  templateUrl: './osn-table.component.html',
  styleUrls: ['./osn-table.component.scss']
})
export class OsnTableComponent implements OnInit {

  dataShowed: any[];
  _data: any[];
  @Input()
  public set data(dt: any[]) {
    this.dataShowed = dt.sort((a, b) => {
      if (a.created_at && b.created_at) {
        return a.created_at.getTime() - b.created_at.getTime();
      } else {
        return 0;
      }
    });
    this._data = dt;
  }

  @Input() columns: Column[];
  @Input() config: OsnTableConfig = null;

  constructor() { }

  ngOnInit(): void {
  }

  sort(column: Column) {
    this.columns.forEach(element => {
      if (element.name !== column.name) {
        element.sort = null;
      }
    });
    if (column.sort) {
      if (column.sort === 'ascending') {
        column.sort = 'descending';
        this.dataShowed = this._data.sort((a, b) => 0 - ((column.type === 'date') ? (new Date(b[column.column]).getTime() - new Date(a[column.column]).getTime()) : (a[column.column] > b[column.column] ? 1 : -1)));
      } else {
        column.sort = 'ascending';
        this.dataShowed = this._data.sort((a, b) => 0 - ((column.type === 'date') ? (new Date(a[column.column]).getTime() - new Date(b[column.column]).getTime()) : (a[column.column] > b[column.column] ? -1 : 1)));
      }

    } else {
      column.sort = 'ascending';
    }

  }

}
