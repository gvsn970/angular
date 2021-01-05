import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CreateIndentService {
  //call desk create indent
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
    return this.http.put(environment.apiPath + 'salesOrder/updateSalesOrderList', updateSalesOrder);

  }
  createSalesOrderAndItems(createSalesOder: any) {
    //use


    return this.http.post(environment.apiPath + 'salesOrder/createIndentSalesOrder', createSalesOder);
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
    return this.http.get(environment.apiPath + 'priceList/getpricelistdistinctbypricelistidandordertypeidandsubcategory/' + priceListId + '/' + orderTYpeId + '/' + subCategory);
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

  getCovertionDetailsByInventoryItemidAndFromUomCodeAndToUomCode(inventoryItemid) {
    //use
    return this.http.get(environment.apiPath + 'uomConversion/getCovertionDetailsByInventoryItemidAndFromUomCodeAndToUomCode/' + inventoryItemid);
  }
  getOrderTypeName(orderTypeName) {
    //use  
    return this.http.get(environment.apiPath + 'orderType/getOrderTypeName/' + orderTypeName);
  }
  deleteLineItemIndent(originalSysLineRef) {
    //use
    return this.http.delete(environment.apiPath + 'salesOrder/deleteSalesOrderLineItemByOriginalSysLineRef/' + originalSysLineRef);
  }

  getItemOnHandQuantityByOrderedItem(itemCode) {
    return this.http.get(environment.apiPath + 'itemonhandqty/getItemOnHandQuantityByOrderedItem/' + itemCode);
  }
  getSumOfOrderedQunatityByLineStatusAndItemCodeAndUom(itemCode, uom) {

    return this.http.get(environment.apiPath + 'salesOrder/getSumOfOrderedQunatityByLineStatusAndItemCodeAndUom/SCHEDULED/' + itemCode + '/' + uom);
  }
  validateMIAvailable(accountNumber, shift, startDate, endDate) {
    //use
    return this.http.get(environment.apiPath + 'masterIndent/validateMIAvailable/' + accountNumber + '/' + shift + '/' + startDate + '/' + endDate);
  }
  getSalesOrderByAccountNumberAndRequestDateAndPromiseDateAndShift(accountNumber,requestDate, promiseDate, shift) {
    return this.http.get(environment.apiPath + 'salesOrder/getSalesOrderByAccountNumberAndRequestDateAndPromiseDateAndShift/' + accountNumber + '/' +requestDate + '/' +promiseDate + '/' + shift);
  }

  getPaymentUrl(paymentData: any) {
    return this.http.post(environment.apiPath + 'payment/savePayment', paymentData);
  }
  getPaymenDetailsByCustCode(accountNumber) {
    return this.http.get(environment.apiPath + 'payment/getPaymenDetailsByCustCode/' + accountNumber);
  }
  sendSMS(mobileNO,meassage){
    return this.http.get(environment.apiPath +'sms/sendSMS/'+mobileNO +'/'+meassage);
  }
}
