import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperUserRoutingModule } from './super-user-routing.module';
import { SuperUserComponent } from './super-user.component';
import { SharedModule } from '../../shared/shared.module';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { ListUsersComponent } from '../../screens/super-admin/users/views/list-users/list-users.component'
import { CreateUserComponent } from '../../screens/super-admin/users/views/create-user/create-user.component';
import { UpdateUserComponent } from '../../screens/super-admin/users/views/update-user/update-user.component';

@NgModule({
  declarations: [SuperUserComponent , SidebarComponent , ListUsersComponent , CreateUserComponent , UpdateUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    SuperUserRoutingModule,
  ],
  exports:[CommonModule, ListUsersComponent , CreateUserComponent , UpdateUserComponent]
})
export class SuperUserModule {
}
