import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelineSectionWrapperComponent } from './timeline-page/timeline-section-wrapper/timeline-section-wrapper.component';


const routes: Routes = [
  { path: '', redirectTo: 'timeline-section-wrapper', pathMatch: 'full' },
  { path: 'timeline-section-wrapper', component: TimelineSectionWrapperComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
