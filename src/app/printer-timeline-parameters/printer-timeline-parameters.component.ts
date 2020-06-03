import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TimeRangeSelectorComponent } from '../time-range-selector/time-range-selector.component';


@Component({
  selector: 'app-printer-timeline-parameters',
  templateUrl: './printer-timeline-parameters.component.html',
  styleUrls: ['./printer-timeline-parameters.component.scss']
})
export class PrinterTimelineParametersComponent {
  @ViewChild(TimeRangeSelectorComponent, {static: true}) timeRangeForm: TimeRangeSelectorComponent;

  myForm: FormGroup;

  dataGroups;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.createForm()
    this.dataGroups = this.createDataGroups()
  }

  private createDataGroups() {
    return [
      {
        name: 'Files',
        data: [
          {value: 'openXml', viewValue: 'OpenXML'},
          {value: 'json', viewValue: 'Cloud JSON'},
          {value: 'rta', viewValue: 'RTA (Real Time Alerts)'},
          {value: 'heartBeats', viewValue: 'HB (Heart Beats)'}
        ]
      },
      {
        name: 'Requests',
        data: [
          {value: 'gcp', viewValue: 'Get Configuration Profile'},
          {value: 'getSqsCredentials', viewValue: 'Get SQS Credentials'}
        ]
      },
      {
        name: 'Others',
        data: [
          {value: 'printerSubscriptions', viewValue: 'Printer Subscriptions'}
        ]
      },
    ]
  }

  private createForm() {
    return this.formBuilder.group({
      PnControl: ['', [Validators.required]],
      SnControl: ['', [Validators.required]],
      dataTypes: [, [Validators.required]],
      timeRange: this.timeRangeForm.createGroup()
    })
  }

  /* public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  } */

  submitForm() {
    console.log(this.myForm.value)
  }
}