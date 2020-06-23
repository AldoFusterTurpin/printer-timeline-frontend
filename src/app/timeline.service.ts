import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private apiUrl = 'http://0.0.0.0:8080/api';

  private dataSource = new Subject<JSON>();
  data = this.dataSource.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUploadedXmls(pn: string, sn: string, start_time: string, end_time: string): Observable<any> {
    const url = `${this.apiUrl}/open_xml?pn=${pn}&sn=${sn}&time_type=absolute&start_time=${start_time}&end_time=${end_time}`;
    //const url = `${this.apiUrl}/open_xml?pn=K4G10A&sn=SG58P1R001&time_type=relative&offset_units=minutes&offset_value=15`;
    return this.http.get<any>(url)
      .pipe(
        tap((res) => {
          console.log(res);
          this.dataSource.next(res);
        }),
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

  constructor(private http: HttpClient) { }
}
