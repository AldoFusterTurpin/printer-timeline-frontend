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

  formGroup: FormGroup;

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
    this.formGroup = this.formBuilder.group({
      typeOfDate: ['relative'],
      myDate: ['', [Validators.required]]
    },);

    return this.formGroup;
  }

  ngOnInit(): void { }

  date(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.formGroup.get('myDate').setValue(convertDate, {
      onlyself: true
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.formGroup.controls[control].hasError(error);
  }

  public isRelativeTime() {
    return this.formGroup.get('typeOfDate').value === "relative";
  }
}
