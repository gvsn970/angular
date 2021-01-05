import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CreateIndentService {
  //pa
  private listIndent = {};
  private indentPriceListId = {};
  public listIndents: Subject<any> = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }
  setIndentList(value) {
    this.listIndent = value;
  }
  getIndentList() {
    return this.listIndent;
  }

  salerOrderListSet(data) {
    this.listIndents.next(data);
  }
  salerOrderListGet(): Observable<any> {
    return this.listIndents.asObservable();
  }

  setIndentPriceListId(value) {
    this.indentPriceListId = value;
  }
  getIndentPriceListId() {
    return this.indentPriceListId
  }
  updateSalesOrder(updateSalesOrder: any) {
    //use
    return this.http.put(environment.apiPath + 'portalSalesOrder/updateSalesOrder', updateSalesOrder);

  }
  createSalesOrderAndItems(createSalesOder: any) {
    //use
    return this.http.post(environment.apiPath + 'portalSalesOrder/createSalesOrder', createSalesOder);
  }
  getCustBillingDetailsByAcctNo(accountNumber) {
    //use
    return this.http.get(environment.apiPath + 'customerDetail/getCustBillingDetailsByAcctNo/' + accountNumber
    );
  }
  getCustShippingDetailsByAcctNo(accountNumber) {
    //use
    return this.http.get(environment.apiPath + 'customerDetail/getCustShippingDetailsByAcctNo/' + accountNumber);
  }

  getcustdetailsbycustacntnumberandsiteuseidforshipto(accountNumber,acntsiteid){
    return this.http.get(environment.apiPath + 'customerDetail/getcustdetailsbycustacntnumberandsiteuseidforshipto/'+accountNumber+'/'+acntsiteid);
  }

  getCategoriesByPriceListId(priceListId) {
    //use
    return this.http.get(environment.apiPath + 'priceList/getSubCategoriesByPriceListId/' + priceListId);

  }

  getOrderType(priceLstId) {
    return this.http.get(environment.apiPath + 'orderType/getOrderTypeByPriceListId/' + priceLstId);
  }
  getCategoriesByPriceListIdAndItemCode(priceListId: any, itemCode: any) {
    //use
    return this.http.get(environment.apiPath + 'priceList/getCategoriesByPriceListIdAndItemCode/' + priceListId + '/' + itemCode);
  }
  getPriceListName() {
    return this.http.get(environment.apiPath + 'orderType/getPriceListName/36018');
  }

  getPriceListByPriceListIdAndOrderTypeIdAndCategory(priceListId, orderTYpeId, subCategory) {
    //use
    // return this.http.get(environment.apiPath + 'priceList/getpricelistdistinctbypricelistidandsubcategory/' + priceListId + '/' + category);
    // return this.http.get(environment.apiPath + 'priceList/getpricelistdistinctbypricelistidandordertypeidandsubcategory/' + priceListId + '/' + orderTYpeId + '/' + subCategory);
    return this.http.get(environment.apiPath + 'priceList/getpricelistdistinctbypricelistidandsubcategory/' + priceListId  + '/' + subCategory);
  }




  getSalesOrderByAccountNumber(accountNumber) {
    //use
    return this.http.get(environment.apiPath + 'salesOrder/getSalesOrderByAccountNumber/' + accountNumber);
  }

  getCustomerBalanceByAcctNo(accountNumber) {
    //use
    return this.http.get(environment.apiPath + 'customerBalance/getCustomerBalanceByAcctNo/' + accountNumber);
  }

  getItemDetails(priceListId, inventoryItemId, orderTypeId, uom) {
    //use1
    return this.http.get(environment.apiPath + 'priceList/getItemDetailsByPriceListIdAndItemIdAndOrderTypeIdAndUom/' + priceListId + '/' + inventoryItemId + '/' + orderTypeId + '/' + uom);
  }
  getItemDetailsByPriceListIdAndItemIdAndSellingUom(priceListId, inventoryItemId,  uom) {
    //use1
    return this.http.get(environment.apiPath + 'priceList/getItemDetailsByPriceListIdAndItemIdAndSellingUom/' + priceListId + '/' + inventoryItemId +  '/' + uom);
  }
  getCovertionDetailsByInventoryItemidAndFromUomCodeAndToUomCode(inventoryItemid) {
    //use
    return this.http.get(environment.apiPath + 'uomConversion/getCovertionDetailsByInventoryItemidAndFromUomCodeAndToUomCode/' + inventoryItemid);
  }
  getOrderTypeName(orderTypeName) {
    //use  
    return this.http.get(environment.apiPath + 'orderType/getOrderTypeName/' + orderTypeName);
  }
  deleteLineItemIndent(lineId) {
    //use
    return this.http.delete(environment.apiPath + 'portalSalesOrder/deleteSalesOrderLinesItemByLineId/' + lineId);
  }

  getItemOnHandQuantityByOrderedItem(itemCode) {
    return this.http.get(environment.apiPath + 'itemonhandqty/getItemOnHandQuantityByOrderedItem/' + itemCode);
  }
  getSumOfOrderedQunatityByLineStatusAndItemCodeAndUom(itemCode, uom) {

    return this.http.get(environment.apiPath + 'salesOrder/getSumOfOrderedQunatityByLineStatusAndItemCodeAndUom/SCHEDULED/' + itemCode + '/' + uom);
  }
  validateMIAvailable(shipTositeUseId, shift, startDate, endDate) {
    //use
    return this.http.get(environment.apiPath + 'masterIndentView/validateMIAvailable/' + shipTositeUseId + '/' + shift + '/' + startDate + '/' + endDate);
  }
 
  getSalesOrderByShipToSiteUseIdAndBookingDateAndDeliveryDateAndShiftId(ShipToSiteUseId,bookingDate, deliveryDate, shiftId) {
    return this.http.get(environment.apiPath + 'salesOrderView/getSalesOrderByShipToSiteUseIdAndBookingDateAndDeliveryDateAndShiftId/' + ShipToSiteUseId + '/' +bookingDate + '/' +deliveryDate + '/' + shiftId);
  }

  getPaymentUrl(paymentData: any) {
    return this.http.post(environment.apiPath + 'savePayment', paymentData);
  }
  getPaymenDetailsByCustCode(accountNumber) {
    return this.http.get(environment.apiPath + 'getPaymenDetailsByCustCode/' + accountNumber);
  }
  sendSMS(mobileNO,meassage){
    return this.http.get(environment.apiPath +'sms/sendSMS/'+mobileNO +'/'+meassage);
  }
  getOrderAmountByAccNumberAndOrderDate(accountNumber,currentDate) {
    return this.http.get(environment.apiPath + 'orderAmount/getOrderAmountByAccNumberAndOrderDate/' + accountNumber +'/'+ currentDate);
  }
  getUpdatedTransation(refrenceNumber) {
    return this.http.get(environment.apiPath + 'getUpdatedTransation/' + refrenceNumber);
  }

  getSalesOrderByAccountNumberAndDeliveryDateAndShiftIdAndStatus(date,shift,status,accnumber){
    
    return this.http.get(environment.apiPath + `salesOrderView/getSalesOrderByAccountNumberAndDeliveryDateAndShiftIdAndStatus/${accnumber}/${date}/${shift}/${status}`);
  }

  getAllIndentShifts(){
    return this.http.get(environment.apiPath +'indentShiftLine/getcurrentshiftbytime');
  }
  getallsalesordertype() {
    return this.http.get(environment.apiPath + 'salesordertypeview/getallsalesordertype');
  }
  getRouteList(scheduleDate,shipToSiteUseId,orderTypeId,shift) {
    return this.http.get(environment.apiPath + 'trip/getroutenumberandsequencebyshiptositeidordertypeidandshift?shipToSiteUseId='+shipToSiteUseId+'&orderTypeId='+orderTypeId+'&shift='+shift+'&scheduleDate='+scheduleDate);
  }
  shipToAdress(customerAccountNumber,shipToSiteUseId){
    return this.http.get(environment.apiPath + 'customerDetail/getcustdetailsbycustacntnumberandsiteuseidforshipto/'+customerAccountNumber+'/'+shipToSiteUseId);
  }
  billToAdress(customerAccountNumber,billToSiteUseId){
    return this.http.get(environment.apiPath + 'customerDetail/getcustdetailsbycustacntnumberandsiteuseidforbillto/'+customerAccountNumber+'/'+billToSiteUseId);
  }
  isTemporaryIndentCreationAllowed(billToSiteUseId,shipToSiteUseId,uploadId,shiftId) {
    //use
    return this.http.get(environment.apiPath +'portalSalesOrder/isTemporaryIndentCreationAllowed/' + billToSiteUseId + '/' + shipToSiteUseId + '/' + uploadId + '/' + shiftId);
  }
}
