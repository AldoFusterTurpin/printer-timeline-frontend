import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";


@Component({
  selector: 'app-printer-timeline-parameters',
  templateUrl: './printer-timeline-parameters.component.html',
  styleUrls: ['./printer-timeline-parameters.component.scss']
})
export class PrinterTimelineParametersComponent {
  myForm: FormGroup;

  files: Array<String> = ['OpenXML', 'Cloud JSON', 'RTA (Real Time Alerts)', 'HB (Heart Beats)'];
  requests: Array<String> = ['Get Configuration Profile', 'Get SQS Credentials'];
  others: Array<String> = ['Printer Subscriptions'];

  selectedFilesValues = [];
  selectedRequestsValues = [];
  selectedOthersValues = [];

  rangeTypes = [
    { value: 'relative', viewValue: 'Relative' },
    { value: 'absolute', viewValue: 'Absolute' },
  ];

  relativeUnits = [
    { value: 'minutes', viewValue: 'Minutes' },
    { value: 'seconds', viewValue: 'Seconds' },
  ];

  private allNumbers(text) {
    var numbers = /^[0-9]+$/;
    return text.match(numbers);
  }

  public minDate = this.getMinDate();
  public maxDate = new Date();

  private getMinDate() {
    let date = new Date()
    date.setMonth(date.getMonth() - 1)
    return date;
  }

  private createForm() {
    return this.formBuilder.group({
      PnControl: ['', [Validators.required]],
      SnControl: ['', [Validators.required]],
      filesControl: this.addFilesControls(),
      requestsControl: this.addRequestsControls(),
      othersControl: this.addOthersControls(),
      typeOfDate: ['relative', [Validators.required]],
      relativeValue: ['', [Validators.required]],
      relativeUnits: ['', [Validators.required]],
      absoluteDate: ['', [Validators.required]]
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
  getSelectedFilesValue() {
    this.selectedFilesValues = [];
    this.filesArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedFilesValues.push(this.files[i]);
      }
    });
  }

  get requestsArray() {
    return <FormArray>this.myForm.get('requestsControl');
  }

  getSelectedRequestsValue() {
    this.selectedRequestsValues = [];
    this.requestsArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedRequestsValues.push(this.requests[i]);
      }
    });
  }

  get othersArray() {
    return <FormArray>this.myForm.get('othersControl');
  }

  getSelectedOthersValue() {
    this.selectedOthersValues = [];
    this.othersArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedOthersValues.push(this.others[i]);
      }
    });
  }

  public formControlhasError(controlName: string, error: string): boolean {
    return this.myForm.controls[controlName].hasError(error);
  }

  public isRelativeTime(): boolean {
    return this.myForm.get('typeOfDate').value === "relative";
  }

  private isAbsoluteDateEmpty(): boolean {
    return this.myForm.get('absoluteDate').value == '';
  }

  private printerInfoIsValid(): boolean {
    return !this.formControlhasError('PnControl', 'required') && !this.formControlhasError('SnControl', 'required');
  }

  private dataTypesIsValid(): boolean {
    return this.myForm.controls["filesControl"].value.indexOf(true) != -1 ||
      this.myForm.controls["requestsControl"].value.indexOf(true) != -1 ||
      this.myForm.controls["othersControl"].value.indexOf(true) != -1;
  }

  private timeIsValid(): boolean {
    if (this.myForm.controls["typeOfDate"].value == "relative") {
      return !this.formControlhasError('relativeValue', 'required') && !this.formControlhasError('relativeUnits', 'required') &&
        this.allNumbers(this.myForm.controls["relativeValue"].value);
    }

    if (this.myForm.controls["typeOfDate"].value == "absolute") {
      return !this.formControlhasError('absoluteDate', 'required');
    }
    return false;
  }

  public relativeAndAbsoluteTimeSelectedConflict(): boolean {
    return this.myForm.controls["relativeValue"].value != "" && this.myForm.controls["relativeValue"].value != "" &&
      this.myForm.controls["absoluteDate"].value != ""
  }

  public formIsValid(): boolean {
    return this.printerInfoIsValid() && this.dataTypesIsValid() && this.timeIsValid();
  }

  submitForm(): void {
    console.log(this.myForm.value)
  }

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.createForm()
  }
}