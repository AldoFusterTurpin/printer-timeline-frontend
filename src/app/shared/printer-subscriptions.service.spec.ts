import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { PrinterSubscriptionsService } from './printer-subscriptions.service';


describe('PrinterSubscriptionsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: PrinterSubscriptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(PrinterSubscriptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test get printer subscriptions from API', () => {
    const testUrl = 'http://0.0.0.0:8080/cc/V01/api/subscriptions?sn=HPCT000011&pn=Y0U23A';

    const testData: any = [
      {
        "PrinterID": "Y0U23A!HPCT000011",
        "AccountID": "MiquelCCTest_3763",
        "ServiceID": "HP-PPU",
        "RegistrationTimeEpoch": 1594993081000
      },
      {
        "PrinterID": "Y0U23A!HPCT000011",
        "AccountID": "pr250f9d43",
        "ServiceID": "PRINTOS",
        "RegistrationTimeEpoch": 1575551409215
      },
      {
        "PrinterID": "Y0U23A!HPCT000011",
        "AccountID": "se00000000",
        "ServiceID": "seals",
        "RegistrationTimeEpoch": 1600938101369
      }
    ];

    httpClient.get<any>(testUrl)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(testUrl);

    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  it('can test for network error', () => {
    const testUrl = 'http://0.0.0.0:8080/cc/V01/api/subscriptions?sn=HPCT000011&pn=Y0U23A';
    const emsg = 'simulated network error';
  
    httpClient.get<any>(testUrl).subscribe(
      data => fail('should have failed with the network error'),
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(emsg, 'message');
      }
    );
  
    const req = httpTestingController.expectOne(testUrl);
  
    const mockError = new ErrorEvent('Network error', {
      message: emsg,
    });
  
    // Respond with mock error
    req.error(mockError);
  });
});
