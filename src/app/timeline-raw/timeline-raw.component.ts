import { Component, OnInit } from '@angular/core';

import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-timeline-raw',
  templateUrl: './timeline-raw.component.html',
  styleUrls: ['./timeline-raw.component.scss']
})
export class TimelineRawComponent implements OnInit {
  uploadedXmlsResponse: JSON = null;
  uploadedXmls:Array<JSON> = null; 

  constructor(private timelineService: TimelineService) { }

  ngOnInit(): void {
    this.timelineService.data.subscribe(data => {
      this.uploadedXmlsResponse = data;
      this.uploadedXmls = data['Results'];
      console.log(data);
    })
  }
}
