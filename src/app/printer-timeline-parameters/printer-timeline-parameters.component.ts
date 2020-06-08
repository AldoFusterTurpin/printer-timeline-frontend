import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { TimeRangeSelectorComponent } from '../time-range-selector/time-range-selector.component';


@Component({
  selector: 'app-printer-timeline-parameters',
  templateUrl: './printer-timeline-parameters.component.html',
  styleUrls: ['./printer-timeline-parameters.component.scss']
})
export class PrinterTimelineParametersComponent {
  @ViewChild(TimeRangeSelectorComponent, { static: true }) timeRangeForm: TimeRangeSelectorComponent;

  myForm: FormGroup;

  files: Array<String> = ['OpenXML', 'Cloud JSON', 'RTA (Real Time Alerts)', 'HB (Heart Beats)'];
  requests: Array<String> = ['Get Configuration Profile', 'Get SQS Credentials'];
  others: Array<String> = ['Printer Subscriptions'];

  selectedFilesValues = [];
  selectedRequestsValues = [];
  selectedOthersValues = [];


  rangeTypes = [
    {value: 'relative', viewValue: 'Relative'},
    {value: 'absolute', viewValue: 'Absolute'},
  ];

  relativeUnits = [
    {value: 'minutes', viewValue: 'Minutes'},
    {value: 'seconds', viewValue: 'Seconds'},
  ];

  public selectedMoment = new Date();

  public minDate = this.getMinDate();
  public maxDate = new Date();

  public getMinDate() {
    let date = new Date()
    date.setMonth(date.getMonth() - 1)
    return date;
  }

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.createForm()
  }

  private createForm() {
    return this.formBuilder.group({
      PnControl: ['', [Validators.required]],
      SnControl: ['', [Validators.required]],
      filesControl: this.addFilesControls(),
      requestsControl: this.addRequestsControls(),
      othersControl: this.addOthersControls(),
      //timeRange: this.timeRangeForm.createGroup(),
      //
      typeOfDate: ['relative'],
      absoluteDate: ['', [Validators.required]],
      relativeValue:  ['', [Validators.required]],
      relativeUnits:  ['', [Validators.required]]
    })
  }

  addFilesControls() {
    const arr = this.files.map(item => {
      return this.formBuilder.control(false);
    });

    return this.formBuilder.array(arr);
  }

  addRequestsControls() {
    const arr = this.requests.map(item => {
      return this.formBuilder.control(false);
    });

    return this.formBuilder.array(arr);
  }

  addOthersControls() {
    const arr = this.others.map(item => {
      return this.formBuilder.control(false);
    });

    return this.formBuilder.array(arr);
  }

  get filesArray() {
    return <FormArray>this.myForm.get('filesControl');
  }

  get requestsArray() {
    return <FormArray>this.myForm.get('requestsControl');
  }

  get othersArray() {
    return <FormArray>this.myForm.get('othersControl');
  }

  getSelectedFilesValue() {
    this.selectedFilesValues = [];
    this.filesArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedFilesValues.push(this.files[i]);
      }
    });
  }

  getSelectedRequestsValue() {
    this.selectedRequestsValues = [];
    this.requestsArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedRequestsValues.push(this.requests[i]);
      }
    });
  }

  getSelectedOthersValue() {
    this.selectedOthersValues = [];
    this.othersArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedOthersValues.push(this.others[i]);
      }
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  public isRelativeTime() {
    return this.myForm.get('typeOfDate').value === "relative";
  }

  public isAbsoluteDateEmpty() {
    return this.myForm.get('absoluteDate').value == '';
  }

  submitForm() {
    console.log(this.myForm.value)
  }
}