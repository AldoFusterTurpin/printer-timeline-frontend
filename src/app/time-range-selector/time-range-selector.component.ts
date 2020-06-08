import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-time-range-selector',
  templateUrl: './time-range-selector.component.html',
  styleUrls: ['./time-range-selector.component.scss']
})
export class TimeRangeSelectorComponent implements OnInit {
  
  rangeTypes = [
    {value: 'relative', viewValue: 'Relative'},
    {value: 'absolute', viewValue: 'Absolute'},
  ];

  relativeUnits = [
    {value: 'minutes', viewValue: 'Minutes'},
    {value: 'seconds', viewValue: 'Seconds'},
  ];

  myForm: FormGroup;

  public selectedMoment = new Date();

  public minDate = this.getMinDate();
  public maxDate = new Date();

  constructor(private formBuilder: FormBuilder) { }

  public getMinDate() {
    let date = new Date()
    date.setMonth(date.getMonth() - 1)
    return date;
  }

  createGroup() {
    return this.formBuilder.group({
      typeOfDate: ['relative'],
      absoluteDate: ['', [Validators.required]],
      relativeValue:  ['', [Validators.required]],
      relativeUnits:  ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.myForm = this.createGroup();
   }

  date(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.myForm.get('absoluteDate').setValue(convertDate, {
      onlyself: true
    })
  }

  public errorHandling(ctrl: string, error: string) {
    return this.myForm.controls[ctrl].hasError(error);
  }

  public isRelativeTime() {
    return this.myForm.get('typeOfDate').value === "relative";
  }

  public isAbsoluteDateEmpty() {
    return this.myForm.get('absoluteDate').value == '';
  }

}
