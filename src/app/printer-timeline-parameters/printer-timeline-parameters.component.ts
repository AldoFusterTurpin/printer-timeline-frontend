import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";


@Component({
  selector: 'app-printer-timeline-parameters',
  templateUrl: './printer-timeline-parameters.component.html',
  styleUrls: ['./printer-timeline-parameters.component.scss']
})
export class PrinterTimelineParametersComponent {
  public myForm: FormGroup;

  public files: Array<String> = ['OpenXML', 'Cloud JSON', 'RTA (Real Time Alerts)', 'HB (Heart Beats)'];
  public requests: Array<String> = ['Get Configuration Profile', 'Get SQS Credentials'];
  public others: Array<String> = ['Printer Subscriptions'];

  public relativeValueWrong: boolean;

  public relativeUnits = [
    { realValue: 'minutes', viewValue: 'Minutes' },
    { realValue: 'seconds', viewValue: 'Seconds' },
  ];

  public minDate = this.getMinDate();
  public maxDate = new Date();

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

  public isAbsoluteDateEmpty(): boolean {
    return this.myForm.get('absoluteDateControl').value == '';
  }

  public formIsValid(): boolean {
    return this.printerInfoIsValid() && this.dataTypesIsValid() && this.timeIsValid();
  }

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.relativeValueWrong = false;
    this.myForm = this.createForm();
    this.onChanges();
  }

  private my_func() {
    const t = parseInt(this.myForm.get("relativeValueControl").value);
      if (this.myForm.get("relativeUnitsControl").value.realValue == "minutes") {
        this.relativeValueWrong = (t > 60);
      } else if (this.myForm.get("relativeUnitsControl").value.realValue == "seconds") {
        this.relativeValueWrong = (t > 3600);
      }

      console.log("this.relativeValueWrong: " + typeof this.relativeValueWrong + ", " + this.relativeValueWrong);
      console.log("t: " + typeof t + ", " + t);
  }

  private onChanges(): void {
    this.myForm.get('relativeUnitsControl').valueChanges.subscribe(val => {
      this.my_func();
    });

    this.myForm.get('relativeValueControl').valueChanges.subscribe(val => {
      this.my_func();
    });
    
  }

  private selectedFilesValues = [];
  private selectedRequestsValues = [];
  private selectedOthersValues = [];

  private rangeTypes = [
    { realValue: 'relative', viewValue: 'Relative' },
    { realValue: 'absolute', viewValue: 'Absolute' },
  ];

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

  public allNumbers(text): boolean {
    var numbers = /^[0-9]+$/;
    return text.match(numbers);
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
      if (this.relativeValueWrong) {
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
    return !this.relativeValueWrong;
  }

  submitForm(): void {
    console.log(this.myForm.value);
  }
}