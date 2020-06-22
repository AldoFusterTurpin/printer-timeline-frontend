import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrinterTimelineSectionComponent } from './timeline-section/timeline-section.component';


const routes: Routes = [
  { path: '', redirectTo: 'timeline-section', pathMatch: 'full' },
  { path: 'timeline-section', component: PrinterTimelineSectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
