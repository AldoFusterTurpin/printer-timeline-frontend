import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-printer-timeline-parameters',
  templateUrl: './printer-timeline-parameters.component.html',
  styleUrls: ['./printer-timeline-parameters.component.scss']
})
export class PrinterTimelineParametersComponent {
  myForm: FormGroup;
  typesOfData: string[] = [
    'XML',
    'JSON',
    'RTA',
    'Heart Beats (HB)',
    'Get Configuration Profile Request',
    'Get SQS Credentials Request',
    'Printer Subscriptions'
  ];

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      PnControl: ['', [Validators.required]],
      SnControl: ['', [Validators.required]],
      myDate: ['', [Validators.required]],
      dataList: [null, [Validators.required]]
    })
  }

  date(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.myForm.get('myDate').setValue(convertDate, {
      onlyself: true
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  submitForm() {
    console.log(this.myForm.value)
  }

}
