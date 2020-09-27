import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TimelineService } from './timeline.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { PrinterSubscriptionsService } from './printer-subscriptions.service';

describe('TimelineService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: TimelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TimelineService]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(TimelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test get printer timeline from API', () => {
    const testUrl = 'http://0.0.0.0:8080/cc/V01/api/open-xml';

    const testData: any = { "body": "mock response" };

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
    const testUrl = 'http://0.0.0.0:8080/cc/V01/api/open-xml';
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

  it('can test for 404 error', () => {
    const testUrl = 'http://0.0.0.0:8080/cc/V01/api/open-xml';
    const emsg = 'Failed to load resource: the server responded with a status of 404 (Not Found)';
  
    httpClient.get<any>(testUrl).subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(emsg, 'message');
      }
    );
  
    const req = httpTestingController.expectOne(testUrl);
  
    const mockError = new ErrorEvent('404 error', {
      message: emsg,
    });
  
    // Respond with mock error
    req.error(mockError);
  });
});
