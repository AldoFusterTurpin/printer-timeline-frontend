import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, ReplaySubject, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private apiUrl = 'http://0.0.0.0:8080/api';

  private timeRangeSource = new ReplaySubject<Object>(1);
  timeRangeData = this.timeRangeSource.asObservable();

  private detailsSource = new Subject<JSON>();
  detailsData = this.detailsSource.asObservable();

  private S3Source = new Subject<JSON>();
  S3Data = this.S3Source.asObservable();

  private uploadedXmlSource = new ReplaySubject<JSON>(1);
  uploadedXmlData = this.uploadedXmlSource.asObservable();

  public setTimeRange(start: Date, end: Date): Observable<any> {
    let timeRange = { 'start': start, 'end': end };

    return of(timeRange)
      .pipe(
        tap(res => this.timeRangeSource.next(res)),
        catchError((err) => {
          this.timeRangeSource.error(err);
          return this.handleError(err);
        })
      );
  }

  public emitDetails(details): Observable<any> {
    return of(details)
      .pipe(
        tap(res => this.detailsSource.next(res)),
        catchError((err) => {
          this.detailsSource.error(err);
          return this.handleError(err);
        })
      );
  }

  public getUploadedXmls(pn: string, sn: string, start_time: string, end_time: string): Observable<any> {
    const url = `${this.apiUrl}/open_xml?pn=${pn}&sn=${sn}&time_type=absolute&start_time=${start_time}&end_time=${end_time}`;
    return this.http.get<any>(url)
      .pipe(
        tap(res => this.uploadedXmlSource.next(res)),
        catchError((err) => {
          this.uploadedXmlSource.error(err);
          return this.handleError(err);
        })
      );
  }

  public getS3Object(bucket_region: string, bucket_name: string, object_key: string): Observable<any> {
    const url = `${this.apiUrl}/object?bucket_region=${bucket_region}&bucket_name=${bucket_name}&object_key=${object_key}`;
    return this.http.get<any>(url)
      .pipe(
        tap(res => this.S3Source.next(res)),
        catchError((err) => {
          this.S3Source.error(err);
          return this.handleError(err);
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    // A client-side or network error occurred.
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  constructor(private http: HttpClient) { }
}
