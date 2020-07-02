import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineDataComponent } from './timeline-data.component';

describe('TimelineDataComponent', () => {
  let component: TimelineDataComponent;
  let fixture: ComponentFixture<TimelineDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineDataComponent ]
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
