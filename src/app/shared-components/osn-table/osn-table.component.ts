import { Component, OnInit, Input } from '@angular/core';
import { Column } from './column';

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
  @Input() config: any;

  constructor() { }

  ngOnInit(): void {
  }

}
