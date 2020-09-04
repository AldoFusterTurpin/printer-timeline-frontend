import { Component, ChangeDetectorRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { TimelineService } from '../../shared/timeline.service';
import { Subscription } from 'rxjs';
import { TimelineData } from 'src/app/shared/timelineData';
import { ElementType } from 'src/app/shared/ElementType';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

import Utils from 'src/app/shared/utils';

@Component({
  selector: 'app-timeline-data',
  templateUrl: './timeline-data.component.html',
  styleUrls: ['./timeline-data.component.scss']
})
export class TimelineDataComponent implements AfterViewInit {
  elementType = ElementType;

  @Input()
  public initialSelectedValues;

  public showOpenxmls = true;
  public showCloudJsons = true;
  public showHeartBeats = true;
  public showRtas = true;
  public showPrinterSubscriptions = true;

  public mustShowTip = true;

  public showTip() {
    let message = "🧐Quicktip: select some rows of the table below and press the button 'Apply filter' to see the changes";
    let action = 'Got it!';
    this._snackBar.open(message, action, {
      duration: 20000,
      verticalPosition: 'top',
    });
  }

  dataTypesFilterChanged(selectedValues: ElementType[]) {
    this.showOpenxmls = selectedValues.includes(ElementType.OpenXml);
    this.showCloudJsons = selectedValues.includes(ElementType.CloudJson);
    this.showHeartBeats = selectedValues.includes(ElementType.Hb);
    this.showRtas = selectedValues.includes(ElementType.Rta);
    this.showPrinterSubscriptions = selectedValues.includes(ElementType.PrinterSubscriptions);
  }

  public timelineDetailsTypeChangedFromChildComponent(elementDetailsType: ElementType) {
    this.setTypeOfElementDetails(elementDetailsType);
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
  public httpRtaError;

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

  private rtaSubscription: Subscription;
  public rtaTimelineData: TimelineData;

  constructor(private timelineService: TimelineService, private _snackBar: MatSnackBar) { }

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
        this.httpOpenXmlError = err;
        this.loadingSpinner = false;
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
        this.httpCloudJsonError = err;
        this.loadingSpinner = false;
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
        this.httpHeartBeatError = err;
        this.loadingSpinner = false;
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
        this.httpRtaError = err;
        this.loadingSpinner = false;
      });
  }

  private setDetailsSubscription() {
    this.detailsSubscription = this.timelineService.detailsData.subscribe(
      (data: any) => {
        this.details = data;
        this.rightSidenav.open();
      });
  }

  //TODO: work on that beacause when there is an error. it never quites the progress bar
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
        console.log('(data) this.S3Object' + this.S3Object);;
      },
      (err) => {
        this.loadingS3Object = false;
        this.httpS3Error = err;
        this.leftSidenav.open();

        console.log('(error) this.loadingS3Object: ' + this.loadingS3Object);
        console.log('(error) this.httpS3Error: ' + this.httpS3Error);
      });
  }

  ngAfterViewInit(): void {
    this.setUploadedXmlSubscription();
    this.setCloudJsonSubscription();
    this.setDetailsSubscription();
    this.setS3ObjectSubscription();
    this.setHeartBeatSubscription();
    this.setRtaSubscription();

    //Unused:
    //this.setElementTypeSubscription();
  }


  ngOnDestroy(): void {
    this.uploadedXmlSubscription.unsubscribe();
    this.cloudJsonSubscription.unsubscribe();
    this.detailsSubscription.unsubscribe();
    this.S3ObjectSubscription.unsubscribe();
    this.heartBeatSubscription.unsubscribe();
    this.rtaSubscription.unsubscribe();

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
    return Utils.longRepresentationOf(d);
  }
}