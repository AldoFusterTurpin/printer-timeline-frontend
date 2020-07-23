import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private apiUrl = 'http://0.0.0.0:8080/api';

  private timeRangeSource = new ReplaySubject<Object>(1);
  timeRangeData = this.timeRangeSource.asObservable();

  private detailsSource = new Subject<JSON>();
  detailsData = this.detailsSource.asObservable();

  private dataSource = new Subject<JSON>();
  uploadedXmlData = this.dataSource.asObservable();

  public setTimeRange(start: Date, end: Date): Observable<any> {
    let timeRange = {
      'start': start,
      'end': end
    };

    return of(timeRange)
      .pipe(
        tap((res) => { 
          this.timeRangeSource.next(res); 
        }),
        catchError(this.handleError<any>('setTimeRange'))
      );
  }

  public emitDetails(details): Observable<any> {
    return of(details)
      .pipe(
        tap((res) => { 
          this.detailsSource.next(res); 
        }),
        catchError(this.handleError<any>('emitDetails'))
      );
  }

  public getUploadedXmls(pn: string, sn: string, start_time: string, end_time: string): Observable<any> {
    const url = `${this.apiUrl}/open_xml?pn=${pn}&sn=${sn}&time_type=absolute&start_time=${start_time}&end_time=${end_time}`;
    return this.http.get<any>(url)
      .pipe(
        tap((res) => {
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
