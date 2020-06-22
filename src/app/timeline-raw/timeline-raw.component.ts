import { Component, OnInit } from '@angular/core';

import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-timeline-raw',
  templateUrl: './timeline-raw.component.html',
  styleUrls: ['./timeline-raw.component.scss']
})
export class TimelineRawComponent implements OnInit {
  uploadedXmls: JSON = null;

  constructor(private timelineService: TimelineService) { }

  ngOnInit(): void {
    this.getUploadedXmls();
  }

  getUploadedXmls(): void {
    this.timelineService.getUploadedXmls()
      .subscribe(xmls => this.uploadedXmls = xmls);
  }

}
