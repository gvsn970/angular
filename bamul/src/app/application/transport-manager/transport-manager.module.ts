import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportManagerRoutingModule } from './transport-manager-routing.module';
import { TransportManagerComponent } from './transport-manager.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';

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
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateTripComponent } from 'src/app/screens/transport-screens/trip/create-trip/create-trip.component';
import { UpdateTripComponent } from 'src/app/screens/transport-screens/trip/update-trip/update-trip.component';
import { ListTripComponent } from 'src/app/screens/transport-screens/trip/list-trip/list-trip.component';
import { AssignTripePointComponent } from 'src/app/screens/transport-screens/trip/assign-tripe-point/assign-tripe-point.component';


@NgModule({
  declarations: [TransportManagerComponent, SidebarComponent, TransportDashboardComponent, CreateScheduleIndentComponent, ListScheduleIndentComponent, CreateRouteComponent, UpdateRouteComponent, ListRoutesComponent, AssignRoutePointComponent, CreateRoutePointComponent, ListRoutesPointsComponent, UpdateRoutePointComponent, AddDriverComponent, ViewDriverComponent, ListDriverComponent, UpdateDriverComponent, AddNewVehicleComponent, ViewVehicleComponent, ListVehiclesComponent, UpdateVehicleComponent, AssignVehicleMilkTransferComponent, ListAssignVehicleMilkTransferComponent, ViewAssignVehicleMilkTransferComponent, CreateTripComponent, UpdateTripComponent, ListTripComponent,AssignTripePointComponent],
  imports: [
    SharedModule,
    CommonModule,
    TransportManagerRoutingModule
  ],
  exports: [TransportDashboardComponent, CreateScheduleIndentComponent, ListScheduleIndentComponent, CreateRouteComponent, UpdateRouteComponent, ListRoutesComponent, AssignRoutePointComponent, CreateRoutePointComponent, ListRoutesPointsComponent, UpdateRoutePointComponent, AddDriverComponent, ViewDriverComponent, ListDriverComponent, UpdateDriverComponent, AddNewVehicleComponent, ViewVehicleComponent, ListVehiclesComponent, UpdateVehicleComponent, AssignVehicleMilkTransferComponent, ListAssignVehicleMilkTransferComponent, ViewAssignVehicleMilkTransferComponent, CreateTripComponent, UpdateTripComponent, ListTripComponent, AssignTripePointComponent]
})
export class TransportManagerModule { }
