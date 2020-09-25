import { Component, ChangeDetectorRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { TimelineService } from '../../shared/timeline.service';
import { Subscription } from 'rxjs';
import { TimelineData } from 'src/app/shared/timelineData';
import { ElementType } from 'src/app/shared/ElementType';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

import Utils from 'src/app/shared/utils';
import { ApiError, ErrorType } from 'src/app/shared/ApiError';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-timeline-data',
  templateUrl: './timeline-data.component.html',
  styleUrls: ['./timeline-data.component.scss']
})
export class TimelineDataComponent implements AfterViewInit {
  elementType = ElementType;
  errorType = ErrorType

  @Input()
  public initialSelectedValues;

  @ViewChild('rightSidenav') public rightSidenav: MatSidenav;
  @ViewChild('leftSidenav') public leftSidenav: MatSidenav;

  public showOpenxmls = true;
  public showCloudJsons = true;
  public showHeartBeats = true;
  public showRtas = true;
  public showPrinterSubscriptions = true;

  public mustShowTip = true;

  public loadingSpinner = true;
  public loadingS3Object = false;

  public typeOfElementDetails;
  public typeOfS3ElementToShow;

  public S3Error: ApiError;
  public openXmlError: ApiError;
  public cloudJsonError: ApiError;
  public heartBeatError: ApiError;
  public rtaError: ApiError;


  public errorsSubscription: Subscription;

  public S3ObjectSubscription: Subscription;
  public S3Object;

  public details = null;
  public detailsSubscription: Subscription;

  public uploadedXmlTimelineData: TimelineData;
  public cloudJsonTimelineData: TimelineData;
  public heartBeatTimelineData: TimelineData;
  public rtaTimelineData: TimelineData;

  private uploadedXmlSubscription: Subscription;
  private cloudJsonSubscription: Subscription;
  private heartBeatSubscription: Subscription;
  private rtaSubscription: Subscription;

  constructor(private timelineService: TimelineService, private _snackBar: MatSnackBar) { }

  public setTypeOfS3ElementToShow(type: ElementType) {
    this.typeOfS3ElementToShow = type;
  }

  public setTypeOfElementDetails(type: ElementType) {
    this.typeOfElementDetails = type;
  }

  public timelineDetailsTypeChangedFromChildComponent(elementDetailsType: ElementType) {
    this.setTypeOfElementDetails(elementDetailsType);
  }

  public dataTypesFilterChanged(selectedValues: ElementType[]) {
    this.showOpenxmls = selectedValues.includes(ElementType.OpenXml);
    this.showCloudJsons = selectedValues.includes(ElementType.CloudJson);
    this.showHeartBeats = selectedValues.includes(ElementType.Hb);
    this.showRtas = selectedValues.includes(ElementType.Rta);
    this.showPrinterSubscriptions = selectedValues.includes(ElementType.PrinterSubscriptions);
  }

  public showTip() {
    let message = "🧐Quicktip: select some rows of the table below and press the button 'Apply filter' to see the changes";
    let action = 'Got it!';
    this._snackBar.open(message, action, {
      duration: 20000,
      verticalPosition: 'top',
    });
  }

  private setUploadedXmlSubscription() {
    this.uploadedXmlSubscription = this.timelineService.uploadedXmlData.subscribe(
      (data: any) => {
        if (data) {
          let type = ElementType.OpenXml;
          let tableDescription = 'Printers sent ' + type + ' files in the selected time range';
          this.uploadedXmlTimelineData = new TimelineData(data, type, tableDescription);

          if (this.mustShowTip) {
            this.showTip();
            this.mustShowTip = false;
          }

        } else {
          this.uploadedXmlTimelineData = null;
        }
        this.loadingSpinner = false;
      },
      (err) => {
        /* this.openXmlError = err;
        this.loadingSpinner = false; */
      });
  }

  private setCloudJsonSubscription() {
    this.cloudJsonSubscription = this.timelineService.cloudJsonData.subscribe(
      (data: any) => {
        if (data) {
          let type = ElementType.CloudJson;
          let tableDescription = 'Printers that generated' + type + 's';
          this.cloudJsonTimelineData = new TimelineData(data, type, tableDescription);

          if (this.mustShowTip) {
            this.showTip();
            this.mustShowTip = false;
          }

        } else {
          this.cloudJsonTimelineData = null;
        }
        this.loadingSpinner = false;
      },
      (err) => {
        /* this.cloudJsonError = err;
        this.loadingSpinner = false; */
      });
  }

  private setHeartBeatSubscription() {
    this.heartBeatSubscription = this.timelineService.heartBeatData.subscribe(
      (data: any) => {
        if (data) {
          let type = ElementType.Hb;
          let tableDescription = 'Printers sent ' + type + 's in the selected time range';
          this.heartBeatTimelineData = new TimelineData(data, type, tableDescription);

          if (this.mustShowTip) {
            this.showTip();
            this.mustShowTip = false;
          }

        } else {
          this.heartBeatTimelineData = null;
        }
        this.loadingSpinner = false;
      },
      (err) => {
        /* this.heartBeatError = err;
        this.loadingSpinner = false; */
      });
  }

  private setRtaSubscription() {
    this.rtaSubscription = this.timelineService.rtaData.subscribe(
      (data: any) => {
        if (data) {
          let type = ElementType.Rta;
          let tableDescription = 'Printers sent ' + type + 's in the selected time range';
          this.rtaTimelineData = new TimelineData(data, type, tableDescription);

          if (this.mustShowTip) {
            this.showTip();
            this.mustShowTip = false;
          }

        } else {
          this.rtaTimelineData = null;
        }
        this.loadingSpinner = false;
      },
      (err) => {
        /* this.rtaError = err;
        this.loadingSpinner = false; */
      });
  }

  private setDetailsSubscription() {
    this.detailsSubscription = this.timelineService.detailsData.subscribe(
      (data: any) => {
        if (data) {
          this.details = data;
          if (this.rightSidenav) {
            this.rightSidenav.open();
          } 
        }
      });
  }

  public getStoredObject(bucket_region: string, bucket_name: string, object_key: string) {
    this.loadingS3Object = true;
    this.timelineService.getS3Object(bucket_region, bucket_name, object_key).subscribe();
  }

  public setS3ObjectSubscription() {
    this.S3ObjectSubscription = this.timelineService.S3Data.subscribe(
      (data: any) => {
        this.loadingS3Object = false;
        this.S3Object = data;
        this.S3Error = null;
        if (this.leftSidenav) {
          this.leftSidenav.open();
        }
      },
      (err) => {
        /* this.loadingS3Object = false;
        this.S3Error = err;
        this.leftSidenav.open(); */
      });
  }

  public setErrorsSubscription() {
    this.errorsSubscription = this.timelineService.apiErrors.subscribe(
      (dataError: ApiError) => {
        this.setAppropiateErrors(dataError)
      });
  }

  public setAppropiateErrors(dataError: ApiError) {
    switch (dataError.errorType) {
      case this.errorType.S3Error: {
        this.loadingS3Object = false;
        this.S3Error = dataError;
        this.leftSidenav.open();
        break;
      }
      case this.errorType.OpenXmlError: {
        this.openXmlError = dataError;
        this.loadingSpinner = false;
        break;
      }
      case this.errorType.CloudJsonError: {
        this.cloudJsonError = dataError;
        this.loadingSpinner = false;
        break;
      }
      case this.errorType.RtaError: {
        this.rtaError = dataError;
        this.loadingSpinner = false;
        break;
      }
      case this.errorType.HbError: {
        this.heartBeatError = dataError;
        this.loadingSpinner = false;
        break;
      }
    }
  }

  public ngAfterViewInit(): void {
    this.setUploadedXmlSubscription();
    this.setCloudJsonSubscription();
    this.setDetailsSubscription();
    this.setS3ObjectSubscription();
    this.setHeartBeatSubscription();
    this.setRtaSubscription();
    this.setErrorsSubscription();
    //Unused:
    //this.setElementTypeSubscription();
  }


  public ngOnDestroy(): void {
    this.uploadedXmlSubscription.unsubscribe();
    this.cloudJsonSubscription.unsubscribe();
    this.detailsSubscription.unsubscribe();
    this.S3ObjectSubscription.unsubscribe();
    this.heartBeatSubscription.unsubscribe();
    this.rtaSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }

  public stringToJsonObject(inputString: string): JSON | string {
    return Utils.stringToJsonObject(inputString);
  }

  // Function used when we are retrieving the OpenXml that generated a specific Json after the Cloud 
  // Connector received the Xml.
  //(We have the region and bucket from that Json but not the region and bucket from the OpenXml that generated
  // the Json, we just have the key of the associated xml, the input of our function. 
  //By the configuration of AWS we know the specific region and bucket).
  public getOpenXmlThatGeneratedTheCloudJson(keyOfTheOpenXmlThatGeneratedTheJson) {
    let awsRegion = 'US_EAST_1';
    let cloudConnectorBucket = (environment.awsEnvironment === 'staging') ? 'drp-cloudconnector-core-production': 'cloudconnector-core-production';
    this.getStoredObject(awsRegion, cloudConnectorBucket, keyOfTheOpenXmlThatGeneratedTheJson);
  }

  public stringDateToDateObject(inputDate: string): Date {
    return Utils.stringDateToDateObject(inputDate);
  }

  public longRepresentationOf(d: Date) {
    return Utils.longRepresentationOf(d);
  }
}