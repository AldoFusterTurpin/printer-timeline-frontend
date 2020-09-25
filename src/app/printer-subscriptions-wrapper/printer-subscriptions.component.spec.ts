import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterSubscriptionsWrapperComponent } from './printer-subscriptions.component';

describe('PrinterSubscriptionsWrapperComponent', () => {
  let component: PrinterSubscriptionsWrapperComponent;
  let fixture: ComponentFixture<PrinterSubscriptionsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterSubscriptionsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterSubscriptionsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
