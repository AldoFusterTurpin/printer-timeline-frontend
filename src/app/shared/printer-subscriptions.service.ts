import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrinterSubscriptionsService {
  
  public getPrinterSubscriptions(pn: string, sn: string): Promise<any> {
    const url = `${environment.baseUrl}/subscriptions?pn=${pn}&sn=${sn}`;
    return this.http.get<any>(url).toPromise();
  }

  constructor(private http: HttpClient) { }
}
