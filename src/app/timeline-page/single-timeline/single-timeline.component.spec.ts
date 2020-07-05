import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTimelineComponent } from './single-timeline.component';

describe('SingleTimelineComponent', () => {
  let component: SingleTimelineComponent;
  let fixture: ComponentFixture<SingleTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTimelineComponent ]
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
