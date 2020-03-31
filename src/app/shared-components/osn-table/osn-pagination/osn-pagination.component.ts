import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-osn-pagination',
  templateUrl: './osn-pagination.component.html',
  styleUrls: ['./osn-pagination.component.scss']
})
export class OsnPaginationComponent implements OnInit {

  @Input() total = 0;
  @Output() slices = new EventEmitter<{sliceFirst: number, sliceEnd: number}>();
  itemPerPage = '5';
  paginator = 1;
  sliceFirst = 1;
  sliceEnd = this.paginator * Number(this.itemPerPage);

  constructor() { }


  ngOnInit(): void {
  }

  paginate(direction?: number) {
    if (direction) {
      if (this.total > Number(this.itemPerPage)) {

      }
    }
    this.sliceEnd = this.paginator * Number(this.itemPerPage);
    this.sliceFirst = this.sliceEnd - Number(this.itemPerPage) + 1;
    this.slices.emit({sliceFirst: this.sliceFirst, sliceEnd: this.sliceEnd});
  }

}
