import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { ListSamplesComponent } from '../../screens/rmrd-screens/test-lab/list-samples/list-samples.component';
import { ContactComponent } from '../../shared/components/contact/contact.component';
import { RmrdLabOperatorComponent } from './rmrd-lab-operator.component';


const routes: Routes = [{
  path: '', component: RmrdLabOperatorComponent,
  children:
    [
      { path: '', redirectTo: 'ListSamplesComponent', pathMatch: 'full' },
      { path: 'lab/list-samples', component: ListSamplesComponent},
      { path: 'contact', component: ContactComponent }
    ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RmrdLabOperatorRoutingModule { }
