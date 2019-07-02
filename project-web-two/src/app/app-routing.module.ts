import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TimelineComponent } from './timeline/timeline.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'timeline', component: TimelineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
