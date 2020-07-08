import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TimelineService } from 'src/app/timeline.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timeline-page-wrapper',
  templateUrl: './timeline-page-wrapper.component.html',
  styleUrls: ['./timeline-page-wrapper.component.scss']
})
export class TimelinePageWrapperComponent implements OnInit {
  private timeSubscription: Subscription;
  public start: Date;
  public end: Date;

  public showTimeline: boolean;

  public onFormSubmited(formSubmited: boolean) {
    this.showTimeline = formSubmited;
  }

  public hideTimeline() {
    this.showTimeline = false;
  }

  constructor(private timelineService: TimelineService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.showTimeline = false;

    this.timeSubscription = this.timelineService.timeRangeData.subscribe(
      (data: any) => {
        this.start = data.start;
        this.end = data.end;
        this.changeDetector.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe();
  }

}
