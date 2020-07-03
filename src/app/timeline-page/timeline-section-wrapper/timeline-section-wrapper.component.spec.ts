import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineSectionWrapperComponent } from './timeline-section-wrapper.component';

describe('TimelineSectionWrapperComponent', () => {
  let component: TimelineSectionWrapperComponent;
  let fixture: ComponentFixture<TimelineSectionWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineSectionWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineSectionWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
