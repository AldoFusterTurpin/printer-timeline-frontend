import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-printer-timeline-section',
  templateUrl: './printer-timeline-section.component.html',
  styleUrls: ['./printer-timeline-section.component.scss']
})
export class PrinterTimelineSectionComponent implements OnInit {
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
