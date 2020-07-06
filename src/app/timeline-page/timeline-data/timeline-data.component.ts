import { Component, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { TimelineService } from '../../timeline.service';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'apiResponse';
import { TimelineData } from 'timelineData';
import { ElementType } from 'ElementType';

@Component({
  selector: 'app-timeline-data',
  templateUrl: './timeline-data.component.html',
  styleUrls: ['./timeline-data.component.scss']
})
export class TimelineDataComponent implements AfterViewInit {

  public start: Date;
  public end: Date;


  public uploadedXmlTimelineData: TimelineData = null;
  
  /* public uploadedXmlsResponse: ApiResponse = null;
  public uploadedXmls: JSON[] = null; */

  private uploadedXmlSubscription: Subscription;
  private timeSubscription: Subscription;

  constructor(private timelineService: TimelineService, private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.uploadedXmlSubscription = this.timelineService.uploadedXmlData.subscribe(
      (data: any) => {
        this.uploadedXmlTimelineData = new TimelineData(data, ElementType.OpenXml);
        console.log(this.uploadedXmlTimelineData);
        /* this.uploadedXmlsResponse = data;
        this.uploadedXmls = data['Results']; */
      })

    this.timeSubscription = this.timelineService.timeRangeData.subscribe(
      (data: any) => {
        this.start = data.start;
        this.end = data.end;
        this.changeDetector.detectChanges();
      })
  }

  ngOnDestroy(): void {
    this.uploadedXmlSubscription.unsubscribe();
    this.timeSubscription.unsubscribe();
  }
}