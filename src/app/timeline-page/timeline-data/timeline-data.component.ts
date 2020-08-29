import { Component, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { TimelineService } from '../../shared/timeline.service';
import { Subscription } from 'rxjs';
import { TimelineData } from 'src/app/shared/timelineData';
import { ElementType } from 'src/app/shared/ElementType';
import { MatSidenav } from '@angular/material/sidenav';
import Utils from 'src/app/shared/utils';

@Component({
  selector: 'app-timeline-data',
  templateUrl: './timeline-data.component.html',
  styleUrls: ['./timeline-data.component.scss']
})
export class TimelineDataComponent implements AfterViewInit {
  elementType = ElementType;

  public timelineDetailsTypeChangedFromChildComponent(event) {
    this.setTypeOfElementDetails(event);
  }

  public typeOfElementDetails;
  public setTypeOfElementDetails(type: ElementType) {
    //this.timelineService.emitElementType(elementType).subscribe();
    this.typeOfElementDetails = type;
  }

  public typeOfS3ElementToShow;
  public setTypeOfS3ElementToShow(type: ElementType) {
    this.typeOfS3ElementToShow = type;
  }

  public loadingSpinner = true;
  public loadingS3Object = false;

  public httpOpenXmlError;
  public httpCloudJsonError;
  public httpHeartBeatError;
  public httpS3Error;

  @ViewChild('rightSidenav') public rightSidenav: MatSidenav;
  @ViewChild('leftSidenav') public leftSidenav: MatSidenav;

  public S3ObjectSubscription: Subscription;
  public S3Object;

  public detailsSubscription: Subscription;
  public details = null;

  private uploadedXmlSubscription: Subscription;
  public uploadedXmlTimelineData: TimelineData;

  private cloudJsonSubscription: Subscription;
  public cloudJsonTimelineData: TimelineData;

  private heartBeatSubscription: Subscription;
  public heartBeatTimelineData: TimelineData;

  constructor(private timelineService: TimelineService) { }

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
        let tableDescription = 'Printers that generated' + type + 's';
        this.cloudJsonTimelineData = new TimelineData(data, type, tableDescription);

        this.loadingSpinner = false;
      },
      (err) => {
        this.httpCloudJsonError = err;

        this.loadingSpinner = false;
      });
  }

  private setHeartBeatSubscription() {
    this.heartBeatSubscription = this.timelineService.heartBeatData.subscribe(
      (data: any) => {
        let type = ElementType.Hb;
        let tableDescription = 'Printers sent ' + type + 's in the selected time range';
        this.heartBeatTimelineData = new TimelineData(data, type, tableDescription);

        this.loadingSpinner = false;
      },
      (err) => {
        this.httpHeartBeatError = err;

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

  //Unused:
  /* public setElementTypeSubscription() {
    this.elementTypeSubscription = this.timelineService.elementType.subscribe(
      (data: any) => {
        this.typeOfElementDetails = data;
        
        //console.log(this.typeOfElementDetails);
      }, 
      (err) => { 
        console.log(err);
      });
  } */

  public setS3ObjectSubscription() {
    this.S3ObjectSubscription = this.timelineService.S3Data.subscribe(
      (data: any) => {
        this.loadingS3Object = false;
        this.S3Object = data;
        this.httpS3Error = null;
        this.leftSidenav.open();

      },
      (err) => {
        this.loadingS3Object = false;
        this.httpS3Error = err;
        this.leftSidenav.open();

        console.log(this.httpS3Error);
      });
  }

  ngAfterViewInit(): void {
    this.setUploadedXmlSubscription();
    this.setCloudJsonSubscription();
    this.setDetailsSubscription();
    this.setS3ObjectSubscription();
    this.setHeartBeatSubscription();

    //Unused:
    //this.setElementTypeSubscription();
  }


  ngOnDestroy(): void {
    this.uploadedXmlSubscription.unsubscribe();
    this.cloudJsonSubscription.unsubscribe();
    this.detailsSubscription.unsubscribe();
    this.S3ObjectSubscription.unsubscribe();
    this.heartBeatSubscription.unsubscribe();

    //Unused:
    //this.elementTypeSubscription.unsubscribe();
  }

  public stringToJsonObject(inputString: string): JSON | string {
    return Utils.stringToJsonObject(inputString);
  }

  // Function used when we are retrieving the OpenXml that generated a specific Json after the Cloud 
  // Connector received the Xml.
  //(We have the region and bucket from that Json but not the region and bucket from the OpenXml that generated
  // the Json, we just have the key of the associated xml, the input of our function. 
  //Byy the configuration of AWS we know the specific region and bucket).
  public getOpenXmlThatGeneratedTheCloudJson(keyOfTheOpenXmlThatGeneratedTheJson) {
    let awsRegion = 'US_EAST_1';
    let cloudConnectorBucket = 'cloudconnector-core-production';
    this.getStoredObject(awsRegion, cloudConnectorBucket, keyOfTheOpenXmlThatGeneratedTheJson);
  }

  public stringDateToDateObject(inputDate: string): Date {
    return Utils.stringDateToDateObject(inputDate);
  }

  public longRepresentationOf(d: Date) {
    return d.toLocaleString('en-GB') + ':' + d.getMilliseconds();
  }
}