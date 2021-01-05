import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CallDeskService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }
  getItemIndent(panel) {
    return this.http.get(environment.apiPath + 'priceList/getpricelistitemsbydispccc/' + panel);
  }

  getCustomerBilling(custId) {
    return this.http.get(environment.apiPath + 'customerDetail/getCustBillingDetailsByAcctNo/' + custId);
  }

  getCustomerShipping(custId) {
    return this.http.get(environment.apiPath + 'customerDetail/getCustShippingDetailsByAcctNo/' + custId);
  }
  getSalesOrderDetail(wareHouseId, promisedate, custId, shift) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(environment.apiPath + `salesOrderView/getSalesOrderByAccountNumberAndStatusAndShipToSiteUseIdAndDeliveryDateAndShiftId/${custId}/NEW/${wareHouseId}/${promisedate}/${shift}`);
    // return this.http.get(environment.apiPath + `salesOrderView/getSalesOrderByAccountNumberAndStatusAndShipToSiteUseIdAndDeliveryDateAndShiftId/305766/NEW/15638/08-10-2020/1`);
  }

  //http://localhost:9091/salesOrder/getSalesOrderByAccountNoAndStatusAndShipToOrgId/304992/SCHEDULED/21086

  getOrderTypeDetail(ordetTypeId) {
    return this.http.get(environment.apiPath + 'orderType/getOrderTypeName/' + ordetTypeId);
  }
  getsalesorderviewbyshipfromorgid(OrgId) {
    return this.http.get(environment.apiPath + 'salesordertypeview/getsalesorderviewbyshipfromorgid?shipFromOrgId=' + OrgId);
  }
  updateSalesOrder(updatedData: any) {
    return this.http.put<any>(environment.apiPath + 'portalSalesOrder/updateSalesOrder', updatedData);
  }


  getItemsByPriceListIdAndOrderTypeIdAnditemCodeAndSellingUOM(priceListId, orderTypeId, itemCode, sellingUOM) {
    return this.http.get(environment.apiPath + 'priceList/getItemsByPriceListIdAndOrderTypeIdAnditemCodeAndUOM/' + priceListId + '/' + orderTypeId + '/' + itemCode + '/' + sellingUOM);
  }
  getAvailToOrderValue(itemCode) {
    return this.http.get(environment.apiPath + 'itemonhandqty/getItemOnHandQuantityByOrderedItem/' + itemCode);
  }
  getDateAndShift() {
    let now = new Date();
    let hh = now.getHours();
    let mm = now.getMinutes();

 


    const addDays = (days) => {
      let result = new Date();
      result.setDate(result.getDate() + days);
      return result;
    }

    let current = Date.parse(`01/01/2011 ${hh}:${mm}:00`);
    //let current = Date.parse('01/01/2011 13:01');

    let morningShiftStart = Date.parse('01/01/2011 16:00:00');
    let morningShiftEnd = Date.parse('01/01/2011 09:29:59');

    let eveningShiftStart = Date.parse('01/01/2011 09:30:00');
    let eveningShiftEnd = Date.parse('01/01/2011 15:59:00');

    // let currentShiftStart = Date.parse('01/01/2011 00:01:00');
    // let currentShiftEnd = Date.parse('01/01/2011 12:59:00');

    let result = {};
    if (current >= morningShiftStart && current <= morningShiftEnd) {
      ////console.log('data is => ' + addDays(1) + 'shift is M')
      // console.log('evening')
      result['date'] = now + '';
      result['shift'] = 'M';
    } else if (current >= eveningShiftStart && current <= eveningShiftEnd) {
      ////console.log('data is => ' + addDays(1) + 'shift is E');
      now =new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      // console.log('morning ')
      result['date'] = now + '';
      result['shift'] = 'E';
    }
    // } else if (current >= currentShiftStart && current <= currentShiftEnd) {
      
    //   result['date'] = now + ''
    //   result['shift'] = 'E';
    // }
    result['date'] = this.datePipe.transform(result['date'], 'dd-MM-yyyy');
    return result;
  }
  getcurrentshiftbytime(){
    return this.http.get(environment.apiPath +'indentShiftLine/getcurrentshiftbytime');
  }
  sendSMS(mobileNO, meassage) {
    return this.http.get(environment.apiPath + 'sms/sendSMS/' + mobileNO + '/' + meassage);
  }
  getallsalesordertype() {
    return this.http.get(environment.apiPath + 'salesordertypeview/getallsalesordertype');
  }
  getRouteList(scheduleDate,shipToSiteUseId,orderTypeId,shift) {
    return this.http.get(environment.apiPath + 'trip/getroutenumberandsequencebyshiptositeidordertypeidandshift?shipToSiteUseId='+shipToSiteUseId+'&orderTypeId='+orderTypeId+'&shift='+shift+'&scheduleDate='+scheduleDate);
  }
  getCurrentDate(){
    let now = new Date();
    return now;
  }
  getNextDate(days){
      let result = new Date();
      result.setDate(result.getDate() + days);
      return result;
  }
}
