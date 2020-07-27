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

  @ViewChild('sidenav') public sidenav: MatSidenav;

  public S3ObjectSubscription: Subscription;
  public S3Object;

  public detailsSubscription: Subscription;
  public details = null;

  private uploadedXmlSubscription: Subscription;
  public uploadedXmlTimelineData: TimelineData = null;

  constructor(private timelineService: TimelineService, private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.uploadedXmlSubscription = this.timelineService.uploadedXmlData.subscribe(
      (data: any) => {
        let tableDescription = 'Printers sent ' + ElementType.OpenXml + 'files in the selected time range';
        this.uploadedXmlTimelineData = new TimelineData(data, ElementType.OpenXml, tableDescription);
      })

    this.detailsSubscription = this.timelineService.detailsData.subscribe(
      (data: any) => {
        this.details = data;
        this.sidenav.open();
        console.log(this.details);
      })

      this.S3ObjectSubscription = this.timelineService.S3Data.subscribe(
        (data: any) => {
          this.S3Object = data;
          console.log(typeof this.S3Object);
          console.log(this.S3Object);
        })
  }

  public downloadFile(bucket_region: string, bucket_name: string, object_key: string) {
    this.timelineService.getS3Object(bucket_region, bucket_name, object_key).subscribe();
  }

  ngOnDestroy(): void {
    this.uploadedXmlSubscription.unsubscribe();
  }
}