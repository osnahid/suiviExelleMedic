import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancesComponent } from './maintenances.component';

describe('MaintenancesComponent', () => {
  let component: MaintenancesComponent;
  let fixture: ComponentFixture<MaintenancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
