import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterSubscriptionsDataComponent } from './printer-subscriptions-data.component';

describe('PrinterSubscriptionsDataComponent', () => {
  let component: PrinterSubscriptionsDataComponent;
  let fixture: ComponentFixture<PrinterSubscriptionsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterSubscriptionsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterSubscriptionsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
