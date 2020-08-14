import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinePageWrapperComponent } from './timeline-page-wrapper.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TimelinePageWrapperComponent', () => {
  let component: TimelinePageWrapperComponent;
  let fixture: ComponentFixture<TimelinePageWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinePageWrapperComponent ],
      imports: [HttpClientTestingModule], 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinePageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
