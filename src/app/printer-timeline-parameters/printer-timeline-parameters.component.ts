import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-printer-timeline-parameters',
  templateUrl: './printer-timeline-parameters.component.html',
  styleUrls: ['./printer-timeline-parameters.component.scss']
})
export class PrinterTimelineParametersComponent implements OnInit, OnDestroy {
  public readonly initialStartTime = '00:00';
  public readonly initialEndTime = '00:00';
  private timeUnitsUntouchedBefore: boolean; 
  private selectedFilesValues = [];
  private selectedRequestsValues = [];
  private selectedOthersValues = [];

  private relativeValueControlSubscription;
  private relativeUnitsControlSubscription;
  private absoluteDateControlSubscription;
  private formSubscription;

  private createForm() {
    return this.formBuilder.group({
      _PnControl: ['', [Validators.required]],
      _SnControl: ['', [Validators.required]],
      _filesControl: this.addFilesControls(),
      _requestsControl: this.addRequestsControls(),
      _othersControl: this.addOthersControls(),
      _typeOfDateControl: ['relative', [Validators.required]],
      _relativeTimeValueControl: ['', [Validators.required]],
      _relativeTimeUnitsControl: ['', [Validators.required]],
      _absoluteDateStartControl: [null, [Validators.required]],
      _absoluteTimeStartControl: [this.initialStartTime, [Validators.required]],
      _absoluteDateEndControl: [null, [Validators.required]],
      _absoluteTimeEndControl: [this.initialEndTime, [Validators.required]]
    })
  }

  private setRelativeValueIsTooBig(b: boolean) {
    this.relativeValueTooBig = b;
    if (b) {
      this.relativeValueControl.setErrors({ 'incorrect': b });
    }
  }

  private controlRelativeTimeMaxValue(formValueString) {
    if (this.allNumbers(formValueString)) {
      let formUnits = this.relativeUnitsControl.value.realValue;
      let formValue = parseInt(formValueString);

      if (formUnits == 'minutes') {
        if (formValue > 60) {
          this.setRelativeValueIsTooBig(true);
        } else {
          this.setRelativeValueIsTooBig(false);
        }
      } else if (formUnits == 'seconds') {
        if (formValue > 3600) {
          this.setRelativeValueIsTooBig(true);
        } else {
          this.setRelativeValueIsTooBig(false);
        }
      }
    } else {
      this.setRelativeValueIsTooBig(false);
    }
  }

  private createRelativeValueControlSubscription() {
    this.relativeValueControlSubscription = this.relativeValueControl.valueChanges.subscribe(val => {
      this.controlRelativeTimeMaxValue(val);
    });
  }

  private createRelativeUnitsControlSubscription() {
    this.relativeUnitsControlSubscription = this.relativeUnitsControl.valueChanges.subscribe(val => {
      if (this.timeUnitsUntouchedBefore) {
        this.relativeValueControl.setValue('');
      } else {
        this.timeUnitsUntouchedBefore = true;
      }
      this.controlRelativeTimeMaxValue(this.relativeValueControl.value);
    });
  }

  private controlAbsoluteDate() {
    if (this.absoluteDateStart.value === null || this.absoluteDateEnd.value === null) {
      return;
    }
    let startTime = this.absoluteTimeStart.value;
    this.absoluteDateStart.value.setHours(startTime.slice(0, 2), startTime.slice(3, 5), 0);

    let endTime = this.absoluteTimeEnd.value;
    this.absoluteDateEnd.value.setHours(endTime.slice(0, 2), endTime.slice(3, 5), 0);

    this.startTimePreviousThanEnd = this.absoluteDateStart.value < this.absoluteDateEnd.value;
    this.absoluteDatesDifferenceTooBig = !this.datesDifferenceIsOkay(this.absoluteDateStart.value, this.absoluteDateEnd.value);
    console.log(this.startTimePreviousThanEnd)
  }

  private diff_seconds(start: Date, end: Date): number {
    let diff = (end.getTime() - start.getTime()) / 1000;
    return Math.abs(Math.round(diff));
  }

  private datesDifferenceIsOkay(start: Date, end: Date) {
    let diff = this.diff_seconds(start, end);
    return diff < 3600;
  }

  private controlFormIsValid() {
    this.formIsValid = this.printerInfoIsValid() && this.dataTypesIsValid() && this.timeIsValid();
  }

  private createFormSubscription() {
    this.formSubscription = this.myForm.valueChanges.subscribe(val => {
      this.controlFormIsValid();
      this.controlAbsoluteDate();
      console.log(this.myForm.value);
    });
  }

  private onChanges(): void {
    this.createRelativeValueControlSubscription();
    this.createRelativeUnitsControlSubscription();
    this.createFormSubscription();
  }

  private createMinDate() {
    let date = new Date();
    date.setMonth(date.getMonth() - 1)
    return date;
  }

  get relativeValueControl() { return this.myForm.get('_relativeTimeValueControl'); }

  get typeOfDateControl() { return this.myForm.get('_typeOfDateControl'); }

  get filesControl() { return <FormArray>this.myForm.get('_filesControl'); }

  get requestsControl() { return <FormArray>this.myForm.get('_requestsControl'); }

  get othersControl() { return <FormArray>this.myForm.get('_othersControl'); }

  get relativeUnitsControl() { return this.myForm.get('_relativeTimeUnitsControl'); }

  get absoluteDateStart() { return this.myForm.get('_absoluteDateStartControl'); }

  get absoluteTimeStart() { return this.myForm.get('_absoluteTimeStartControl'); }

  get absoluteDateEnd() { return this.myForm.get('_absoluteDateEndControl'); }

  get absoluteTimeEnd() { return this.myForm.get('_absoluteTimeEndControl'); }

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

  private printerInfoIsValid(): boolean {
    return !this.formControlhasError('_PnControl', 'required') && !this.formControlhasError('_SnControl', 'required');
  }

  private dataTypesIsValid(): boolean {
    return this.filesControl.value.indexOf(true) != -1 || this.requestsControl.value.indexOf(true) != -1 || this.othersControl.value.indexOf(true) != -1;
  }

  private timeIsValid(): boolean {
    if (this.typeOfDateControl.value === 'relative') {
      return !this.relativeValueTooBig && !this.formControlhasError('_relativeTimeUnitsControl', 'required') && this.allNumbers(this.relativeValueControl.value);
    } 
    
    if (this.typeOfDateControl.value === 'absolute') {
      let startOk = !this.formControlhasError('_absoluteDateStartControl', 'required') &&
        this.absoluteDateStart.value != null &&
        !this.formControlhasError('_absoluteTimeStartControl', 'required') &&
        this.absoluteTimeStart.value != '';

      let endOk = !this.formControlhasError('_absoluteDateEndControl', 'required')
        && this.absoluteDateEnd.value != null &&
        !this.formControlhasError('_absoluteTimeEndControl', 'required') &&
        this.absoluteTimeEnd.value != '';

      return startOk && endOk && !this.absoluteDatesDifferenceTooBig;
    }
  }

  public myForm: FormGroup;
  public formIsValid: boolean;

  public files: Array<String>;
  public requests: Array<String>;
  public others: Array<String>;

  public relativeValueTooBig: boolean;
  public absoluteDatesDifferenceTooBig: boolean;
  public startTimePreviousThanEnd: boolean;

  public relativeUnits;

  public minDate: Date;
  public maxDate: Date;

  public submitForm(): void {
    console.log(this.myForm.value);
  }

  public getSelectedFilesValue() {
    this.selectedFilesValues = [];
    this.filesControl.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedFilesValues.push(this.files[i]);
      }
    });
  }

  public getSelectedRequestsValue() {
    this.selectedRequestsValues = [];
    this.requestsControl.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedRequestsValues.push(this.requests[i]);
      }
    });
  }

  public getSelectedOthersValue() {
    this.selectedOthersValues = [];
    this.othersControl.controls.forEach((control, i) => {
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
    this.formIsValid = this.relativeValueTooBig = this.timeUnitsUntouchedBefore = this.absoluteDatesDifferenceTooBig = false;
    this.startTimePreviousThanEnd = true;

    this.minDate = this.createMinDate();
    this.maxDate = new Date();

    this.files = ['OpenXML', 'Cloud JSON', 'RTA (Real Time Alerts)', 'HB (Heart Beats)'];
    this.requests = ['Get Configuration Profile', 'Get SQS Credentials'];
    this.others = ['Printer Subscriptions'];

    this.relativeUnits = [{ realValue: 'minutes', viewValue: 'Minutes' }, { realValue: 'seconds', viewValue: 'Seconds' }];

    this.myForm = this.createForm();
    this.onChanges();
  }

  ngOnDestroy(): void {
    this.relativeValueControlSubscription.unsubscribe();
    this.relativeUnitsControlSubscription.unsubscribe();
    this.absoluteDateControlSubscription.unsubscribe();
    this.formSubscription.unsubscribe();
  }
}