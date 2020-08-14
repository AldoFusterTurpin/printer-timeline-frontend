import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineService } from '../../timeline.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TimelineParametersComponent } from './timeline-parameters.component';

describe('TimelineParametersComponent', () => {
  let component: TimelineParametersComponent;
  let fixture: ComponentFixture<TimelineParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineParametersComponent ],
      imports: [TimelineService, FormBuilder, ReactiveFormsModule] 
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
