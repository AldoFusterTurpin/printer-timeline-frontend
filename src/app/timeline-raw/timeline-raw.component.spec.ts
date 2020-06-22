import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineRawComponent } from './timeline-raw.component';

describe('TimelineRawComponent', () => {
  let component: TimelineRawComponent;
  let fixture: ComponentFixture<TimelineRawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineRawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineRawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
