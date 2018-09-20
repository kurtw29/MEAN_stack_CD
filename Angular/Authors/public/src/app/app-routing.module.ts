import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAuthorsComponent } from './list-authors/list-authors.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  { path: '', component: ListAuthorsComponent },
  { path: 'new', component: NewComponent },
  { path: 'edit/:id', component: EditComponent }
  // { path: '', pathMatch: 'full', redirectTo: '/home'},
  // { path: '**', component: 'PagenotfoundComponent'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
