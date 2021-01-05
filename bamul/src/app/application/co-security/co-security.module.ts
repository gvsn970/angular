import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoSecurityRoutingModule } from './co-security-routing.module';
import { CoSecurityComponent } from './co-security.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [CoSecurityComponent, SidebarComponent],
  imports: [
    CommonModule,
    CoSecurityRoutingModule
  ]
})
export class CoSecurityModule { }
