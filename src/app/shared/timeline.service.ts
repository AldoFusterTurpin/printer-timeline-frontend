//IMPORTANT: onError finishes the stream of data! Don't use it to propagate http errors.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiError, ErrorType } from './ApiError';
import Utils from './utils';

import cloudJsonResponseMock from '../../../mock_responses/cloud_json_response.json';
import heartbeatResponseMock from '../../../mock_responses/heartbeat_response.json';
import openxmlResponseMock from '../../../mock_responses/openxml_response.json';
import rtaResponseMock from '../../../mock_responses/rta_response.json';
import s3ResponseMock from '../../../mock_responses/s3_response.json';


@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private apiErrorsSource = new ReplaySubject<ApiError>(1);
  apiErrors = this.apiErrorsSource.asObservable();

  private timeRangeSource = new ReplaySubject<Object>(1);
  timeRangeData = this.timeRangeSource.asObservable();

  private detailsSource = new ReplaySubject<JSON>(1);
  detailsData = this.detailsSource.asObservable();

  private S3Source = new ReplaySubject<any>(1);
  S3Data = this.S3Source.asObservable();

  private uploadedXmlSource = new ReplaySubject<any>(1);
  uploadedXmlData = this.uploadedXmlSource.asObservable();

  private cloudJsonSource = new ReplaySubject<any>(1);
  cloudJsonData = this.cloudJsonSource.asObservable();

  private heartBeatSource = new ReplaySubject<any>(1);
  heartBeatData = this.heartBeatSource.asObservable();

  private rtaSource = new ReplaySubject<any>(1);
  rtaData = this.rtaSource.asObservable();

  public cleanSources() {
    return of(null)
      .pipe(
        tap((res) => {
          this.uploadedXmlSource.next(res);
          this.cloudJsonSource.next(res);
          this.heartBeatSource.next(res);
          this.rtaSource.next(res);
          this.apiErrorsSource.next(res); //maybe use this
        }),
        catchError((err) => {
          /* this.uploadedXmlSource.error(err);
          this.cloudJsonSource.error(err);
          this.heartBeatSource.error(err);
          this.rtaSource.error(err); */
          return this.handleError(err);
        })
      );
  }

  public setTimeRange(start: Date, end: Date): Observable<any> {
    let timeRange = { 'start': start, 'end': end };
    return of(timeRange)
      .pipe(
        tap(res => this.timeRangeSource.next(res)),
        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  public emitDetails(details): Observable<any> {
    return of(details)
      .pipe(
        tap(res => this.detailsSource.next(res)),
        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  private openXmlPath = 'open-xml';
  private cloudJsonPath = 'cloud-json';
  private heartbeatPath = 'heartbeat';
  private rtaPath = 'rta';
  private S3ObjectPath = 'object';

  private commonHTTPHeaders() {
    return new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "access-control-allow-origin, access-control-allow-headers",
      'x-api-key': localStorage.getItem(Utils.API_KEY_NAME) ? localStorage.getItem(Utils.API_KEY_NAME) : ''
    })
  }

  private commonHTTPOptions(pn: string, sn: string, start_time: string, end_time: string) {
    let params = new HttpParams()
      .set('pn', pn)
      .set('sn', sn)
      .set('time_type', 'absolute')
      .set('start_time', start_time)
      .set('end_time', end_time);

    const httpOptions = {
      headers: this.commonHTTPHeaders(),
      params: params
    };
    return httpOptions;
  }

  public getUploadedXmls(pn: string, sn: string, start_time: string, end_time: string): Observable<any> {
    // Uncomment line below in order to use mock_responses instead of fetching data from back-end
    //this.uploadedXmlSource.next(openxmlResponseMock); return of(openxmlResponseMock);

    const url = `${environment.baseUrl}/${this.openXmlPath}`;
    const httpOptions = this.commonHTTPOptions(pn, sn, start_time, end_time);

    return this.http.get<any>(url, httpOptions)
      .pipe(
        tap(res => this.uploadedXmlSource.next(res)),
        catchError((err) => {
          this.apiErrorsSource.next(new ApiError(ErrorType.OpenXmlError, err));
          return this.handleError(err);
        })
      );
  }

  public getCloudJsons(pn: string, sn: string, start_time: string, end_time: string): Observable<any> {
    // Uncomment line below in order to use mock_responses instead of fetching data from back-end
    //this.cloudJsonSource.next(cloudJsonResponseMock); return of(cloudJsonResponseMock);

    const httpOptions = this.commonHTTPOptions(pn, sn, start_time, end_time);
    const url = `${environment.baseUrl}/${this.cloudJsonPath}`;

    return this.http.get<any>(url, httpOptions)
      .pipe(
        tap(res => this.cloudJsonSource.next(res)),
        catchError((err) => {
          this.apiErrorsSource.next(new ApiError(ErrorType.CloudJsonError, err));
          return this.handleError(err);
        })
      );
  }

  public getHeartBeats(pn: string, sn: string, start_time: string, end_time: string): Observable<any> {
    // Uncomment line below in order to use mock_responses instead of fetching data from back-end
    //this.heartBeatSource.next(heartbeatResponseMock); return of(heartbeatResponseMock);
    
    const httpOptions = this.commonHTTPOptions(pn, sn, start_time, end_time);
    const url = `${environment.baseUrl}/${this.heartbeatPath}`;

    return this.http.get<any>(url, httpOptions)
      .pipe(
        tap(res => this.heartBeatSource.next(res)),
        catchError((err) => {
          this.apiErrorsSource.next(new ApiError(ErrorType.HbError, err));
          return this.handleError(err);
        })
      );
  }

  public getRTAs(pn: string, sn: string, start_time: string, end_time: string): Observable<any> {
    // Uncomment line below in order to use mock_responses instead of fetching data from back-end
    //this.rtaSource.next(rtaResponseMock); return of(rtaResponseMock);
    
    const httpOptions = this.commonHTTPOptions(pn, sn, start_time, end_time);
    const url = `${environment.baseUrl}/${this.rtaPath}`;

    return this.http.get<any>(url, httpOptions)
      .pipe(
        tap(res => this.rtaSource.next(res)),
        catchError((err) => {
          this.apiErrorsSource.next(new ApiError(ErrorType.RtaError, err));
          return this.handleError(err);
        })
      );
  }

  public getS3Object(bucket_region: string, bucket_name: string, object_key: string): Observable<any> {
    // Uncomment line below in order to use mock_responses instead of fetching data from back-end
    //this.S3Source.next(s3ResponseMock); return of(s3ResponseMock);
    
    let params = new HttpParams()
      .set('bucket_region', bucket_region)
      .set('bucket_name', bucket_name)
      .set('object_key', object_key);

      const httpOptions = {
        headers: this.commonHTTPHeaders(),
        params: params,
        responseType: 'text' as const, //ugly notation (search '*OBSERVE* AND *RESPONSE* TYPES'): https://angular.io/guide/http#requesting-a-typed-response
    };

    const url = `${environment.baseUrl}/${this.S3ObjectPath}`;

    return this.http.get(url,httpOptions)
      .pipe(
        tap((res) => {
          this.S3Source.next(res);
        }),
        catchError((err) => {
          this.apiErrorsSource.next(new ApiError(ErrorType.S3Error, err));
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
