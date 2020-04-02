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
  sliceFirst = 0;
  sliceEnd = this.paginator * Number(this.itemPerPage);

  constructor() { }


  ngOnInit(): void {
  }

  paginate(direction?: number) {
    const numberOfPages =
    ((this.total % Number(this.itemPerPage)) > 0) ? Math.floor(this.total / Number(this.itemPerPage)) + 1 :
    Math.floor(this.total / Number(this.itemPerPage));

    if (direction !== 0) {
      if ((numberOfPages > this.paginator && direction > 0) || (this.paginator > 1 && direction < 0)) {
        this.paginator += direction;
        this.sliceEnd = this.paginator * Number(this.itemPerPage);
        this.sliceFirst = this.sliceEnd - Number(this.itemPerPage);
      }
    } else if (direction === 0) {
      this.paginator = 1;
      this.sliceEnd = this.paginator * Number(this.itemPerPage);
      this.sliceFirst = this.sliceEnd - Number(this.itemPerPage);
    }
    this.slices.emit({sliceFirst: this.sliceFirst, sliceEnd: this.sliceEnd});

  }

}
