import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-data-types-filter',
  templateUrl: './data-types-filter.component.html',
  styleUrls: ['./data-types-filter.component.scss']
})
export class DataTypesFilterComponent {

  myForm: FormGroup;
  dataGroups;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.createForm()
    this.dataGroups = this.createDataGroups()
  }

  private createForm() {
    return this.formBuilder.group({
      dataTypes: [, [Validators.required]],
    })
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

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  public submitForm() {
    //console.log(this.myForm.value)
  }
}