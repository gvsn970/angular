import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MilkCollectionService {

  constructor(private http: HttpClient) {
  }
  saveMilkCollection(collectionData) {
    return this.http.post(environment.apiPath + 'shippingmilkcollection/saveshipping/milkcollection', collectionData);
  }
  updateMilkCollection(collectionData) {
    return this.http.put(environment.apiPath + 'shippingmilkcollection/updateshipping', collectionData);
  }
  getlocationDetails(locationId) {
    return this.http.get(environment.apiPath + `location/getAllLocationByLocId/${locationId}`)
  }
  getLocationDetailsByLocationIdForCC(locationId) {
    return this.http.get(environment.apiPath + `locationDetails/getLocationDetailsByLocationIdForCC/${locationId}`)
  }
  getallsupplierView() {
    return this.http.get(environment.apiPath + `supplierview/getallsupplierviews`);
  }
//   RetrieveSocietyLogs(routeId, shift, status, tripDate) {
// // tslint:disable-next-line: max-line-length
//     return this.http.get(environment.apiPath + `\societylog/routeidshiftstatuswithtripdate?routeId=${routeId}&shift=${shift}&status=${status}&tripDate=${tripDate}`)
//   }
  RetrieveSocietyLogs(id,shift,date) {
    // tslint:disable-next-line: max-line-length
        // return this.http.get(environment.apiPath + `societylog/routeidshiftstatuswithtripdate?routeId=46&shift=M&status=New&tripDate=28-12-2019`);
        return this.http.get(environment.apiPath + `societylog/routeidshiftstatuswithtripdate?routeId=${id}&shift=${shift}&status=New&tripDate=${date}`);
      }
  RetrieveallshippingHeaders(id , date) {
// tslint:disable-next-line: max-line-length
    return this.http.get(environment.apiPath + `shippingmilkcollection/milkcollectionwithshiptolocationiddate?shipToLocationId=${id}&shippedDate=${date}`);
  }
  getshippingHeaderswithshipmentHeaderid(shipmentId) {
    return this.http.get(environment.apiPath + `shippingmilkcollection/${shipmentId}`);
  }
  getReceiptNum(){
    return this.http.get( environment.apiPath + 'shippingmilkcollection/receiptnum')
  }
  getSampleNum(date,shift,locationId,sourceCode){
    return this.http.get( environment.apiPath + `shippingmilkcollection/samplenowithdocshifttolocidshiftshippeddate?shipToLocationId=${locationId}&shippedDate=${date}&receiptSourceCode=${sourceCode}&shift=${shift.toUpperCase()}`)
  }
  getsupplierInfo(id) {
    return this.http.get (environment.apiPath + `supplierview/vendorid/${id}`)
  }
  getsupplierInfofromvendorNum(id) {
    return this.http.get (environment.apiPath + `supplierview/vendornum/${id}`)
  }
  getRoutePoint(){
    return this.http.get (environment.apiPath + `trip/getAllTrips`);
  }
  getRoutePointData(routeno,tripdate,locationname,shift){
    return this.http.get (environment.apiPath + `trip/getAllTripsByRouteNoAndCreationDateAndEndLocationAndShift/${routeno}/${tripdate}/${locationname}/${shift}`);
  }
  getAllLocations() {
    return this.http.get(environment.apiPath + 'location/getAllLocations/');
}
getBmcMaxref(){
  return this.http.get(environment.apiPath + 'shippingmilkcollection/bmcrefno');
}
getshippingHeaderwithBmcrefno(id){
  return this.http.get(environment.apiPath + `shippingmilkcollection/socbmcrefno?bmcRefNo=${id}`);
}
getweightBowlData() {
  //return this.http.get(environment.apiPath + `comport/readcomportValues/COM1`);
   return this.http.get(`http://localhost:9091/comport/readcomportValues`)
}

RetrieveMilkCollectionByFreightCarrierCodeDateAndShiftStatus(routeno,tripdate,shift,approvalStatus){
  return this.http.get(environment.apiPath + `shippingmilkcollection/milkcollectionwithroutenoshiftdateandstatus?routeNo=${routeno}&shippedDate=${tripdate}&shift=${shift}&approvalStatus=${approvalStatus}`)
}

updateTrip(data) {
  return this.http.put(environment.apiPath + `trip/updateTripDet` , data)
}
getunitPrice(itemid,lineid){
  return this.http.get(environment.apiPath + `fatSnfRate/getPaymentRatesByItemNo/${itemid}/${lineid}`)
}
getallsociety() {
  return this.http.get(environment.apiPath + `supplierview/suppliertype?supplierType=MPCS`)
}
getalltripbydatevendornum(date,rtptcode) {
  return this.http.get(environment.apiPath + `trip/getalltripsbyschdatertptcode/${date}/${rtptcode}`)
}
getshippingHeaderBmc(id) {
  return this.http.get(environment.apiPath + `shippingmilkcollection/milkcollectionwithreceiptsourcecodeshifttovendorid?receiptSourceCode=BMC&shipFromVendorId=${id}`)
}

getDairyQcList(rtno,id,currentDate) {
  return this.http.get(environment.apiPath + `shippingmilkcollection/milkcollectionwithrtnodatereceiptsrccdandshifttolocid?routeNo=${rtno}&shippedDate=${currentDate}&receiptSourceCode=BMC&shipToLocationId=${id}`)
}

getsubinventoryDetails(id) {
  return this.http.get(environment.apiPath + `locationDetails/getLocationDetailsByLocationId/${id}`)
}

getAllTripsBySchDatertptCode(routeType, scheduledDate, routeStatus, routeShift, endLocation) {
  return this.http.get(environment.apiPath + 'trip/getalltripsbyrttypeschdtrtstatusrtshiftendloc/' + routeType + '/' + scheduledDate + '/' + routeStatus + '/' + routeShift + '/' + endLocation);
}

getItemsDetails(locationId) {
 return this.http.get(environment.apiPath + `milkrateitemsview/getbylocationid/${locationId}`)
}
gettripshippingDetails(routeType, scheduledDate, routeStatus, routeShift, endLocation) {
  return this.http.get(environment.apiPath + 'trip/getalltripsbyrttypeschdtrtstatusrtshiftendlocforrmrd/' + routeType + '/' + scheduledDate + '/' + routeStatus + '/' + routeShift + '/' + endLocation);
}
getlocatorsubinventoryforBMD(locationid) {
  return this.http.get(environment.apiPath + 'locationDetails/getLocationDetailsByLocationIdForBMD/' + locationid);
  
}
getTripDetailsByScheduleDateAndShift(date,shift) {
  return this.http.get(environment.apiPath + `trip/getTripDetailsByScheduleDateAndShift/${date}/${shift}`);
  
}

}
