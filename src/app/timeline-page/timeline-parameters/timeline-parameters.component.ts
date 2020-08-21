import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { TimelineService } from '../../shared/timeline.service';
import Utils from '../../shared/utils';
import { utils } from 'protractor';

@Component({
  selector: 'app-timeline-parameters',
  templateUrl: './timeline-parameters.component.html',
  styleUrls: ['./timeline-parameters.component.scss'],
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
      const formUnits = this.relativeTimeUnitsControl.value.realValue;
      const formValue = parseInt(formValueString);

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

  private datesDifferenceIsOkay(start: Date, end: Date) {
    return Utils.getSecondsDiff(start, end) <= 3600;
  }

  private controlFormIsValid() {
    this.formIsValid = this.printerInfoIsValid() && this.dataTypesAreValid() && this.timeIsValid();
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
    const startTime = this.absoluteTimeStartControl.value;
    this.absoluteDateStartControl.value.setHours(parseInt(startTime.slice(0, 2)), parseInt(startTime.slice(3, 5), 0));

    const endTime = this.absoluteTimeEndControl.value;
    this.absoluteDateEndControl.value.setHours(parseInt(endTime.slice(0, 2)), parseInt(endTime.slice(3, 5), 0));

    this.startTimePreviousThanEnd = this.absoluteDateStartControl.value < this.absoluteDateEndControl.value;
    this.absoluteDatesDifferenceTooBig = !this.datesDifferenceIsOkay(this.absoluteDateStartControl.value, this.absoluteDateEndControl.value);
  }

  private timeIsValid(): boolean {
    if (this.typeOfDateControl.value === 'relative') {
      return !this.relativeValueTooBig && !this.formControlhasError('_relativeTimeUnitsControl', 'required') 
              && !this.formControlhasError('_relativeTimeValueControl', 'required') 
              && this.allCharsAreNumbers(this.relativeTimeValueControl.value);
    }

    if (this.typeOfDateControl.value === 'absolute') {
      const startOk = !this.formControlhasError('_absoluteDateStartControl', 'required') 
                      && this.absoluteDateStartControl.value != null && !this.formControlhasError('_absoluteTimeStartControl', 'required')
                      && this.absoluteTimeStartControl.value != '';
      if (!startOk) {
        return false;
      }

      const endOk = !this.formControlhasError('_absoluteDateEndControl', 'required')
                    && this.absoluteDateEndControl.value != null && !this.formControlhasError('_absoluteTimeEndControl', 'required')
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
                                  "JSON file generated by the Cloud Connector after processing input data", 
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

  public minDate: Date = Utils.createTimelineMinDate();
  public maxDate: Date = new Date();

  //must be last thing to do. If not, some variables can exist with values not initialized.
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
    return Utils.allCharsAreNumbers(text);
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
      //console.log(this.myForm.value);
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
      return { 'start': this.absoluteDateStartControl.value, 'end': this.absoluteDateEndControl.value }
    }

    let start = new Date();
    if (this.relativeTimeUnitsControl.value.realValue === 'minutes') {
      start.setMinutes(start.getMinutes() - this.relativeTimeValueControl.value);
    } else if (this.relativeTimeUnitsControl.value.realValue === 'seconds') {
      start.setSeconds(start.getSeconds() - this.relativeTimeValueControl.value);
    }

    return { 'start': start, 'end': new Date() }
  }

  private getEpochTimesFromTimeRange(timeRange: { start: Date, end: Date }): { startEpoch: Number, endEpoch: Number } {
    const startEpoch = Math.round(timeRange.start.getTime() / 1000);
    const endEpoch = Math.round(timeRange.end.getTime() / 1000);
    return { startEpoch: startEpoch, endEpoch: endEpoch };
  }

  private printerIdentificationHandler(originalElement: string): string {
    if (originalElement.toLowerCase() === 'any') {
      //returning empty string because the back-end API returns the files of ALL the printers (no matter pn or sn)
      // when pn and sn are empty in the query parameters request.
      //i.e: if pn and sn are 'any', get all the printers.
      return '';
    }
    return originalElement;
  }

  public getUploadedXmls(): void {
    const { startEpoch, endEpoch } = this.getEpochTimesFromTimeRange(this.getTimeRange())
    const pn = this.printerIdentificationHandler(this.pnControl.value);
    const sn = this.printerIdentificationHandler(this.snControl.value);
    this.timelineService.getUploadedXmls(pn, sn, startEpoch.toString(), endEpoch.toString()).subscribe();
  }

  public getCloudJsons(): void {
    const { startEpoch, endEpoch } = this.getEpochTimesFromTimeRange(this.getTimeRange())
    const pn = this.printerIdentificationHandler(this.pnControl.value);
    const sn = this.printerIdentificationHandler(this.snControl.value);
    this.timelineService.getCloudJsons(pn, sn, startEpoch.toString(), endEpoch.toString()).subscribe();
  }

  public getHeartBeats(): void {
    const { startEpoch, endEpoch } = this.getEpochTimesFromTimeRange(this.getTimeRange())
    const pn = this.printerIdentificationHandler(this.pnControl.value);
    const sn = this.printerIdentificationHandler(this.snControl.value);
    this.timelineService.getHeartBeats(pn, sn, startEpoch.toString(), endEpoch.toString()).subscribe();
  }

  public submitForm(): void {
    //console.log(this.myForm.value);

    this.formSubmited.emit(true);

    const timeRange = this.getTimeRange();
    this.timelineService.setTimeRange(timeRange.start, timeRange.end).subscribe();

    //OpenXml checkbox control
    if (this.filesControl.value[0]) {
      this.getUploadedXmls();
    }

    //Json checkbox control
    if (this.filesControl.value[1]) {
      this.getCloudJsons();
    }

    //Heartbeat checkbox control
    if (this.filesControl.value[3]) {
      this.getHeartBeats();
    }
  }
}