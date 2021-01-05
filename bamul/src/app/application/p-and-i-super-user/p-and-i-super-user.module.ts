import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PAndISuperUserRoutingModule } from './p-and-i-super-user-routing.module';
import { PAndISuperUserComponent } from './p-and-i-super-user.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [PAndISuperUserComponent, SidebarComponent],
  imports: [
    CommonModule,
    PAndISuperUserRoutingModule
  ]
})
export class PAndISuperUserModule { }
