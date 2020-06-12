import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-printer-timeline-parameters',
  templateUrl: './printer-timeline-parameters.component.html',
  styleUrls: ['./printer-timeline-parameters.component.scss']
})
export class PrinterTimelineParametersComponent implements OnInit, OnDestroy {
  private timeUnitsTouchedBefore: boolean;

  private selectedFiles;
  private selectedRequests;
  private selectedOthers;

  private timeTypeSubscription;
  private relativeTimeValueSubscription;
  private relativeTimeUnitsSubscription;
  private formSubscription;

  private createForm() {
    return this.fb.group({
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
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }

  private addRequestsControls() {
    const arr = this.requests.map(item => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }

  private addOthersControls() {
    const arr = this.others.map(item => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }

  private setRelativeValueIsTooBig(isTooBig: boolean) {
    this.relativeValueTooBig = isTooBig;
    if (isTooBig) {
      this.relativeValueControl.setErrors({ 'incorrect': isTooBig });
    }
  }

  private controlRelativeTimeMaxValue(formValueString: string) {
    if (this.allNumbers(formValueString)) {
      let formUnits = this.relativeUnitsControl.value.realValue;
      let formValue = parseInt(formValueString);

      if (formUnits === 'minutes') {
        if (formValue > 60) {
          this.setRelativeValueIsTooBig(true);
        } else {
          this.setRelativeValueIsTooBig(false);
        }
      } else if (formUnits === 'seconds') {
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

  private createTimeTypeSubscription() {
    this.timeTypeSubscription = this.typeOfDateControl.valueChanges.subscribe(val => {
      if (val === 'absolute') {
        this.relativeValueControl.setValue('0', {emitEvent: false});
      }
    });
  }

  private createRelativeTimeValueSubscription() {
    this.relativeTimeValueSubscription = this.relativeValueControl.valueChanges.subscribe(val => {
      this.controlRelativeTimeMaxValue(val);
    });
  }

  private createRelativeTimeUnitsSubscription() {
    this.relativeTimeUnitsSubscription = this.relativeUnitsControl.valueChanges.subscribe(val => {
      if (this.timeUnitsTouchedBefore) {
        this.relativeValueControl.setValue('');
      } else {
        this.timeUnitsTouchedBefore = true;
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
  }

  private secondsDiff(start: Date, end: Date): number {
    let diff = (end.getTime() - start.getTime()) / 1000;
    return Math.abs(Math.round(diff));
  }

  private datesDifferenceIsOkay(start: Date, end: Date) {
    let secondsDiff = this.secondsDiff(start, end);
    return secondsDiff <= 3600;
  }

  private controlFormIsValid() {
    this.formIsValid = this.printerInfoIsValid() && this.dataTypesIsValid() && this.timeIsValid();
  }

  private createFormSubscription() {
    this.formSubscription = this.myForm.valueChanges.subscribe(val => {
      this.controlFormIsValid();
      this.controlAbsoluteDate(); 

      //console.log('this.relativeValueControl.errors: ' + this.relativeValueControl.errors);
      //console.log('this.relativeValueTooBig: ' + this.relativeValueTooBig);
      console.log(this.myForm.value);
    });
  }

  private onChanges(): void {
    this.createTimeTypeSubscription();
    this.createRelativeTimeValueSubscription();
    this.createRelativeTimeUnitsSubscription();
    this.createFormSubscription();
  }

  private createMinDate() {
    let date = new Date();
    date.setMonth(date.getMonth() - 1)
    return date;
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

  public readonly initialStartTime = '00:00';
  public readonly initialEndTime = '00:00';

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
    //console.log(this.myForm.value);
  }

  public getSelectedFilesValue() {
    this.selectedFiles = [];
    this.filesControl.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedFiles.push(this.files[i]);
      }
    });
  }

  public getSelectedRequestsValue() {
    this.selectedRequests = [];
    this.requestsControl.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedRequests.push(this.requests[i]);
      }
    });
  }

  public getSelectedOthersValue() {
    this.selectedOthers = [];
    this.othersControl.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedOthers.push(this.others[i]);
      }
    });
  }

  public formControlhasError(controlName: string, error: string): boolean {
    return this.myForm.get(controlName).hasError(error);
  }

  public allNumbers(text): boolean {
    let numbers = /^[0-9]+$/;
    return text.match(numbers);
  }

  constructor(public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formIsValid = this.relativeValueTooBig = this.timeUnitsTouchedBefore = this.absoluteDatesDifferenceTooBig = false;
    this.startTimePreviousThanEnd = true;

    this.minDate = this.createMinDate();
    this.maxDate = new Date();

    this.files = ['OpenXML', 'Cloud JSON', 'RTA (Real Time Alerts)', 'HB (Heart Beats)'];
    this.selectedFiles = [];

    this.requests = ['Get Configuration Profile', 'Get SQS Credentials'];
    this.selectedRequests = [];

    this.others = ['Printer Subscriptions'];
    this.selectedOthers = [];

    this.relativeUnits = [{ realValue: 'minutes', viewValue: 'Minutes' }, { realValue: 'seconds', viewValue: 'Seconds' }];

    this.myForm = this.createForm();

    this.onChanges();
  }

  ngOnDestroy(): void {
    this.timeTypeSubscription.unsubscribe();
    this.relativeTimeValueSubscription.unsubscribe();
    this.relativeTimeUnitsSubscription.unsubscribe();
    this.formSubscription.unsubscribe();
  }
}