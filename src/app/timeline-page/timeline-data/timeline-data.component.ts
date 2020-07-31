import { Component, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { TimelineService } from '../../timeline.service';
import { Subscription } from 'rxjs';
import { TimelineData } from 'timelineData';
import { ElementType } from 'ElementType';
import { MatSidenav } from '@angular/material/sidenav';
import { error } from 'protractor';

@Component({
  selector: 'app-timeline-data',
  templateUrl: './timeline-data.component.html',
  styleUrls: ['./timeline-data.component.scss']
})
export class TimelineDataComponent implements AfterViewInit {
  public loading = true;

  public httpOpenXmlError;

  @ViewChild('rightSidenav') public rightSidenav: MatSidenav;
  @ViewChild('leftSidenav') public leftSidenav: MatSidenav;

  public S3ObjectSubscription: Subscription;
  public S3Object;

  public detailsSubscription: Subscription;
  public details = null;

  private uploadedXmlSubscription: Subscription;
  public uploadedXmlTimelineData: TimelineData;

  constructor(private timelineService: TimelineService, private changeDetector: ChangeDetectorRef) { }

  private setUploadedXmlSubscription() {
    this.uploadedXmlSubscription = this.timelineService.uploadedXmlData.subscribe(
      (data: any) => {
        let tableDescription = 'Printers sent ' + ElementType.OpenXml + 'files in the selected time range';
        this.uploadedXmlTimelineData = new TimelineData(data, ElementType.OpenXml, tableDescription);

        this.loading = false;
      }, 
      (err) => { 
        this.httpOpenXmlError = err;

        this.loading = false;

        console.log(this.httpOpenXmlError);
      });
  }

  private setDetailsSubscription() {
    this.detailsSubscription = this.timelineService.detailsData.subscribe(
      (data: any) => {
        this.details = data;
        this.rightSidenav.open();
        console.log(this.details);
      });
  }

  public setS3ObjectSubscription() {
    this.S3ObjectSubscription = this.timelineService.S3Data.subscribe(
      (data: any) => {
        this.S3Object = data;
        this.leftSidenav.open();
        console.log(this.S3Object);
      });
  }

  ngAfterViewInit(): void {
    this.setUploadedXmlSubscription();
    this.setDetailsSubscription();
    this.setS3ObjectSubscription();
  }

  public getStoredObject(bucket_region: string, bucket_name: string, object_key: string) {
    this.timelineService.getS3Object(bucket_region, bucket_name, object_key).subscribe();
  }

  ngOnDestroy(): void {
    this.uploadedXmlSubscription.unsubscribe();
  }
}