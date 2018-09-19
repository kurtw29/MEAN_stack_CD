import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SanjoseComponent } from './sanjose/sanjose.component';
import { SeattleComponent } from './seattle/seattle.component';
import { BurbankComponent } from './burbank/burbank.component';
import { DallasComponent } from './dallas/dallas.component';
import { DcComponent } from './dc/dc.component';
import { ChicagoComponent } from './chicago/chicago.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


const routes: Routes = [
  { path: 'sanjose', component: SanjoseComponent },
  { path: 'seattle', component: SeattleComponent },
  { path: 'burbank', component: BurbankComponent },
  { path: 'dallas', component: DallasComponent },
  { path: 'dc', component: DcComponent },
  { path: 'chicago', component: ChicagoComponent },
  // redirect to /sanjose if there is nothing in the url
  { path: '', pathMatch: 'full', redirectTo: '/sanjose'},
  // the ** will catch anything that did not match any of the above routes
  { path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
