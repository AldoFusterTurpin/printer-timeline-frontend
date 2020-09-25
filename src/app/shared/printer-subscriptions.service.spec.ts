import { TestBed } from '@angular/core/testing';

import { PrinterSubscriptionsService } from './printer-subscriptions.service';

describe('PrinterSubscriptionsService', () => {
  let service: PrinterSubscriptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrinterSubscriptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
