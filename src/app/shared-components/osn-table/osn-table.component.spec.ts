import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsnTableComponent } from './osn-table.component';

describe('OsnTableComponent', () => {
  let component: OsnTableComponent;
  let fixture: ComponentFixture<OsnTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsnTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsnTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
