import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PrinterSubscriptionsService } from '../shared/printer-subscriptions.service';

@Component({
  selector: 'app-printer-subscriptions',
  templateUrl: './printer-subscriptions.component.html',
  styleUrls: ['./printer-subscriptions.component.scss']
})
export class PrinterSubscriptionsWrapperComponent implements OnInit {
  private formSubscription;

  public printerSubscriptions = null;

  public loading = false;
  public formIsValid = false;

  public myForm: FormGroup = this.createForm();

  private createForm() {
    return this.fb.group({
      _PnControl: ['', [Validators.required]],
      _SnControl: ['', [Validators.required]]
    })
  }

  get pnControl() { 
    return this.myForm.get('_PnControl'); 
  }

  get snControl() { 
    return this.myForm.get('_SnControl'); 
  }

  private getPrinterSubscriptions() {
    this.loading = true;
    this.printerSubscriptionsService.getPrinterSubscriptions(this.pnControl.value, this.snControl.value)
    .then((result) => this.printerSubscriptions = result)
    .catch((err) => console.error(err))
    .finally(()=> this.loading = false);
  }

  private controlFormIsValid() {
    this.formIsValid = this.printerInfoIsValid();
  }

  public formControlhasError(controlName: string, error: string): boolean {
    return this.myForm.get(controlName).hasError(error);
  }

  private printerInfoIsValid(): boolean {
    return !this.formControlhasError('_PnControl', 'required') && !this.formControlhasError('_SnControl', 'required');
  }

  public submitForm(): void {
    if (this.formIsValid) {
      this.getPrinterSubscriptions();
    }
  }

  constructor(public fb: FormBuilder, private printerSubscriptionsService: PrinterSubscriptionsService) { }

  ngOnInit(): void {
    this.onChanges();
  }

  onChanges(): void {
    this.formSubscription = this.myForm.valueChanges.subscribe(val => {
      this.controlFormIsValid();
    });
  }

  public ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }
}
