import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CreateIndentService {
  constructor(private http: HttpClient) { }

  orders() {
    throw new Error('Method not implemented.');
  }

  updateSalesOrder(updateSalesOrder: any) {
    return this.http.put(environment.apiPath + 'salesOrder/updateSalesOrder', updateSalesOrder);
  }
  createSalesOrderAndItems(createSalesOder: any) {
    return this.http.post(environment.apiPath + 'salesOrder/createSalesOrderAndItems', createSalesOder);
  }
  getCustomerBilling(accountNumber) {

    return this.http.get(environment.apiPath + 'customerDetail/getCustBillingDetailsByAcctNo/' + accountNumber
    );
  }

  retrieveAllCategories() {
    return this.http.get(environment.apiPath + 'category/retrieveAllCategories');
  }

  getOrderType(priceLstId) {
    return this.http.get(environment.apiPath + 'orderType/getOrderTypeByPriceListId/' + priceLstId);
  }

  getPriceListName() {
    return this.http.get(environment.apiPath + 'orderType/getPriceListName/36018');
  }

  getItemsByPriceListIdAndCategory(catgery) {
    return this.http.get(environment.apiPath + 'priceList/getItemsByPriceListIdAndCategory/18013/' + catgery);
  }

  getCustomerShipping(accountNumber) {
    return this.http.get(environment.apiPath + 'customerDetail/getCustShippingDetailsByAcctNo/' + accountNumber);
  }

  getCustomerShippingDetails(accountNumber) {
    return this.http.get(environment.apiPath + 'customerDetail/getCustomerShippingDetails/' + accountNumber);
  }
  getCustomerBillingDetails(accountNumber) {
    return this.http.get(environment.apiPath + 'customerDetail/getCustomerBillingDetails/' + accountNumber);
  }
  getAllCustomerBillings() {
    return this.http.get(environment.apiPath + 'customerBilling/allCustomerBilling');
  }


  getAllSalesOrders() {
    return this.http.get(environment.apiPath + 'salesOrder/getAllSalesOrders');
  }

}



