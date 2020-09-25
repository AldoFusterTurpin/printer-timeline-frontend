import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelinePageWrapperComponent } from './timeline-page/timeline-page-wrapper/timeline-page-wrapper.component';
import { PrinterSubscriptionsWrapperComponent } from './printer-subscriptions-wrapper/printer-subscriptions.component';


const routes: Routes = [
  { path: '', redirectTo: 'timeline-page-wrapper', pathMatch: 'full' },
  { path: 'timeline-page-wrapper', component: TimelinePageWrapperComponent },
  { path: 'printer-subscriptions', component: PrinterSubscriptionsWrapperComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
