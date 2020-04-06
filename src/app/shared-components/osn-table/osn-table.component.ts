import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Column } from './column';
import { OsnTableConfig } from './config';

@Component({
  selector: 'app-osn-table',
  templateUrl: './osn-table.component.html',
  styleUrls: ['./osn-table.component.scss']
})
export class OsnTableComponent implements OnInit {

  sliceFirst = 0;
  sliceEnd = 5;
  dataShowed: any[];
  _data: any[];
  @Input()
  public set data(dt: any[]) {
    this.dataShowed = dt.sort((a, b) => {
      if (a.created_at && b.created_at) {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (a.name) {
        return a.name.length - b.name.length;
      } else {
        return 0;
      }
    });
    this._data = dt;
  }

  @Input() columns: Column[];
  @Input() config: OsnTableConfig = null;

  @Output() action = new EventEmitter<{action: string, object: any}>();

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
      if (column.sort === 'descending') {
        column.sort = 'ascending';
        this.dataShowed = this._data.sort((a, b) => 0 - ((column.type === 'date') ? (new Date(b[column.column]).getTime() - new Date(a[column.column]).getTime()) : (a[column.column] > b[column.column] ? 1 : -1)));
      } else {
        column.sort = 'descending';
        this.dataShowed = this._data.sort((a, b) => 0 - ((column.type === 'date') ? (new Date(a[column.column]).getTime() - new Date(b[column.column]).getTime()) : (a[column.column] > b[column.column] ? -1 : 1)));
      }

    } else {
      column.sort = 'descending';
      this.dataShowed = this._data.sort((a, b) => 0 - ((column.type === 'date') ? (new Date(a[column.column]).getTime() - new Date(b[column.column]).getTime()) : (a[column.column] > b[column.column] ? -1 : 1)));
    }

  }

  paginate(event) {
    this.sliceFirst = event.sliceFirst;
    this.sliceEnd = event.sliceEnd;
  }

  actionEmitter(actionType) {
    this.action.emit(actionType);
  }


  applyFilter(filterValue: string) {
    if (filterValue.length === 0 || filterValue === null || !filterValue) {
     const sortedColumn = this.columns.find((column) => {
        if (column.sort) {
          if (column.sort === 'ascending') {
            column.sort = 'descending';
          } else {
            column.sort = 'ascending';
          }
          return true;
        } else {
          return false;
        }
      });
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
