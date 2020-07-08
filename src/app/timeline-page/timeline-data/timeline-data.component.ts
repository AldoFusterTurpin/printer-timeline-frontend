import { Component, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { TimelineService } from '../../timeline.service';
import { Subscription } from 'rxjs';
import { TimelineData } from 'timelineData';
import { ElementType } from 'ElementType';

@Component({
  selector: 'app-timeline-data',
  templateUrl: './timeline-data.component.html',
  styleUrls: ['./timeline-data.component.scss']
})
export class TimelineDataComponent implements AfterViewInit {
  public uploadedXmlTimelineData: TimelineData = null;

  private uploadedXmlSubscription: Subscription;

  constructor(private timelineService: TimelineService, private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.uploadedXmlSubscription = this.timelineService.uploadedXmlData.subscribe(
      (data: any) => {
        let tableDescription = 'Printers sent '+ ElementType.OpenXml + 'files in the selected time range';
        this.uploadedXmlTimelineData = new TimelineData(data, ElementType.OpenXml, tableDescription);
      })
  }

  ngOnDestroy(): void {
    this.uploadedXmlSubscription.unsubscribe();
  }
}