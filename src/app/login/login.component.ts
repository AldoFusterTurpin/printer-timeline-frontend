import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Utils from '../shared/utils';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = this.createForm();

  private formSubscription;

  public formIsValid = false;

  private controlFormIsValid() {
    this.formIsValid = !this.formControlhasError('_ApiKeyControl', 'required');
  }

  private createForm() {
    return this.fb.group({
      _ApiKeyControl: ['', [Validators.required]]
    })
  }

  get ApiKeyControl() { 
    return this.loginForm.get('_ApiKeyControl'); 
  }


  public formControlhasError(controlName: string, error: string): boolean {
    return this.loginForm.get(controlName).hasError(error);
  }
  
  public login(): void {
    if (this.formIsValid) { 
      localStorage.setItem(Utils.API_KEY_NAME, this.ApiKeyControl.value);
    }
  }
  
  ngOnInit(): void {
    this.formSubscription = this.loginForm.valueChanges.subscribe(val => {
      this.controlFormIsValid();
    });
  }

  public ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  public showLoginMessage() {
    let element = "X-API-KEY";
    let message = `${element} stored in browser 🔑`;

    let action = 'Got it!';
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  constructor(public fb: FormBuilder, private _snackBar: MatSnackBar) { }

}
