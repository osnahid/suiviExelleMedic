import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLastestInstallationComponent } from './list-lastest-installation.component';

describe('ListLastestInstallationComponent', () => {
  let component: ListLastestInstallationComponent;
  let fixture: ComponentFixture<ListLastestInstallationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLastestInstallationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLastestInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
