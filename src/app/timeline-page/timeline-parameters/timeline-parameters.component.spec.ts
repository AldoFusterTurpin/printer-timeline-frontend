import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineService } from '../../shared/timeline.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { TimelineParametersComponent } from './timeline-parameters.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

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

  beforeEach(async() => {
    fixture = TestBed.createComponent(TimelineParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have formIsValid to false on creation', () => {
    let expected = false;
    expect(component.formIsValid).toBe(expected, 'formIsValid should be ' + expected);
  });



  /* it('should have formIsValid to true when giving correct values to forms', async (() => {
    //TODO: can't make this work...
    const form = component.myForm;

    const pn = form.controls._PnControl;
    pn.setValue('any');

    const sn = form.controls._SnControl;
    sn.setValue('any');

    const files = <FormArray>form.controls._filesControl;
    files.controls['0'].value = true;

    fixture.detectChanges();
    
    const relativeTimeValue = form.controls._relativeTimeValueControl;
    relativeTimeValue.setValue('3');
    
    const relativeTimeUnits = form.controls._relativeTimeUnitsControl;
    relativeTimeUnits.setValue('minutes');
    
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      
      console.log(form);
      let expected = true;  
      expect(component.formIsValid).toBe(expected, 'formIsValid should be ' + expected);
    });
  }));*/

});
