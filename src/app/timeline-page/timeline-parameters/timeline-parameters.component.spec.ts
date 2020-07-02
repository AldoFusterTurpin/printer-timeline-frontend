import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineParametersComponent } from './timeline-parameters.component';

describe('TimelineParametersComponent', () => {
  let component: TimelineParametersComponent;
  let fixture: ComponentFixture<TimelineParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
