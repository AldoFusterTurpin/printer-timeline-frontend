import { Component, OnInit } from '@angular/core';

import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-timeline-raw',
  templateUrl: './timeline-raw.component.html',
  styleUrls: ['./timeline-raw.component.scss']
})
export class TimelineRawComponent implements OnInit {
  public start: Date;
  public end: Date;

  public uploadedXmlsResponse: JSON = null;
  public uploadedXmls: JSON[] = null;

  constructor(private timelineService: TimelineService) { }

  ngOnInit(): void {
    this.timelineService.uploadedXmlData.subscribe(data => {
      this.uploadedXmlsResponse = data;
      this.uploadedXmls = data['Results'];
    })

    this.timelineService.timeRangeData.subscribe(data => {
      console.log(data)      
      this.start = data.start;
      this.end = data.end;
    })
  }
}
