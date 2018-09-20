import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MineComponent } from './mine/mine.component';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'mine', component: MineComponent},
  { path: 'buy', component: BuyComponent},
  { path: 'sell', component: SellComponent},
  // redirect to /home if there's nothing in the url
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: '**', component: HomeComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
