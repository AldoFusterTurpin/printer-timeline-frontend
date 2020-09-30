import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelinePageWrapperComponent } from './timeline-page/timeline-page-wrapper/timeline-page-wrapper.component';
import { PrinterSubscriptionsWrapperComponent } from './printer-subscriptions-page/printer-subscriptions-wrapper/printer-subscriptions-wrapper.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'timeline-page-wrapper', component: TimelinePageWrapperComponent },
  { path: 'printer-subscriptions', component: PrinterSubscriptionsWrapperComponent },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
