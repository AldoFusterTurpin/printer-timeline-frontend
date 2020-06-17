import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrinterTimelineParametersComponent } from './printer-timeline-parameters/printer-timeline-parameters.component';


const routes: Routes = [
  { path: '', redirectTo: 'printer-timeline-parameters', pathMatch: 'full' },
  { path: 'printer-timeline-parameters', component: PrinterTimelineParametersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
