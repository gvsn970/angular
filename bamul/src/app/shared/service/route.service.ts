import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class RouteService {

  priceList = new Subject();
  private salesOrderDispatch = {};
  private salesOrderShipping = {};
  private data = {};
  public listMaterIndent: Subject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getAllDispatchShipConfirm(todayDate: any) {

    return this.http.get(environment.apiPath + 'dispatchShipConfirm/getDispatchShipConfirmByOrderedDate/' + todayDate);
  }

  getsodispshipbyOrderedDate(todayDate) {

    return this.http.get(environment.apiPath + 'sodispship/getsodispshipbyOrderedDate?orderedDate=' + todayDate);
  }
  setOptions(data) {
    this.listMaterIndent.next(data);
  }


  getOptions(): Observable<any> {
    return this.listMaterIndent.asObservable();
  }

  setOtherSalesOrderDispatch(value) {

    this.salesOrderDispatch = value;
  }
  getOtherSalesOrderShipping() {
    return this.salesOrderShipping;
  }
  setOtherSalesOrderShipping(value) {

    this.salesOrderShipping = value;
  }
  getOtherSalesOrderDispatch() {
    return this.salesOrderDispatch;
  }
  createsodispship(createsodispship: any) {
    return this.http.post(environment.apiPath + 'sodispship/createsodispship', createsodispship);
  }

  updatesodispship(updatesodispship: any) {
    return this.http.put(environment.apiPath + 'sodispship/updatesodispship', updatesodispship);
  }
  getAllRoutes(pageNumber,PageSize) {
    return this.http.get(environment.apiPath + 'route/getAllRoutes');
  }
  getRoutes(pageNumber,PageSize,search) {
    return this.http.get(environment.apiPath + 'route/getRoutes?pageNo='+pageNumber+'&pageSize='+PageSize+'&route='+search);
  }
  getDistinctTripRoutesbyRouteType(routeType) {
    return this.http.get(environment.apiPath + `trip/getDistinctTripRoutesbyRouteType/${routeType}`);
  }
  getDistinctTripsbyRouteTypeLocAndDate(routeType , locationName , date) {
    return this.http.get(environment.apiPath + `trip/getDistinctTripsbyRouteTypeLocAndDate/${routeType}/${locationName}/${date}`)
  }
  getAllOrderHolds() {
    return this.http.get(environment.apiPath + 'orderHolds/getAllOrderHolds');
  }

  getAllReleaseReason() {
    return this.http.get(environment.apiPath + 'releaseReason/getAllReleaseReason');
  }
  saveRoute(saveRoute: any) {

    return this.http.post(environment.apiPath + 'route/saveRoute', saveRoute);
  }

  updateRoute(updateRoute: any) {
    return this.http.put(environment.apiPath + 'route/updateRoute', updateRoute);
  }


  createOrderReleaseReason(createOrderReleaseReason: any) {
    return this.http.post(environment.apiPath + 'orderReleaseReason/createOrderReleaseReason', createOrderReleaseReason);
  }
  saveRoutePoints(saveRoutePoint: any) {
    return this.http.post(environment.apiPath + 'route/RPoints/saveRoutePoints', saveRoutePoint);
  }
  getAllOrderDispatch() {
    return this.http.get(environment.apiPath + 'orderDispatch/getAllOrderDispatch');
  }
  // dispuser  get data based on  shift and   date

  getTodaysDispatchListByShiftAndReportDate(shiftDispatch, reportedDate) {
    return this.http.get(environment.apiPath + 'routeSheet/getRouteSheetByReportDate/' + reportedDate);
  }

 
  // shipping based on   shift dtae status
  getShippingListByShiftAndReportDateAndShipStatus(shiftDispatch, dateValue) {
//random shipping
//shipping 
    return this.http.get(environment.apiPath + 'dispatchShip/getShippingListByReportDateAndShipStatus/' + dateValue + '/N');
  }
  getShippingListByShiftAndReportDateAndShipStatusreturn(shiftDispatch, dateValue) {
    //shipping return
    return this.http.get(environment.apiPath + 'dispatchShip/getShippingListByReportDateAndShipStatus/'+ dateValue + '/Y');
  }

  getAllDispatchShip() {

    return this.http.get(environment.apiPath + 'dispatchShip/getAllDispatchShip');
  }


  saveDispatchShip(saveDispatchShip: any) {
    //insert -  dispatch conforim 
    return this.http.post(environment.apiPath + 'dispatchShip/saveDispatchShip', saveDispatchShip);
  }


  updateRouteSheetStatusHeaderByRouteNoAndShiftAndDate(roteSheetStatusUpdate: any) {
    return this.http.put(environment.apiPath + 'dispatchShip/updateDispatchShipHeader', roteSheetStatusUpdate);
  }
  updateShippingHeader(roteSheetStatusUpdate: any) {
    return this.http.put(environment.apiPath + 'dispatchShip/updateShippingHeader ', roteSheetStatusUpdate);
  }

  //  saveDispatchShip(saveDispatchShip: any) {
  //     //save dispatch
  //     return this.http.post(environment.apiPath + 'chkds/savechkds', saveDispatchShip);
  //   }


  //   updateRouteSheetStatusHeaderByRouteNoAndShiftAndDate(roteSheetStatusUpdate: any) {
  //     //put disptch

  //     return this.http.put(environment.apiPath + 'chkds/updatechkds', roteSheetStatusUpdate);
  //   }

  getRandomCheckByRouteNoAndShiftAndDate(routeNo, shift, date) {
    return this.http.get(environment.apiPath + 'randomCheck/getRandomCheckByRouteNoAndShiftAndDate/' + routeNo + '/' + shift + '/' + date);
  }


  saveAllRandomCheck(saveAllRandomCheck: any) {
    return this.http.post(environment.apiPath + 'randomCheck/saveAllRandomCheck', saveAllRandomCheck);

  }
  getRouteSheetByReportDate(todayDate: any) {
    return this.http.get(environment.apiPath + 'routeSheet/getRouteSheetByReportDate/' + todayDate);
  }
  getRandomCheckByDate(todayDate: any) {
    return this.http.get(environment.apiPath + 'randomCheck/getRandomCheckByDate/' + todayDate);
  }
  updateRandomCheck(upadtedRandomCheck: any) {
    return this.http.put(environment.apiPath + 'randomCheck/updateRandomCheck', upadtedRandomCheck);
  }
  sendSMS(message) {
    return this.http.get(environment.apiPath + 'sms/sendSMS/9110709089/Shipping Confirmed for Route No: ' + message);
  }


  getAllReleasedHoldsOrder() {
    return this.http.get(environment.apiPath + 'releasedHoldsOrder/getAllReleasedHoldsOrder');
  }
  getOrderHoldsByRouteInspectorIdAndOrderTypeName(employeeId) {
    let orderTypeName = 'BMD-ROUTE SALES'
    return this.http.get(environment.apiPath + 'orderHolds/getOrderHoldsByRouteInspectorIdAndOrderTypeName/' + employeeId + '/' + orderTypeName);
  }

  allitemonhandqty() {
    return this.http.get(environment.apiPath + 'itemonhandqty/allitemonhandqty');

  }
  getEmployeeVehicleLogByEmpNo(num) {
    return this.http.get(environment.apiPath + 'employeeVehicleLogView/getEmployeeVehicleLogByEmpNo/' + num);
  }

  createEmployeeVehicleLog(createVehicleLog: any) {
    return this.http.post(environment.apiPath + 'employeeVehicleLog/createEmployeeVehicleLog', createVehicleLog);
  }
  //http://localhost:9091/employeeVehicleLog/valempvehlog?empNo=004740&inDate=04-09-2020
 
  valempvehlog(empNo,date){
    return this.http.get(environment.apiPath +`employeeVehicleLog/valempvehlog?empNo=${empNo}&inDate=${date}`);  
  }

  itemonhandquantityallwarehouse() {
    return this.http.get(environment.apiPath + 'itemonhandqty/itemonhandquantityallwarehouse');
  }

  getDropDownList(application, screenName, dropDownName) {
    return this.http.get(environment.apiPath + 'resource/getDropDownValues/' + application + '/' + screenName + '/' + dropDownName);
  }

  getAllDepartmentList() {
    return this.http.get(environment.apiPath + 'department/getAllDepartmentDetails');
  }

  getSourceDestinationType() {
    return this.http.get(environment.apiPath + 'locationDetails/getDistinctSubInventoryType');
  }
  //http://localhost:9091/locationDetails/getLocationDetailsBySubInventoryType/co
  getLocationByType(type) {
    return this.http.get(environment.apiPath + 'locationDetails/getLocationDetailsBySubInventoryType/' + type);
  }


  getVehicleDetailsByRegistrationNumber(term) {
    //http://localhost:9091/vehicle/getVehicleDetailsByRegistrationNumber/PU-06-CA-1999
    var listOfBooks = this.http.get(environment.apiPath + 'vehicle/getVehicleDetailsByRegistrationNumber/' + term)
      .pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
          (data: any) => {
            // return (
            //     data.length != 0 ? data as any[] : [{ "BookName": "No Record Found" } as any]
            // );
            return (
              data as any[]
            );
          }
        ));

    return listOfBooks;
  }

  getDriverDetialsByLicenceNumberOrDriverName(term) {
    //http://localhost:9091/vehicle/getVehicleDetailsByRegistrationNumber/PU-06-CA-1999
    var listOfBooks = this.http.get(environment.apiPath + 'driver/getDriverDetialsByNameorLicenceNo/' + term)
      .pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
          (data: any) => {
            // return (
            //     data.length != 0 ? data as any[] : [{ "BookName": "No Record Found" } as any]
            // );
            return (
              data as any[]
            );
          }
        ));

    return listOfBooks;
  }

  getVendorDetailsByVendorId(vendorId) {
    return this.http.get(environment.apiPath + 'supplierview/vendorid/' + vendorId);
  }

  getRouteByRouteID(routeID) {
    return this.http.get(environment.apiPath + 'route/' + routeID);
  }
  getRouteDetailsByRouteNumber(routeNumber) {
    return this.http.get(environment.apiPath + 'route/getRouteDetailsByRouteNumber/' + routeNumber);
  }
  getAccountType() {
    return this.http.get(environment.apiPath + 'resource/getDropDownValues/ALL/ALL/ROUTE_POINT_TYPE');
  }
  getCustDetailsByName(customerName) {
    return this.http.get(environment.apiPath + 'customerDetail/getCustDetailsByName/' + customerName);
  }
  getSupplierByName(supplierName) {
    return this.http.get(environment.apiPath + 'supplierview/vendorName/' + supplierName);
  }
  getCustShippingDetailsByAcctNo(accountNumber) {
    // return this.http.get(environment.apiPath + 'customerDetail/getCustShippingDetailsByAcctNo/' + accountNumber);
    return this.http.get(environment.apiPath + 'customerDetail/getCustomerShippingDetaillsByAccountNumber/' + accountNumber);
  }
  saveAllRoutePoints(routePoint: any) {
    return this.http.post(environment.apiPath + 'route/saveAllRoutePoints', routePoint);
  }
  getVendorByVendorNumber(vendorNumber) {
    // return this.http.get(environment.apiPath + 'supplierview/vendornum/' + vendorNumber);
    return this.http.get(environment.apiPath + 'supplierview/vendorNumLikeSearch/' + vendorNumber);
  }
  getTripStatus() {
    return this.http.get(environment.apiPath + 'resource/getDropDownValues/TRIP_STATUS');
  }
  getNewRouteStatus() {
    return this.http.get(environment.apiPath + 'resource/getDropDownValues/TR_ROUTE_STATUS');
  } 
  getDropDownValues() {
      return this.http.get(environment.apiPath + 'resource/getDropDownValues/ALL/ALL/ROUTE_TYPE');
  }
  getCompartmentDropDownValues() {
    return this.http.get(environment.apiPath + 'resource/getDropDownValues/TANKER_COMPERTMENT');
  }

  getOrdersOnHoldByLocationId(getOrdersOnHoldByLocationId) {
    return this.http.get(environment.apiPath + 'orderHolds/getOrdersOnHoldByLocationId/'+getOrdersOnHoldByLocationId);
  }

  updateAllRoutePoints(routePoint: any) {
    return this.http.put(environment.apiPath + 'route/updateallroutepoints', routePoint);
  }
  getAssignmentsByVehicleId(vehicleId) {
    return this.http.get(environment.apiPath + 'vehicleassignments/getAssignmentsByVehicleId/'+vehicleId);
  }
  getUnitOfMeasure() {
    return this.http.get(environment.apiPath + 'resource/getDropDownValues/ALL/ALL/UNIT_OF_MEASURE');
  }
  deleteroutepoint(routePointId) {
    return this.http.delete(environment.apiPath + 'route/deleteroutepoint/'+routePointId);
  }
  routeCheck(routeNumber){
    return this.http.get(environment.apiPath + 'route/routeCheck/'+routeNumber);
  }
  getbyvendornameornumberTransporter(term) {
    //http://localhost:9091/vehicle/getVehicleDetailsByRegistrationNumber/PU-06-CA-1999
    var listTransporter = this.http.get(environment.apiPath + 'transporterView/getbyvendornameornumber/' + term)
      .pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
          (data: any) => {
            // return (
            //     data.length != 0 ? data as any[] : [{ "BookName": "No Record Found" } as any]
            // );
            return (
              data as any[]
            );
          }
        ));

    return listTransporter;
  }
  
}
