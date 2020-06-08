import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';

//external date picker library https://www.npmjs.com/package/ng-pick-datetime
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

//external file with all the components of Angular material used in the app
import { AngularMaterialModule } from './material.module';

import { PrinterTimelineParametersComponent } from './printer-timeline-parameters/printer-timeline-parameters.component';
import { DataTypesFilterComponent } from './data-types-filter/data-types-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PrinterTimelineParametersComponent,
    DataTypesFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    RouterModule.forRoot([
      { path: 'printer-timeline-parameters', component: PrinterTimelineParametersComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
