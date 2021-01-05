import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndentOperatorRoutingModule } from './indent-operator-routing.module';
import { IndentOperatorComponent } from './indent-operator.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [IndentOperatorComponent, SidebarComponent],
  imports: [
    CommonModule,
    IndentOperatorRoutingModule
  ]
})
export class IndentOperatorModule { }
