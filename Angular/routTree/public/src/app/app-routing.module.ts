import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewComponent } from "./review/review.component";
import { ReviewDetailComponent } from "./review-detail/review-detail.component";

const routes: Routes = [
  { path: "review", component: ReviewComponent, children: [
    { path: 'details/:id', component: ReviewDetailComponent },
    // { path: 'author/:id ', component: AuthorComponent },
    // { path: 'all/:id', component: AllreviewsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
