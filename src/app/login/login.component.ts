import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
      localStorage.setItem('x-api-key', this.ApiKeyControl.value);
      console.log(localStorage.getItem('x-api-key'));
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

  constructor(public fb: FormBuilder) { }

}
