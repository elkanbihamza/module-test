import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'create', pathMatch: 'full'},
  { path: 'list', component: UsersListComponent},
  { path: 'create', component: CreateUserComponent},
  { path: 'create/:id', component: CreateUserComponent}  ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
