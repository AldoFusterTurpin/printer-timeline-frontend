import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Utils from './utils';

import subscriptionsResponseMock from '../../../mock_responses/subscriptions_response.json';


@Injectable({
  providedIn: 'root'
})
export class PrinterSubscriptionsService {
  private subscriptionsPath = 'subscriptions';

  public getPrinterSubscriptions(pn: string, sn: string): Promise<any> {
    // Uncomment line below in order to use mock_responses instead of fetching data from back-end
    //return new Promise(function (resolve, reject) { resolve(subscriptionsResponseMock); });

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'access-control-allow-origin, access-control-allow-headers',
        'x-api-key': localStorage.getItem(Utils.API_KEY_NAME) ? localStorage.getItem(Utils.API_KEY_NAME) : ''
      }),
      params: new HttpParams()
        .set('pn', pn)
        .set('sn', sn)
    };

    const url = `${environment.baseUrl}/${this.subscriptionsPath}`;

    return this.http.get<any>(url, httpOptions).toPromise();
  }

  constructor(private http: HttpClient) { }
}
