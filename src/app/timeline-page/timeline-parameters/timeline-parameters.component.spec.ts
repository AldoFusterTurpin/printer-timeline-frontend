import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineService } from '../../timeline.service';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TimelineParametersComponent } from './timeline-parameters.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TimelineParametersComponent', () => {
  let component: TimelineParametersComponent;
  let fixture: ComponentFixture<TimelineParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimelineParametersComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [FormBuilder, TimelineService, HttpClient, HttpHandler]
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
