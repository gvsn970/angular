import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDispatchComponent } from 'src/app/screens/society-screens/create-dispatch/create-dispatch.component';
import { ListDispatchComponent } from 'src/app/screens/society-screens/list-dispatch/list-dispatch.component';
import { MpcsComponent } from './mpcs.component';
import { SocietyMilkDispatchComponent } from 'src/app/screens/society-screens/society-milk-dispatch/society-milk-dispatch.component';


const routes: Routes = [{
  path: '', component: MpcsComponent,
  children:
    [
      { path: '', redirectTo: 'CreateDispatchComponent', pathMatch: 'full' },
      { path: 'create-dispatch', component: CreateDispatchComponent },
      { path: 'list-dispatch', component: ListDispatchComponent },
      { path: 'edit-dispatch/:societyId/:shift/:tripdate', component: SocietyMilkDispatchComponent },
      { path: '**', redirectTo: 'create-dispatch', pathMatch: 'full' }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MpcsRoutingModule { }
