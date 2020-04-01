import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-time-range-selector',
  templateUrl: './time-range-selector.component.html',
  styleUrls: ['./time-range-selector.component.scss']
})
export class TimeRangeSelectorComponent implements OnInit {
  timeRangeFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  createGroup() {
    this.timeRangeFormGroup = this.formBuilder.group({
      myDate: ['', [Validators.required]],
    });

    return this.timeRangeFormGroup;
  }

  ngOnInit(): void { }

  date(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.timeRangeFormGroup.get('myDate').setValue(convertDate, {
      onlyself: true
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.timeRangeFormGroup.controls[control].hasError(error);
  }

}
