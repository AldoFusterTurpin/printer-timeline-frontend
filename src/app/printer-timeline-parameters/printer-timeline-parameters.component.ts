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

  files: Array<String> = ['OpenXML', 'Cloud JSON', 'RTA (Real Time Alerts)', 'HB (Heart Beats)'];
  requests: Array<String> = ['Get Configuration Profile', 'Get SQS Credentials'];
  others: Array<String> = ['Printer Subscriptions'];

  selectedFilesValues = [];
  selectedRequestsValues = [];
  selectedOthersValues = [];

  myForm: FormGroup;

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
      timeRange: this.timeRangeForm.createGroup()
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

  submitForm() {
    console.log(this.myForm.value)
  }
}