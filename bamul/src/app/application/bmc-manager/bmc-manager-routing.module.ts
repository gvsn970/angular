import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RandomCheckComponent } from 'src/app/screens/security-screens/random-check/random-check.component';
import { BmcManagerComponent } from './bmc-manager.component';


const routes: Routes = [{
  path: '', component: BmcManagerComponent,
  children: [
    { path: '', redirectTo: 'ramdom-check', pathMatch: 'full' },

    { path: 'ramdom-check', component: RandomCheckComponent},

    { path: '**', redirectTo: 'ramdom-check', pathMatch: 'full' }

  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BmcManagerRoutingModule { }
