import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeighingBridgeService {

  constructor(private http: HttpClient) {
  }
  saveMilkCollection(collectionData) {
    return this.http.post(environment.apiPath + 'shippingmilkcollection/saveshipping/milkcollection', collectionData);
  }
  milkTransUpdateWB(collectionData) {
    return this.http.put(environment.apiPath + 'milkDelivery/milkTransUpdateWB', collectionData);
  }
  getRouteDetailsByRouteNumber(routeId) {
    return this.http.get(environment.apiPath + `route/getRouteDetailsByRouteNumber/${routeId}`);
  }
  getMilkTransferByChallanNo(challanNumber) {
    return this.http.get(environment.apiPath + `milkDelivery/getMilkTransferByChallanNo/${challanNumber}`);
  }
  getAllMilkTransferByFromLocationId(challanNumber) {
    return this.http.get(environment.apiPath + `milkDelivery/getAllMilkTransferByFromLocationId/${challanNumber}`);
  }
  saveMilkTransHdr(collectionData) {
    return this.http.post(environment.apiPath + 'milkDelivery/saveMilkTransHdr', collectionData);
  }
  //http://localhost:9091/trip/getalltripsbyrttypeschdtrtstatusrtshiftendloc/


  getAllTripsBySchDatertptCode(routeType, scheduledDate, routeStatus, routeShift, endLocation) {
    return this.http.get(environment.apiPath + 'trip/getalltripsbyrttypeschdtrtstatusrtshiftendloc/' + routeType + '/' + scheduledDate + '/' + routeStatus + '/' + routeShift + '/' + endLocation);
  }

  updateShipping(shippingHeadersList) {
    return this.http.put(environment.apiPath + 'shippingmilkcollection/updateshipping', shippingHeadersList);
  }
  getweightBowlData() {
    return this.http.get(environment.apiPath + `comport/readcomportValues/COM1`)
  }
  getAllTripsBySchedualAndShiftendloc(date, shift, endLocation) {
    return this.http.get(environment.apiPath + `trip/getalltripsbyschdatertshiftendloc?scheduleDate=${date}&routeShift=${shift}&endLocation=${endLocation}`);
  }
}
