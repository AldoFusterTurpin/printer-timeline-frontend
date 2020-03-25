import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';

//external file with all the components of Angular material used in the app
import { AngularMaterialModule } from './material.module';

import { PrinterTimelineParametersComponent } from './printer-timeline-parameters/printer-timeline-parameters.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PrinterTimelineParametersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    RouterModule.forRoot([
      { path: 'printer-timeline-parameters', component: PrinterTimelineParametersComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
