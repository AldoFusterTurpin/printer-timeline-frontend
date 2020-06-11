import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';


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
      }
      this.timeUnitsUntouchedBefore = true;

      this.controlRelativeTimeMaxValue(this.relativeValueControl.value);
    });
  }

  private createAbsoluteDateControlSubscription() {
    this.absoluteDateControlSubscription = this.absoluteDateControl.valueChanges.subscribe(dates => {
      let startDate = dates[0];
      let endDate = dates[1];

      if (startDate != null && endDate != null) {
        this.absoluteValueTooBig = !this.datesDifferenceIsOkay(startDate, endDate);
      }
    });
  }

  private diff_seconds(start: Date, end: Date): number {
    let diff = (end.getTime() - start.getTime()) / 1000;
    return Math.abs(Math.round(diff));
  }

  private datesDifferenceIsOkay(start: Date, end: Date) {
    let diff = this.diff_seconds(start, end);
    return diff < 3600;
  }

  private createFormSubscription() {
    this.formSubscription = this.myForm.valueChanges.subscribe(val => {
      this.formIsValid = this.printerInfoIsValid() && this.dataTypesIsValid() && this.timeIsValid();
      console.log(this.myForm.value);
    });
  }

  private onChanges(): void {
    this.createRelativeValueControlSubscription();
    this.createRelativeUnitsControlSubscription();
    this.createAbsoluteDateControlSubscription();
    this.createFormSubscription();
  }

  private createMinDate() {
    let date = new Date();
    date.setMonth(date.getMonth() - 1)
    return date;
  }

  private createForm() {
    return this.formBuilder.group({
      _PnControl: ['', [Validators.required]],
      _SnControl: ['', [Validators.required]],
      _filesControl: this.addFilesControls(),
      _requestsControl: this.addRequestsControls(),
      _othersControl: this.addOthersControls(),
      _typeOfDateControl: ['relative', [Validators.required]],
      _relativeValueControl: ['', [Validators.required]],
      _relativeUnitsControl: ['', [Validators.required]],
      _absoluteDateControl: ['', [Validators.required]],
      _absoluteDateStart: ['', [Validators.required]],
      _absoluteTimeStart: ['', [Validators.required]],
      _absoluteDateEnd: ['', [Validators.required]],
      _absoluteTimeEnd: ['', [Validators.required]]
    })
  }

  get relativeValueControl() {
    return this.myForm.get('_relativeValueControl');
  }

  get typeOfDateControl() {
    return this.myForm.get('_typeOfDateControl');
  }

  get filesControl() {
    return <FormArray>this.myForm.get('_filesControl');
  }

  get requestsControl() {
    return <FormArray>this.myForm.get('_requestsControl');
  }

  get othersControl() {
    return <FormArray>this.myForm.get('_othersControl');
  }

  get absoluteDateControl() {
    return this.myForm.get('_absoluteDateControl');
  }

  get relativeUnitsControl() {
    return this.myForm.get('_relativeUnitsControl')
  }

  get absoluteDateStart() {
    return this.myForm.get('_absoluteDateStart')
  }

  get absoluteDateEnd() {
    return this.myForm.get('_absoluteDateEnd')
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

  private printerInfoIsValid(): boolean {
    return !this.formControlhasError('_PnControl', 'required') && !this.formControlhasError('_SnControl', 'required');
  }

  private dataTypesIsValid(): boolean {
    return this.filesControl.value.indexOf(true) != -1 || this.requestsControl.value.indexOf(true) != -1 || this.othersControl.value.indexOf(true) != -1;
  }

  private timeIsValid(): boolean {
    if (this.typeOfDateControl.value === 'relative') {
      return !this.relativeValueTooBig &&
        !this.formControlhasError('_relativeUnitsControl', 'required') &&
        this.allNumbers(this.relativeValueControl.value);
    } else if (this.typeOfDateControl.value === 'absolute') {
      return !this.formControlhasError('_absoluteDateControl', 'required') && this.absoluteDateControl.value.indexOf(null) === -1;
    }
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
    this.formIsValid = this.relativeValueTooBig = this.timeUnitsUntouchedBefore = this.absoluteValueTooBig = false;

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