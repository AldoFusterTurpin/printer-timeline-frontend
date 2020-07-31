import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { TimelineService } from '../../timeline.service';


@Component({
  selector: 'app-timeline-parameters',
  templateUrl: './timeline-parameters.component.html',
  styleUrls: ['./timeline-parameters.component.scss']
})
export class TimelineParametersComponent implements OnInit, OnDestroy {

  @Output()
  formSubmited: EventEmitter<boolean> = new EventEmitter<boolean>();

  private timeUnitsTouchedBefore = false;
  private selectedFiles: String[] = [];
  private selectedRequests: String[] = [];
  private selectedOthers: String[] = [];
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

  get pnControl() { return this.myForm.get('_PnControl'); }
  get snControl() { return this.myForm.get('_SnControl'); }

  get filesControl() { return <FormArray>this.myForm.get('_filesControl'); }
  get requestsControl() { return <FormArray>this.myForm.get('_requestsControl'); }
  get othersControl() { return <FormArray>this.myForm.get('_othersControl'); }

  get typeOfDateControl() { return this.myForm.get('_typeOfDateControl'); }

  get relativeTimeValueControl() { return this.myForm.get('_relativeTimeValueControl'); }
  get relativeTimeUnitsControl() { return this.myForm.get('_relativeTimeUnitsControl'); }

  get absoluteDateStartControl() { return this.myForm.get('_absoluteDateStartControl'); }
  get absoluteTimeStartControl() { return this.myForm.get('_absoluteTimeStartControl'); }

  get absoluteDateEndControl() { return this.myForm.get('_absoluteDateEndControl'); }
  get absoluteTimeEndControl() { return this.myForm.get('_absoluteTimeEndControl'); }

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

  private setRelativeTimeValueIsTooBig(isTooBig: boolean) {
    this.relativeValueTooBig = isTooBig;
    if (isTooBig) {
      this.relativeTimeValueControl.setErrors({ 'incorrect': isTooBig });
    }
  }

  private controlMaxValueOfRelativeTime(formValueString: string) {
    if (this.allCharsAreNumbers(formValueString)) {
      let formUnits = this.relativeTimeUnitsControl.value.realValue;
      let formValue = parseInt(formValueString);

      if (formUnits === 'minutes') {
        if (formValue > 60) {
          this.setRelativeTimeValueIsTooBig(true);
        } else {
          this.setRelativeTimeValueIsTooBig(false);
        }
      } else if (formUnits === 'seconds') {
        if (formValue > 3600) {
          this.setRelativeTimeValueIsTooBig(true);
        } else {
          this.setRelativeTimeValueIsTooBig(false);
        }
      }
    } else {
      this.setRelativeTimeValueIsTooBig(false);
    }
  }

  private secondsDiff(start: Date, end: Date): number {
    let secondsDiff = (end.getTime() - start.getTime()) / 1000;
    return Math.abs(Math.round(secondsDiff));
  }

  private datesDifferenceIsOkay(start: Date, end: Date) {
    return this.secondsDiff(start, end) <= 3600;
  }

  private controlFormIsValid() {
    this.formIsValid = this.printerInfoIsValid() && this.dataTypesAreValid() && this.timeIsValid();
  }

  private createMinDate() {
    let date = new Date();
    date.setMonth(date.getMonth() - 1)
    return date;
  }

  private printerInfoIsValid(): boolean {
    return !this.formControlhasError('_PnControl', 'required') && !this.formControlhasError('_SnControl', 'required');
  }

  private dataTypesAreValid(): boolean {
    return this.filesControl.value.indexOf(true) != -1 || this.requestsControl.value.indexOf(true) != -1
      || this.othersControl.value.indexOf(true) != -1;
  }

  private controlAbsoluteDate() {
    if (this.absoluteDateStartControl.value === null || this.absoluteDateEndControl.value === null) {
      return;
    }
    let startTime = this.absoluteTimeStartControl.value;
    this.absoluteDateStartControl.value.setHours(parseInt(startTime.slice(0, 2)),
      parseInt(startTime.slice(3, 5), 0));

    let endTime = this.absoluteTimeEndControl.value;
    this.absoluteDateEndControl.value.setHours(parseInt(endTime.slice(0, 2)),
      parseInt(endTime.slice(3, 5), 0));

    this.startTimePreviousThanEnd = this.absoluteDateStartControl.value < this.absoluteDateEndControl.value;
    this.absoluteDatesDifferenceTooBig = !this.datesDifferenceIsOkay(this.absoluteDateStartControl.value,
      this.absoluteDateEndControl.value);
  }

  private timeIsValid(): boolean {
    if (this.typeOfDateControl.value === 'relative') {
      return !this.relativeValueTooBig
        && !this.formControlhasError('_relativeTimeUnitsControl', 'required')
        && !this.formControlhasError('_relativeTimeValueControl', 'required')
        && this.allCharsAreNumbers(this.relativeTimeValueControl.value);
    }

    if (this.typeOfDateControl.value === 'absolute') {
      let startOk = !this.formControlhasError('_absoluteDateStartControl', 'required')
        && this.absoluteDateStartControl.value != null
        && !this.formControlhasError('_absoluteTimeStartControl', 'required')
        && this.absoluteTimeStartControl.value != '';
      if (!startOk) {
        return false;
      }

      let endOk = !this.formControlhasError('_absoluteDateEndControl', 'required')
        && this.absoluteDateEndControl.value != null
        && !this.formControlhasError('_absoluteTimeEndControl', 'required')
        && this.absoluteTimeEndControl.value != '';
      if (!endOk) {
        return false;
      }

      this.controlAbsoluteDate();

      return !this.absoluteDatesDifferenceTooBig && this.startTimePreviousThanEnd;
    }
  }

  public readonly initialStartTime = '00:00';
  public readonly initialEndTime = '00:00';

  public filesToolTips: String[] = ["Files sent by the printers to the Cloud Connector", 
                                  "JSON file generated by the Cloud Connector after processing some input data", 
                                  "RTA sent by the printers to the Cloud Connector with updated events", 
                                  "HB indicating a change in the status of the printers (running, sleep, idle, etc.)"];

  public files: String[] = ['OpenXML', 'Cloud JSON', 'RTA (Real Time Alerts)', 'HB (Heart Beats)'];

  public requestsToolTips: String[] = ["Printers requesting its configuration to the Cloud Connector", 
                                      "Printers requesting the SQS credentials to communicate with external services"];
  public requests: String[] = ['Get Configuration Profile', 'Get SQS Credentials'];
  
  public othersToolTips = ["Printers requesting to suscribe to HP services (PrintOs, etc.)"];
  public others: String[] = ['Printer Subscriptions'];
  
  public relativeUnits = [{ realValue: 'minutes', viewValue: 'Minutes' }, { realValue: 'seconds', viewValue: 'Seconds' }];

  public relativeValueTooBig = false;
  public absoluteDatesDifferenceTooBig = false;
  public startTimePreviousThanEnd = true;
  public formIsValid = false;

  public minDate: Date = this.createMinDate();
  public maxDate: Date = new Date();

  //must be last thing to do. If not, it can exist variables with values not initialized
  public myForm: FormGroup = this.createForm();

  public getSelectedFiles() {
    this.selectedFiles = [];
    this.filesControl.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedFiles.push(this.files[i]);
      }
    });
  }

  public getSelectedRequests() {
    this.selectedRequests = [];
    this.requestsControl.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedRequests.push(this.requests[i]);
      }
    });
  }

  public getSelectedOthers() {
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

  public allCharsAreNumbers(text): boolean {
    let numbers = /^[0-9]+$/;
    return text.match(numbers);
  }

  constructor(public fb: FormBuilder, private timelineService: TimelineService) {
  }

  private onChanges(): void {
    this.timeTypeSubscription = this.typeOfDateControl.valueChanges.subscribe(val => {
      if (val === 'absolute') {
        this.relativeTimeValueControl.setValue('');
        this.relativeTimeUnitsControl.setValue('');
      }
    });

    this.relativeTimeValueSubscription = this.relativeTimeValueControl.valueChanges.subscribe(val => {
      this.controlMaxValueOfRelativeTime(val);
    });

    this.relativeTimeUnitsSubscription = this.relativeTimeUnitsControl.valueChanges.subscribe(val => {
      if (this.timeUnitsTouchedBefore) {
        this.relativeTimeValueControl.setValue('');
      } else {
        this.timeUnitsTouchedBefore = true;
      }

      this.controlMaxValueOfRelativeTime(this.relativeTimeValueControl.value);
    });

    this.formSubscription = this.myForm.valueChanges.subscribe(val => {
      this.controlFormIsValid();
    });
  }

  ngOnInit(): void {
    this.onChanges();
  }

  ngOnDestroy(): void {
    this.timeTypeSubscription.unsubscribe();
    this.relativeTimeValueSubscription.unsubscribe();
    this.relativeTimeUnitsSubscription.unsubscribe();
    this.formSubscription.unsubscribe();
  }

  private getTimeRange() {
    if (this.typeOfDateControl.value === 'absolute') {
      return {
        'start': this.absoluteDateStartControl.value,
        'end': this.absoluteDateEndControl.value
      }
    }

    let start = new Date();
    if (this.relativeTimeUnitsControl.value.realValue === 'minutes') {
      start.setMinutes(start.getMinutes() - this.relativeTimeValueControl.value);
    } else if (this.relativeTimeUnitsControl.value.realValue === 'seconds') {
      start.setSeconds(start.getSeconds() - this.relativeTimeValueControl.value);
    }

    return {
      'start': start,
      'end': new Date()
    }
  }


  public getUploadedXmls(): void {
    const timeRange = this.getTimeRange();
    const startDate = timeRange.start;
    const endDate = timeRange.end;

    const startEpoch = Math.round(startDate.getTime() / 1000);
    const endEpoch = Math.round(endDate.getTime() / 1000);

    let pn = this.pnControl.value;
    if (pn === 'any' || pn === 'ANY') {
      pn = '';
    }

    let sn = this.snControl.value;
    if (sn === 'any' || sn === 'ANY') {
      sn = '';
    }

    this.timelineService.getUploadedXmls(pn, sn, startEpoch.toString(), endEpoch.toString()).subscribe();
  }

  public submitForm(): void {
    //console.log(this.myForm.value);

    this.formSubmited.emit(true);

    let timeRange = this.getTimeRange();
    this.timelineService.setTimeRange(timeRange.start, timeRange.end).subscribe();

    if (this.filesControl.value[0]) {
      this.getUploadedXmls();
    }
  }
}