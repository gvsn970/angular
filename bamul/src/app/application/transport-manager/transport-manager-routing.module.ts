import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportManagerComponent } from './transport-manager.component';
import { TransportDashboardComponent } from 'src/app/screens/transport-screens/transport-dashboard/transport-dashboard.component';
import { CreateScheduleIndentComponent } from 'src/app/screens/transport-screens/schedule-indent/create-schedule-indent/create-schedule-indent.component';
import { ListScheduleIndentComponent } from 'src/app/screens/transport-screens/schedule-indent/list-schedule-indent/list-schedule-indent.component';
import { CreateRouteComponent } from 'src/app/screens/transport-screens/route/create-route/create-route.component';
import { UpdateRouteComponent } from 'src/app/screens/transport-screens/route/update-route/update-route.component';
import { ListRoutesComponent } from 'src/app/screens/transport-screens/route/list-routes/list-routes.component';
import { AssignRoutePointComponent } from 'src/app/screens/transport-screens/route/assign-route-point/assign-route-point.component';
import { CreateRoutePointComponent } from 'src/app/screens/transport-screens/route-point/create-route-point/create-route-point.component';
import { ListRoutesPointsComponent } from 'src/app/screens/transport-screens/route-point/list-routes-points/list-routes-points.component';
import { UpdateRoutePointComponent } from 'src/app/screens/transport-screens/route-point/update-route-point/update-route-point.component';
import { AddDriverComponent } from 'src/app/screens/transport-screens/driver/add-driver/add-driver.component';
import { ViewDriverComponent } from 'src/app/screens/transport-screens/driver/view-driver/view-driver.component';
import { ListDriverComponent } from 'src/app/screens/transport-screens/driver/list-driver/list-driver.component';
import { UpdateDriverComponent } from 'src/app/screens/transport-screens/driver/update-driver/update-driver.component';
import { AddNewVehicleComponent } from 'src/app/screens/transport-screens/vehicle/add-new-vehicle/add-new-vehicle.component';
import { ViewVehicleComponent } from 'src/app/screens/transport-screens/vehicle/view-vehicle/view-vehicle.component';
import { ListVehiclesComponent } from 'src/app/screens/transport-screens/vehicle/list-vehicles/list-vehicles.component';
import { UpdateVehicleComponent } from 'src/app/screens/transport-screens/vehicle/update-vehicle/update-vehicle.component';
import { AssignVehicleMilkTransferComponent } from 'src/app/screens/transport-screens/milk-transfer/assign-vehicle-milk-transfer/assign-vehicle-milk-transfer.component';
import { ListAssignVehicleMilkTransferComponent } from 'src/app/screens/transport-screens/milk-transfer/list-assign-vehicle-milk-transfer/list-assign-vehicle-milk-transfer.component';
import { ViewAssignVehicleMilkTransferComponent } from 'src/app/screens/transport-screens/milk-transfer/view-assign-vehicle-milk-transfer/view-assign-vehicle-milk-transfer.component';
import { UpdateTripComponent } from 'src/app/screens/transport-screens/trip/update-trip/update-trip.component';
import { CreateTripComponent } from 'src/app/screens/transport-screens/trip/create-trip/create-trip.component';
import { ListTripComponent } from 'src/app/screens/transport-screens/trip/list-trip/list-trip.component';
import { AssignTripePointComponent } from 'src/app/screens/transport-screens/trip/assign-tripe-point/assign-tripe-point.component';


const routes: Routes = [{
  path: '', component: TransportManagerComponent,
  children:
    [{ path: 'dashboard', component: TransportDashboardComponent },
    { path: 'indent/new-transport-indent', component: CreateScheduleIndentComponent },
    { path: 'indent/list-transport-indent', component: ListScheduleIndentComponent },

    { path: 'route/create-route', component: CreateRouteComponent },
    { path: 'route/update-route/:id', component: UpdateRouteComponent },
    { path: 'route/list-routes', component: ListRoutesComponent },
    { path: 'route/create-trip', component: CreateTripComponent },
    { path: 'route/update-trip/:id', component: UpdateTripComponent },
    { path: 'route/list-trip', component: ListTripComponent },
    { path: 'route/assign-route-point/:id', component: AssignRoutePointComponent },
    { path: 'route-point/create-route-point', component: CreateRoutePointComponent },
    { path: 'route-point/list-route-points', component: ListRoutesPointsComponent },
    { path: 'route-point/update-route-point', component: UpdateRoutePointComponent },
    { path: 'driver/add-driver', component: AddDriverComponent },
    { path: 'driver/view-driver', component: ViewDriverComponent },
    { path: 'driver/list-drivers', component: ListDriverComponent },
    { path: 'driver/update-driver', component: UpdateDriverComponent },
    { path: 'vehicle/add-vehicle', component: AddNewVehicleComponent },
    { path: 'vehicle/view-vehicle', component: ViewVehicleComponent },
    { path: 'vehicle/list-vehicles', component: ListVehiclesComponent },
    { path: 'vehicle/update-vehicle', component: UpdateVehicleComponent },
    { path: 'assign-vehicle-milk-transfer', component: AssignVehicleMilkTransferComponent },
    { path: 'list-milk-transfer-vehicle', component: ListAssignVehicleMilkTransferComponent },
    { path: 'view-assigned-milk-transfer-vehicle', component: ViewAssignVehicleMilkTransferComponent },
    { path: 'route/assign-trip-point/:id', component: AssignTripePointComponent },
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportManagerRoutingModule { }
