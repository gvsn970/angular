import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuritySuperUserRoutingModule } from './security-super-user-routing.module';
import { SecuritySuperUserComponent } from './security-super-user.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [SecuritySuperUserComponent, SidebarComponent],
  imports: [
    CommonModule,
    SecuritySuperUserRoutingModule
  ]
})
export class SecuritySuperUserModule { }
