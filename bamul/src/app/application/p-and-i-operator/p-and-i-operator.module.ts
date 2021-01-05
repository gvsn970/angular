import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PAndIOperatorRoutingModule } from './p-and-i-operator-routing.module';
import { PAndIOperatorComponent } from './p-and-i-operator.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [PAndIOperatorComponent, SidebarComponent],
  imports: [
    CommonModule,
    PAndIOperatorRoutingModule
  ]
})
export class PAndIOperatorModule { }
