import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PAndIManagerRoutingModule } from './p-and-i-manager-routing.module';
import { PAndIManagerComponent } from './p-and-i-manager.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [PAndIManagerComponent, SidebarComponent],
  imports: [
    CommonModule,
    PAndIManagerRoutingModule
  ]
})
export class PAndIManagerModule { }
