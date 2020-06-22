import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private apiUrl = '0.0.0.0:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  getUploadedXmls(): Observable<any> {
    //const url = `${this.apiUrl}/api/open_xml?pn=${pn}&sn=${sn}&time_type=relative&offset_units=minutes&offset_value=15`;
    const url = this.apiUrl + `/api/open_xml?pn=K4G10A&sn=SG58P1R001&time_type=relative&offset_units=minutes&offset_value=15`;
    return this.http.get<any>('http://0.0.0.0:8080/api/open_xml?pn=K4G10A&sn=SG58P1R001&time_type=relative&offset_units=minutes&offset_value=5')
      .pipe(
        tap(res => console.log(res)),
        catchError(this.handleError<any>('getUploadedXmls'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor( private http: HttpClient) { }
}
