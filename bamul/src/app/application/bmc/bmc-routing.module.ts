import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BmcComponent } from './bmc.component';
import { CreateDispatchComponent } from '../../screens/bmc-screens/create-dispatch/create-dispatch.component';
import { ListDispatchComponent } from '../../screens/bmc-screens/list-dispatch/list-dispatch.component';
import { UpdateDispatchComponent } from '../../screens/bmc-screens/update-dispatch/update-dispatch/update-dispatch.component';


const routes: Routes = [{
  path: '', component: BmcComponent,
  children:
  [
    { path: '', redirectTo: 'CreateDispatchComponent', pathMatch: 'full' },
    { path: 'milk-receive/bmccollection', component: CreateDispatchComponent},
    { path: 'milk-receive/list-dispatch', component: ListDispatchComponent},
    {path:'milk-receive/update-dispatch/:id',component:UpdateDispatchComponent},
    { path: '**', redirectTo: 'CreateDispatchComponent',  }
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BmcRoutingModule { }
