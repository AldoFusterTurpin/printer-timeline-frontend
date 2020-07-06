import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline-page-wrapper',
  templateUrl: './timeline-page-wrapper.component.html',
  styleUrls: ['./timeline-page-wrapper.component.scss']
})
export class TimelinePageWrapperComponent implements OnInit {
  public showTimeline: boolean;

  public onFormSubmited(formSubmited: boolean) {
    this.showTimeline = formSubmited;
  }

  public hideTimeline() {
    this.showTimeline = false;
  }

  constructor() { }

  ngOnInit(): void {
    this.showTimeline = false;
  }

}
