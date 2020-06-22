import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelineSectionComponent } from './timeline-section/timeline-section.component';


const routes: Routes = [
  { path: '', redirectTo: 'timeline-section', pathMatch: 'full' },
  { path: 'timeline-section', component: TimelineSectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
