import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTimelineComponent } from './single-timeline.component';
import { TimelineService } from 'src/app/timeline.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

describe('SingleTimelineComponent', () => {
  let component: SingleTimelineComponent;
  let fixture: ComponentFixture<SingleTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTimelineComponent ],
      providers: [TimelineService, HttpClient, HttpHandler, MatSnackBar, Overlay]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
