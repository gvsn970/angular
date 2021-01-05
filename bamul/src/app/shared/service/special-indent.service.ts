import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})

export class SpecialIndentService {
    constructor(private http: HttpClient) { }

    updateSalesOrder(updateSalesOrder: any) {
        return this.http.put(environment.apiPath + 'salesOrder/updateSalesOrder', updateSalesOrder);
    }
    createSalesOrderAndItems(createSalesOder: any) {

        return this.http.post(environment.apiPath + '/salesOrder/createSalesOrderAndItems', createSalesOder);
    }
    getCustDetailsByCustomerClassCode(classCode) {
        return this.http.get(environment.apiPath + 'customerDetail/getCustDetailsByCustomerClassCode/' + classCode);
    }
    getCustomerBilling(accountNumber) {
        return this.http.get(environment.apiPath + 'customerDetail/getCustBillingDetailsByAcctNo/' + accountNumber
        );
    }
    getOrderTypeByPriceListId(priceListId) {
        return this.http.get(environment.apiPath + 'orderType/getOrderTypeByPriceListId/' + priceListId);
    }

    getCategoriesByPriceListId(priceListId) {
        //return this.http.get(environment.apiPath + 'priceList/getCategoriesByPriceListId/' + priceListId);
        return this.http.get(environment.apiPath + 'priceList/getSubCategoriesByPriceListId/' + priceListId);

    }

    getOrderType(priceLstId) {
        return this.http.get(environment.apiPath + 'orderType/getOrderTypeByPriceListId/' + priceLstId);
    }
    getCategoriesByPriceListIdAndItemCode(priceListId: any, itemCode: any) {

        return this.http.get(environment.apiPath + 'priceList/getCategoriesByPriceListIdAndItemCode/' + priceListId + '/' + itemCode);
    }
    getPriceListName() {
        return this.http.get(environment.apiPath + 'orderType/getPriceListName/36018');
    }
    //http://localhost:9091/priceList/getpricelistdistinctbypricelistidandordertypeidandsubcategory/6020/1005/Milk%20Product
    getItemsByPriceListIdAndCategory(priceListId, orderTypeId, category) {
        return this.http.get(environment.apiPath + 'priceList/getpricelistdistinctbypricelistidandordertypeidandsubcategory/' + priceListId + '/' + orderTypeId + '/' + category);
        //return this.http.get(environment.apiPath + 'priceList/getItemsByPriceListIdAndCategory/' + priceListId + '/' + category);
    }
    getItemDetailsByPriceListIdAndItemIdAndOrderTypeIdAndUom(priceListId, itemId, orderTypeId, uom) {
        return this.http.get(environment.apiPath + 'priceList/getItemDetailsByPriceListIdAndItemIdAndOrderTypeIdAndUom/' + priceListId + '/' + itemId + '/' + orderTypeId + '/' + uom);
    }

    // getItemsByPriceListIdAndCategory(priceListId,catgery) {
    //   return this.http.get(environment.apiPath + 'priceList/getItemsByPriceListIdAndCategory/' +priceListId+'/' +catgery);
    // }
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


    getSalesOrderByAccountNumber(accountNumber) {
        // return this.http.get(environment.apiPath + 'salesOrder/getSalesOrderByAccountNoAndStatusAndShipToOrgId/'+accountNumber + '/' + 'SCHEDULED' + '/' + shipToOrgId);
        return this.http.get(environment.apiPath + 'salesOrder/getSalesOrderByAccountNumber/' + accountNumber);
    }

    getCustomerBalanceByAcctNo(accountNumber) {

        return this.http.get(environment.apiPath + 'customerBalance/getCustomerBalanceByAcctNo/' + accountNumber);
    }

    getItemDetails(priceListId, inventoryItemId, orderTypeId, uom) {

        return this.http.get(environment.apiPath + 'priceList/getItemDetailsByPriceListIdAndItemIdAndOrderTypeIdAndUom/' + priceListId + '/' + inventoryItemId + '/' + orderTypeId + '/' + uom);
    }

    getCovertionDetailsByInventoryItemidAndFromUomCodeAndToUomCode(inventoryItemid) {

        return this.http.get(environment.apiPath + 'uomConversion/getCovertionDetailsByInventoryItemidAndFromUomCodeAndToUomCode/' + inventoryItemid);
    }
    
    getCustomerList(term) {
        var listOfBooks = this.http.get(environment.apiPath + 'customerDetail/getCustDetailsByName/' + term)
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

}
