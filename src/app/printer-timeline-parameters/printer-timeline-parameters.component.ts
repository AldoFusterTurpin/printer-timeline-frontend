import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";


@Component({
  selector: 'app-printer-timeline-parameters',
  templateUrl: './printer-timeline-parameters.component.html',
  styleUrls: ['./printer-timeline-parameters.component.scss']
})
export class PrinterTimelineParametersComponent implements OnInit, OnDestroy {
  private timeUnitsUntouchedBefore: boolean;
  private selectedFilesValues = [];
  private selectedRequestsValues = [];
  private selectedOthersValues = [];

  private relativeValueControlSubscription;
  private relativeUnitsControlSubscription;
  private absoluteDateControlSubscription;
  private formSubscription;

  private setMaxValueIsTooBig(b: boolean) {
    this.relativeValueTooBig = b;
    if (b) {
      this.myForm.controls['relativeValueControl'].setErrors({ 'incorrect': b });
    }
  }

  private controlRelativeTimeMaxValue(formValueString) {
    if (this.allNumbers(formValueString)) {
      let formUnits = this.myForm.get("relativeUnitsControl").value.realValue;
      let formValue = parseInt(formValueString);

      if (formUnits == "minutes") {
        if (formValue > 60) {
          this.setMaxValueIsTooBig(true);
        } else {
          this.setMaxValueIsTooBig(false);
        }
      } else if (formUnits == "seconds") {
        if (formValue > 3600) {
          this.setMaxValueIsTooBig(true);
        } else {
          this.setMaxValueIsTooBig(false);
        }
      }
    } else {
      this.setMaxValueIsTooBig(false);
    }
  }

  private createRelativeValueControlSubscription() {
    this.relativeValueControlSubscription = this.myForm.get('relativeValueControl').valueChanges.subscribe(val => {
      this.controlRelativeTimeMaxValue(val);
    });
  }

  private createRelativeUnitsControlSubscription() {
    this.relativeUnitsControlSubscription = this.myForm.get('relativeUnitsControl').valueChanges.subscribe(val => {
      if (this.timeUnitsUntouchedBefore) {
        this.myForm.get("relativeValueControl").setValue("");
      }
      this.timeUnitsUntouchedBefore = true;

      this.controlRelativeTimeMaxValue(this.myForm.get('relativeValueControl').value);
    });
  }

  private createAbsoluteDateControlSubscription() {
    this.absoluteDateControlSubscription = this.myForm.get('absoluteDateControl').valueChanges.subscribe(dates => {
      let startDate = dates[0];
      let endDate = dates[1];

      //TODO THE ERROR APPEARS BECAUSE NG PICKER RETURNS A GENERAL OBJECT AND I WANT A DATE OBJECT! NEED TO CAST
      console.log("Start: " + typeof startDate);
      console.log("End: " + typeof endDate);

      if (startDate != null && endDate && null) {
        this.absoluteValueTooBig = !this.datesDifferenceIsOkay(startDate, endDate);
      }

      console.log("this.absoluteValueTooBig: " + this.absoluteValueTooBig);
    });
  }

  private createFormSubscription() {
    this.formSubscription = this.myForm.valueChanges.subscribe(val => {
      this.formIsValid = this.printerInfoIsValid() && this.dataTypesIsValid() && this.timeIsValid();
    });
  }

  private onChanges(): void {
    this.createRelativeValueControlSubscription();
    this.createRelativeUnitsControlSubscription();
    this.createAbsoluteDateControlSubscription();
    this.createFormSubscription();
  }

  private diff_seconds(start, end): number {
    let diff = (end.getTime() - start.getTime()) / 1000;
    return Math.abs(Math.round(diff));
  }

  private datesDifferenceIsOkay(start: Date, end: Date) {
    /* let diff = end.getTime() - start.getTime();
    let diffSeconds = Math.abs(diff/1000);
    return diffSeconds <= 3600; */

    let diff = this.diff_seconds(start, end);
    return diff < 3600;
  }

  private getMinDate() {
    let date = new Date();
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
      typeOfDateControl: ['relative', [Validators.required]],
      relativeValueControl: ['', [Validators.required]],
      relativeUnitsControl: ['', [Validators.required]],
      absoluteDateControl: ['', [Validators.required]]
    })
  }

  private addFilesControls() {
    const arr = this.files.map(item => {
      return this.formBuilder.control(false);
    });
    return this.formBuilder.array(arr);
  }

  private addRequestsControls() {
    const arr = this.requests.map(item => {
      return this.formBuilder.control(false);
    });
    return this.formBuilder.array(arr);
  }

  private addOthersControls() {
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

  private printerInfoIsValid(): boolean {
    return !this.formControlhasError('PnControl', 'required') && !this.formControlhasError('SnControl', 'required');
  }

  private dataTypesIsValid(): boolean {
    return this.myForm.get("filesControl").value.indexOf(true) != -1 ||
      this.myForm.get("requestsControl").value.indexOf(true) != -1 ||
      this.myForm.get("othersControl").value.indexOf(true) != -1;
  }

  private timeIsValid(): boolean {
    if (this.myForm.get("typeOfDateControl").value == "relative") {
      if (this.relativeValueTooBig) {
        return false;
      }

      if (this.formControlhasError('relativeUnitsControl', 'required')) {
        return false;
      }

      if (!this.allNumbers(this.myForm.get("relativeValueControl").value)) {
        return false;
      }

      return true;
    }

    if (this.myForm.get("typeOfDateControl").value == "absolute") {
      return !this.formControlhasError('absoluteDateControl', 'required') && this.myForm.get('absoluteDateControl').value.indexOf(null) == -1;
    }
    return !this.relativeValueTooBig;
  }

  public myForm: FormGroup;
  public formIsValid: boolean;

  public files: Array<String>;
  public requests: Array<String>;
  public others: Array<String>;

  public relativeValueTooBig: boolean;
  public absoluteValueTooBig: boolean;

  public relativeUnits;

  public minDate: Date;
  public maxDate: Date;

  public submitForm(): void {
    console.log(this.myForm.value);
  }

  public getSelectedFilesValue() {
    this.selectedFilesValues = [];
    this.filesArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedFilesValues.push(this.files[i]);
      }
    });
  }

  public getSelectedRequestsValue() {
    this.selectedRequestsValues = [];
    this.requestsArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedRequestsValues.push(this.requests[i]);
      }
    });
  }

  public getSelectedOthersValue() {
    this.selectedOthersValues = [];
    this.othersArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedOthersValues.push(this.others[i]);
      }
    });
  }

  public formControlhasError(controlName: string, error: string): boolean {
    return this.myForm.get(controlName).hasError(error);
  }

  public allNumbers(text): boolean {
    var numbers = /^[0-9]+$/;
    return text.match(numbers);
  }

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formIsValid = this.relativeValueTooBig = this.timeUnitsUntouchedBefore = this.absoluteValueTooBig = false;

    this.minDate = this.getMinDate();
    this.maxDate = new Date();

    this.files = ['OpenXML', 'Cloud JSON', 'RTA (Real Time Alerts)', 'HB (Heart Beats)'];
    this.requests = ['Get Configuration Profile', 'Get SQS Credentials'];
    this.others = ['Printer Subscriptions'];

    this.relativeUnits = [{ realValue: 'minutes', viewValue: 'Minutes' }, { realValue: 'seconds', viewValue: 'Seconds' }];

    this.myForm = this.createForm();
    this.onChanges();
  }

  ngOnDestroy() {
    this.relativeValueControlSubscription.unsubscribe();
    this.relativeUnitsControlSubscription.unsubscribe();
    this.absoluteDateControlSubscription.unsubscribe();
    this.formSubscription.unsubscribe();
  }
}