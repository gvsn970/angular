import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class SecurityService {
    constructor(private http: HttpClient) { }

    getVehicleInward(shift, inwardDate) {
        return this.http.get(environment.apiPath + 'vehicleinward/shiftandinwarddate?shift=' + shift + '&inwardDate=' + inwardDate);
    }

    saveVehicleInward(userId) {
        return this.http.get(environment.apiPath + 'userLogin/getUser/' + userId);
    }
    getAllTransferRoutes(currentDate) {
        return this.http.get(environment.apiPath + 'delivery/getAllTransferRoutesGlobal/' + currentDate);
    }
    getVehicleDetail(vehicleId) {
        return this.http.get(environment.apiPath + 'vehicle/' + vehicleId);
    }
    getDriverDetails(driverId) {
        return this.http.get(environment.apiPath + 'driver/' + driverId);
    }
    getAllTransferRoutesIn(locationName,currentDate) {
        // return this.http.get(environment.apiPath + '/delivery/getAllTransferRoutesIn/' + locationId +'/'+ currentDate);
        return this.http.get(environment.apiPath + 'delivery/getAllTransferRoutesIn/'+locationName+'/'+currentDate);
    }
    getAllTransferRoutesInPage(pageNumber,pageSize,locationName,currentDate) {
        return this.http.get(environment.apiPath + 'delivery/getAllTransferRoutesInPage?pageNo='+pageNumber+'&pageSize='+pageSize+'&scheduleDate='+currentDate+'&endLocation='+locationName);
    }
    getAllTransferRoutesOut(locationName,currentDate) {
        // return this.http.get(environment.apiPath + '/delivery/getAllTransferRoutesOut/' + locationId +'/'+ currentDate);
        return this.http.get(environment.apiPath + 'delivery/getAllTransferRoutesOut/'+locationName+'/'+currentDate);
    }
    getAllTransferRoutesOutPage(pageNumber,pageSize,locationName,currentDate) {
        // return this.http.get(environment.apiPath + '/delivery/getAllTransferRoutesOut/' + locationId +'/'+ currentDate);
        return this.http.get(environment.apiPath + 'delivery/getAllTransferRoutesOutPage?pageNo='+pageNumber+'&pageSize='+pageSize+'&scheduleDate='+currentDate+'&startLocation='+locationName);
    }
    getDropDownValues() {
        return this.http.get(environment.apiPath + 'resource/getDropDownValues/ALL/ALL/ROUTE_TYPE');
    }
    getDropDownValuesForVehicleType() {
        return this.http.get(environment.apiPath + 'resource/getDropDownValues/VEHICLE_TYPE');
    }
    getShift() {
        return this.http.get(environment.apiPath + 'resource/getDropDownValues/SHIFT');
    }
    getTripeStatus() {
        return this.http.get(environment.apiPath + 'resource/getDropDownValues/TRIP_STATUS');
    }
    getAllLocations() {
        return this.http.get(environment.apiPath + 'location/getAllLocations');
    }
    getSealDetailsByTripTransactionId(transactionId) {
        return this.http.get(environment.apiPath + 'delivery/getSealDetailsByTripTransactionId/' + transactionId);
    }
    //ScheduleDate, RouteType, RouteStatus, RouteShift,VehicleType, RouteNumber, StartLocationId, EndLocationId
    findAllGlobalTransferRoutesByFilter(currentDate,routeType, status, shift, vehicleType, routeNumber, StartLocationId,EndLocationId) {
        return this.http.get(environment.apiPath + 'delivery/findAllGlobalTransferRoutesByFilter/'+ currentDate+'/'+routeType+'/'+status+'/'+shift+'/'+vehicleType+'/'+routeNumber+'/'+StartLocationId+'/'+EndLocationId);
    }
    //ScheduleDate, RouteType, RouteStatus, RouteShift,VehicleType, RouteNumber, StartLocationId
    findAllInwardTransferRoutesByFilter(currentDate,routeType, status, shift, vehicleType, routeNumber, StartLocationId) {
        return this.http.get(environment.apiPath + 'delivery/findAllInwardTransferRoutesByFilter/'+ currentDate+'/'+routeType+'/'+status+'/'+shift+'/'+vehicleType+'/'+routeNumber+'/'+StartLocationId);
    }
    //ScheduleDate, RouteType, RouteStatus, RouteShift,VehicleType, RouteNumber, StartLocationId
    findAllOutgoingTransferRoutesByFilter(currentDate,routeType, status, shift, vehicleType, routeNumber, StartLocationId) {
        return this.http.get(environment.apiPath + 'delivery/findAllOutgoingTransferRoutesByFilter/'+ currentDate+'/'+routeType+'/'+status+'/'+shift+'/'+vehicleType+'/'+routeNumber+'/'+StartLocationId);
    }
    updateTripStatus(updateData: any) {
        return this.http.put(environment.apiPath + 'trip/updateTripStatus', updateData);
    }
    getInsuranceValidity(vehicleId) {
        return this.http.get(environment.apiPath + 'vehicle/docs/getInsuranceValidity/' + vehicleId);
    }
    getFitnessValidity(vehicleId) {
        return this.http.get(environment.apiPath + 'vehicle/docs/getFitnessValidity/' + vehicleId);
    }
    supplierview(vendorId) {
        return this.http.get(environment.apiPath + 'supplierview/vendorNumLikeSearch/' + vendorId);
    }
    getTripShipmentDetailsSalesOrdersByTransactionId(transactionId) {
        return this.http.get(environment.apiPath + 'trip/getTripShipmentDetailsSalesOrdersByTransactionId/' + transactionId);
    }
    getMilkTransferByTripTransactionId(transactionId) {
        return this.http.get(environment.apiPath + 'milkDelivery/getMilkTransferByTripTransactionId/' + transactionId);
    }
    getTransporterDetails(transporterId) {
        return this.http.get(environment.apiPath + 'transporterView/getbyvendornameornumber/' + transporterId);
    }
    getShippingListByReportDateAndShipStatusAndRoute(date,status,routeNumber) {
        return this.http.get(environment.apiPath + 'dispatchShip/getShippingListByReportDateAndShipStatusAndRoute/' + date+'/'+status+'/'+routeNumber);
        // return this.http.get(environment.apiPath + 'dispatchShip/getShippingListByReportDateAndShipStatusAndRoute/28-10-2020/N/BDTC046');
    }
    updateOutwardTripStatus(updateData: any) {
        return this.http.put(environment.apiPath + 'trip/updateTripStartStatus', updateData);
    }
}
