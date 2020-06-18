import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrinterTimelineSectionComponent } from './printer-timeline-section/printer-timeline-section.component';


const routes: Routes = [
  { path: '', redirectTo: 'printer-timeline-section', pathMatch: 'full' },
  { path: 'printer-timeline-section', component: PrinterTimelineSectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
