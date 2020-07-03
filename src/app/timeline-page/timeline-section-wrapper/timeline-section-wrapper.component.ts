import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline-section-wrapper',
  templateUrl: './timeline-section-wrapper.component.html',
  styleUrls: ['./timeline-section-wrapper.component.scss']
})
export class TimelineSectionWrapperComponent implements OnInit {
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
