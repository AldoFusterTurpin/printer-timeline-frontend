import { Component, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { TimelineService } from '../../timeline.service';
import { Subscription } from 'rxjs';
import { TimelineData } from 'timelineData';
import { ElementType } from 'ElementType';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-timeline-data',
  templateUrl: './timeline-data.component.html',
  styleUrls: ['./timeline-data.component.scss']
})
export class TimelineDataComponent implements AfterViewInit {
  elementType = ElementType;

  public loadingSpinner = true;
  public loadingS3Object = false;

  public httpOpenXmlError;
  public httpCloudJsonError;
  public httpS3Error;

  @ViewChild('rightSidenav') public rightSidenav: MatSidenav;
  @ViewChild('leftSidenav') public leftSidenav: MatSidenav;

  public elementTypeSubscription: Subscription;
  public elementTypeOfS3Element;

  public S3ObjectSubscription: Subscription;
  public S3Object;

  public detailsSubscription: Subscription;
  public details = null;

  private uploadedXmlSubscription: Subscription;
  public uploadedXmlTimelineData: TimelineData;

  private cloudJsonSubscription: Subscription;
  public cloudJsonTimelineData: TimelineData;

  constructor(private timelineService: TimelineService, private changeDetector: ChangeDetectorRef) { }

  private setUploadedXmlSubscription() {
    this.uploadedXmlSubscription = this.timelineService.uploadedXmlData.subscribe(
      (data: any) => {
        let type = ElementType.OpenXml;
        let tableDescription = 'Printers sent ' + type + 'files in the selected time range';
        this.uploadedXmlTimelineData = new TimelineData(data, type, tableDescription);

        this.loadingSpinner = false;
      }, 
      (err) => { 
        this.httpOpenXmlError = err;

        this.loadingSpinner = false;
      });
  }

  private setCloudJsonSubscription() {
    this.cloudJsonSubscription = this.timelineService.cloudJsonData.subscribe(
      (data: any) => {
        let type = ElementType.CloudJson;
        let tableDescription = 'Unique printers that generated' + type + 's';
        this.cloudJsonTimelineData = new TimelineData(data, type, tableDescription);

        this.loadingSpinner = false;
      }, 
      (err) => { 
        this.httpCloudJsonError = err;

        this.loadingSpinner = false;
      });
  }

  private setDetailsSubscription() {
    this.detailsSubscription = this.timelineService.detailsData.subscribe(
      (data: any) => {
        this.details = data;
        this.rightSidenav.open();
        //console.log(this.details);
      });
  }

  public getStoredObject(bucket_region: string, bucket_name: string, object_key: string) {
    this.loadingS3Object = true; 
    this.timelineService.getS3Object(bucket_region, bucket_name, object_key).subscribe();
  }

  public setElementTypeSubscription() {
    this.elementTypeSubscription = this.timelineService.elementType.subscribe(
      (data: any) => {
        this.elementTypeOfS3Element = data;
        
        console.log(this.elementTypeOfS3Element);
      }, 
      (err) => { 
        console.log(err);
      });
  }

  public setS3ObjectSubscription() {
    this.S3ObjectSubscription = this.timelineService.S3Data.subscribe(
      (data: any) => {
        this.S3Object = data;
        this.leftSidenav.open();
        
        console.log(this.S3Object);

        this.loadingS3Object = false;
      }, 
      (err) => { 
        this.httpS3Error = err;
        this.leftSidenav.open();
        this.loadingS3Object = false;

        console.log(this.httpS3Error);
      });
  }

  ngAfterViewInit(): void {
    this.setUploadedXmlSubscription();
    this.setCloudJsonSubscription();
    this.setDetailsSubscription();
    this.setS3ObjectSubscription();
    this.setElementTypeSubscription();
  }


  ngOnDestroy(): void {
    this.uploadedXmlSubscription.unsubscribe();
    this.cloudJsonSubscription.unsubscribe();
    this.detailsSubscription.unsubscribe();
    this.S3ObjectSubscription.unsubscribe();
    this.elementTypeSubscription.unsubscribe();
  }

  //TODO: move this function to a common file because is duplicated in single-timeline.component.ts
  public stringDateToDateObject(inputDate: string): Date {
    let ISO8601DateString = inputDate.replace(' ', 'T') + 'Z';
    const date = new Date(ISO8601DateString);
    return date;
  }
}