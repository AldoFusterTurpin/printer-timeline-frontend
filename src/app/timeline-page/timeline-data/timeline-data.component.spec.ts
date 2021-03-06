import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TimelineDataComponent } from './timeline-data.component';
import { TimelineService } from 'src/app/shared/timeline.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TimelineDataComponent', () => {
  let component: TimelineDataComponent;
  let fixture: ComponentFixture<TimelineDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineDataComponent],
      imports: [ MatSnackBarModule ],
      providers: [TimelineService, HttpClient, HttpHandler],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
