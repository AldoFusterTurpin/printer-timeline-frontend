import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TimelineService } from 'src/app/shared/timeline.service';
import { Subscription } from 'rxjs';
import { ElementType } from 'src/app/shared/ElementType';
import Utils from 'src/app/shared/utils';

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
  public valuesSelected: ElementType[];

  public onValuesSelected(valuesSelected: ElementType[]) {
    this.valuesSelected = valuesSelected;
    this.showTimeline = true;
  }

  public hideTimeline() {
    this.timelineService.cleanSources().subscribe(); 
    this.showTimeline = false;
  }

  public longRepresentationOf(d: Date) {
    return d.toLocaleString('en-GB');
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
