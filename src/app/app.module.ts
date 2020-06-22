import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';

import { HttpClientModule } from '@angular/common/http';

//external time picker
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

//external file with all the components of Angular material used in the app
import { AngularMaterialModule } from './material.module';

import { TimelineParametersComponent } from './timeline-parameters/timeline-parameters.component';
import { DataTypesFilterComponent } from './data-types-filter/data-types-filter.component';
import { TimelineSectionComponent } from './timeline-section/timeline-section.component';
import { TimelineRawComponent } from './timeline-raw/timeline-raw.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    TimelineParametersComponent,
    DataTypesFilterComponent,
    TimelineSectionComponent,
    TimelineRawComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    NgxMaterialTimepickerModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
