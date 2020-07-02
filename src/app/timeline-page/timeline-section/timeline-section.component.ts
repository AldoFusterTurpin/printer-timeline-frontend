import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline-section',
  templateUrl: './timeline-section.component.html',
  styleUrls: ['./timeline-section.component.scss']
})
export class TimelineSectionComponent implements OnInit {
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
