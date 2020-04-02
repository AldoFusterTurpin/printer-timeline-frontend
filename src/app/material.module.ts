import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//material design icons
import { MatIconModule } from '@angular/material/icon';


//angular material components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
   imports: [
      CommonModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatNativeDateModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatInputModule,
      MatExpansionModule,
      MatListModule,
      FormsModule,
      MatSelectModule,
      MatRadioModule
   ],
   exports: [
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatNativeDateModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatInputModule,
      MatExpansionModule,
      MatListModule,
      FormsModule,
      MatSelectModule,
      MatRadioModule
   ],
   providers: [
      MatDatepickerModule,
   ]
})

export class AngularMaterialModule { }