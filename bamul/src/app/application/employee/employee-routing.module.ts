import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RandomCheckShippingComponent } from 'src/app/screens/security-screens/random-check-shipping/random-check-shipping.component';
import { EmployeeComponent } from './employee.component';
import { BioDataUploadComponent } from 'src/app/screens/bio-data-upload/bio-data-upload.component';



const routes: Routes = [{
  path: '', component: EmployeeComponent,
  children: [
    { path: '', redirectTo: 'RandomCheckShippingComponent', pathMatch: 'full' },
    { path: 'ramdom-check-shipping', component: RandomCheckShippingComponent },
    { path: 'biometric-data-upload', component: BioDataUploadComponent },
    { path: '**', redirectTo: 'ramdom-check-shipping', pathMatch: 'full' }

  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
