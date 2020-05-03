import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Column } from '../osn-table/column';
import { OsnTableConfig } from '../osn-table/config';
import { Areas } from './column-showcase';

@Component({
  selector: 'app-osn-product-showcase',
  templateUrl: './osn-product-showcase.component.html',
  styleUrls: ['./osn-product-showcase.component.scss']
})
export class OsnProductShowcaseComponent implements OnInit {

  dataShowed: any[];
  _data: any[];
  @Input()
  public set data(dt: any[]) {
    if (dt !== null) {
      this.dataShowed = dt.sort((a, b) => {
        if (a.created_at && b.created_at) {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        } else if (a.name) {
          return a.name.length - b.name.length;
        } else {
          return 0;
        }
      });
    }
    this._data = dt;
  }
  @Input() columns: Column[];
  @Input() areas: Areas;
  @Input() config: OsnTableConfig = null;


  @Output() action = new EventEmitter<{action: string, object: any}>();
  constructor() { }

  ngOnInit(): void {
  }

  actionEmitter(actionType) {
    this.action.emit(actionType);
  }

  sort(column: Column) {
    this.columns.forEach(col => col.sort === false);
    this.columns.find((col) => col.column === column.column).sort = true;
    this.dataShowed =
    this._data.sort((a, b) => 0 - ((column.type === 'date')
    ? (new Date(a[column.column]).getTime() - new Date(b[column.column]).getTime())
    : (a[column.column] > b[column.column] ? -1 : 1)));
  }

  applyFilter(filterValue: string) {
    if (filterValue.length === 0 || filterValue === null || !filterValue) {
     const sortedColumn = this.columns.find((column) => column.sort);
     if (sortedColumn) {
          this.sort(sortedColumn);
        } else {
          this.dataShowed = this._data;
        }
  } else {
      this.dataShowed = this._data.filter((data) => {
        let filterQ = false;
        for (const column of this.columns) {
          if (column.type === 'date') {
           filterQ = (
              ((new Date(data[column.column]).getDate().toString().length <= 1) ? '0' : '') +
                new Date(data[column.column]).getDate() + '/' +
              ((new Date(data[column.column]).getMonth().toString().length <= 1) ? '0' : '')
            + (new Date(data[column.column]).getMonth() + 1) + '/'
            + new Date(data[column.column]).getFullYear()
            ).includes(filterValue);
          } else {
            filterQ = String(data[column.column]).toLowerCase().includes(String(filterValue).toLowerCase());
          }
          if (filterQ) {
            break;
          }
        }
        return filterQ;
      });
    }
  }
}
