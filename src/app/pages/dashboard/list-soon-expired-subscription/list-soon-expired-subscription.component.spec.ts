import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSoonExpiredSubscriptionComponent } from './list-soon-expired-subscription.component';

describe('ListSoonExpiredSubscriptionComponent', () => {
  let component: ListSoonExpiredSubscriptionComponent;
  let fixture: ComponentFixture<ListSoonExpiredSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSoonExpiredSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSoonExpiredSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
