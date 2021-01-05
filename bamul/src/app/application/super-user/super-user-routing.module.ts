import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperUserComponent } from './super-user.component';
import { ListUsersComponent } from '../../screens/super-admin/users/views/list-users/list-users.component'
import { CreateUserComponent } from '../../screens/super-admin/users/views/create-user/create-user.component';
import { UpdateUserComponent } from '../../screens/super-admin/users/views/update-user/update-user.component';

const routes: Routes = [{
  path: '', component: SuperUserComponent,
  children:
  [
  { path: '', redirectTo: 'list-user', pathMatch: 'full' },
  { path: 'user/list-user', component: ListUsersComponent ,  pathMatch: 'full' },
  { path: 'user/create-user', component: CreateUserComponent ,  pathMatch: 'full' },
  { path: 'user/update-user', component: UpdateUserComponent ,  pathMatch: 'full' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperUserRoutingModule { }
