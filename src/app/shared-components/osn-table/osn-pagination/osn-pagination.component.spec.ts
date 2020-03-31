import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsnPaginationComponent } from './osn-pagination.component';

describe('OsnPaginationComponent', () => {
  let component: OsnPaginationComponent;
  let fixture: ComponentFixture<OsnPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsnPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsnPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
