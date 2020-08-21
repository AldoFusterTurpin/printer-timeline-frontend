import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleTimelineComponent } from './single-timeline.component';
import { TimelineService } from 'src/app/shared/timeline.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SingleTimelineComponent', () => {
  let component: SingleTimelineComponent;
  let fixture: ComponentFixture<SingleTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTimelineComponent ],
      imports: [BrowserAnimationsModule],
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
