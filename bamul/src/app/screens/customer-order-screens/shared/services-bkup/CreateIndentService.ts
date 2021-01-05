import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class CreateIndentService {
    constructor(private http: HttpClient) { }
    orders() {
        throw new Error('Method not implemented.');
    }
    createSalesOrderAndItems(createSalesOder: any) {
        return this.http.post(environment.apiPath + 'salesOrderHeader / createSalesOrderAndItems', createSalesOder);
    }
    getCustomerBilling(id) {
        return this.http.get(environment.apiPath + ', customerBilling / ' + id);
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
    getCustomerShipping(id) {
        return this.http.get(environment.apiPath + 'customerShipping/' + id);
    }
    getCustomerShippingDetails(customerId) {
        return this.http.get(environment.apiPath + 'customerDetail / getCustomerShippingDetails / ' + customerId);
    }
    getCustomerBillingDetails(customerId) {
        return this.http.get(environment.apiPath + 'customerDetail / getCustomerBillingDetails / ' + customerId);
    }
}
