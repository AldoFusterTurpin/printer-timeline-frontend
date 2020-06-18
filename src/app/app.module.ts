import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';

//external time picker
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

//external file with all the components of Angular material used in the app
import { AngularMaterialModule } from './material.module';

import { PrinterTimelineParametersComponent } from './printer-timeline-parameters/printer-timeline-parameters.component';
import { DataTypesFilterComponent } from './data-types-filter/data-types-filter.component';
import { PrinterTimelineSectionComponent } from './printer-timeline-section/printer-timeline-section.component';
import { PrinterTimelineViewComponent } from './printer-timeline-view/printer-timeline-view.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PrinterTimelineParametersComponent,
    DataTypesFilterComponent,
    PrinterTimelineSectionComponent,
    PrinterTimelineViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
