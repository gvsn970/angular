import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DairySecurityRoutingModule } from './dairy-security-routing.module';
import { DairySecurityComponent } from './dairy-security.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { CcSecurityModule } from '../cc-security/cc-security.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DairySecurityComponent, SidebarComponent],
  imports: [
    SharedModule,
    CommonModule,
    DairySecurityRoutingModule,
    CcSecurityModule
  ]
})
export class DairySecurityModule { }
