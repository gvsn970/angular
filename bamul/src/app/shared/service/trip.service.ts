import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class TripService {

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
  //http://localhost:9091/trip/getTripDetailsByScheduleDate/20-02-2020
  // getTripsByScheduledDate(scheduledDate) {
  //   return this.http.get(environment.apiPath + 'trip/getTripDetailsByScheduleDate/' + scheduledDate);
  // }
  getTripsByScheduledDate(pageNumber,PageSize,scheduledDate,search) {
    return this.http.get(environment.apiPath + 'trip/getTripsByScheduleDate?pageNo='+pageNumber+'&pageSize='+PageSize+'&scheduleDate='+scheduledDate+'&route='+search);
  }
  getDistinctTripRoutesbyRouteType(routeType) {
    return this.http.get(environment.apiPath + 'trip/getDistinctTripRoutesbyRouteType/' + routeType);
  }
  getAllOrderHolds() {
    return this.http.get(environment.apiPath + 'orderHolds/getAllOrderHolds');
  }

  getAllReleaseReason() {
    return this.http.get(environment.apiPath + 'releaseReason/getAllReleaseReason');
  }
  saveTrip(saveTrip: any) {
    return this.http.post(environment.apiPath + 'trip/createTrip', saveTrip);
  }
  updateTrip(updateTrip: any) {
    return this.http.put(environment.apiPath + 'trip/updateTripDet', updateTrip);
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
    return this.http.get(environment.apiPath + 'routeSheet/getTodaysDispatchListByShiftAndReportDate/' +
      shiftDispatch + '/' + reportedDate);
  }
  // shipping based on   shift dtae status
  getShippingListByShiftAndReportDateAndShipStatus(shiftDispatch, dateValue) {

    return this.http.get(environment.apiPath + 'dispatchShip/getShippingListByShiftAndReportDateAndShipStatus/' + shiftDispatch + '/' + dateValue + '/N');
  }
  getShippingListByShiftAndReportDateAndShipStatusreturn(shiftDispatch, dateValue) {
    return this.http.get(environment.apiPath + 'dispatchShip/getShippingListByShiftAndReportDateAndShipStatus/' + shiftDispatch + '/' + dateValue + '/Y');
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

  getbyvendornameornumber(term) {
    //http://localhost:9091/vehicle/getVehicleDetailsByRegistrationNumber/PU-06-CA-1999
    var listOfBooks = this.http.get(environment.apiPath + 'supplierview/vendorName/' + term)
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

  getTripByTripTransactionId(tripTransactionId) {
    return this.http.get(environment.apiPath + 'trip/getTripByTransactionId/' + tripTransactionId);
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
    return this.http.get(environment.apiPath + 'customerDetail/getCustShippingDetailsByAcctNo/' + accountNumber);
  }
  saveAllRoutePoints(routePoint: any) {
    return this.http.post(environment.apiPath + 'route/saveAllRoutePoints', routePoint);
  }
  getVendorByVendorNumber(vendorNumber) {
    return this.http.get(environment.apiPath + 'supplierview/vendornum/' + vendorNumber);
  }
  saveRoute(saveRoute: any) {
    return this.http.post(environment.apiPath + 'route/saveRoute', saveRoute);
  }
  updateTripDetial(updateTripeData: any){
    return this.http.put(environment.apiPath + 'trip/updateTripDet', updateTripeData);
  }
  getTripStatus() {
    return this.http.get(environment.apiPath + 'resource/getDropDownValues/TRIP_STATUS');
}
  getNewTripStatus() {
  return this.http.get(environment.apiPath + 'resource/getDropDownValues/TR_TRIP_STATUS');
  } 
}
