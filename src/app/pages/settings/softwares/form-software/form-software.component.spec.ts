import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSoftwareComponent } from './form-software.component';

describe('FormSoftwareComponent', () => {
  let component: FormSoftwareComponent;
  let fixture: ComponentFixture<FormSoftwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSoftwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
