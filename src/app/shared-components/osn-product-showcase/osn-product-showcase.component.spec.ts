import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsnProductShowcaseComponent } from './osn-product-showcase.component';

describe('OsnProductShowcaseComponent', () => {
  let component: OsnProductShowcaseComponent;
  let fixture: ComponentFixture<OsnProductShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsnProductShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsnProductShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
