import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MasterindentService {
  priceList = new Subject();

  getOrderType() {
    throw new Error('Method not implemented.');
  }


  constructor(private http: HttpClient) { }

  passPriceListId(id) {
    this.priceList.next(id);
  }
  getCategoriesByPriceListIdAndItemCode(priceListId: any, itemCode: any) {

    return this.http.get(environment.apiPath + 'priceList/getCategoriesByPriceListIdAndItemCode/' + priceListId + '/' + itemCode);
  }

  validateMIAvailable(accountNumber, shift, startDate, endDate) {

    return this.http.get(environment.apiPath + 'masterIndent/validateMIAvailable/' + accountNumber + '/' + shift + '/' + startDate + '/' + endDate);
  }

  getOrderTypeByPriceListId(priceList) {
    // return this.http.get(environment.apiPath + 'orderType/getOrderTypeByPriceListId/' + sitePriceListId);
    return this.http.get(environment.apiPath + 'orderType/getOrderTypeByPriceListId/' + priceList);
  }
  getCustBillingDetailsByAcctNo(accountNumber) {

    return this.http.get(environment.apiPath + 'customerDetail/getCustBillingDetailsByAcctNo/' + accountNumber
    );
  }

  getCustShippingDetailsByAcctNo(accountNumber) {

    return this.http.get(environment.apiPath + 'customerDetail/getCustShippingDetailsByAcctNo/' + accountNumber);
  }
  getOrderTypeName(orderTypeName) {

    return this.http.get(environment.apiPath + 'orderType/getOrderTypeName/' + orderTypeName);
  }
  getItemsByPriceListIdAndCategory(priceListId, catgery) {
    return this.http.get(environment.apiPath + 'priceList/getItemsByPriceListIdAndCategory/' + priceListId + '/' + catgery);
  }

  createMstrIndent(saveMasterIndent: any) {
    return this.http.post(environment.apiPath + 'masterIndent/createMasterIndent', saveMasterIndent);
  }

  updateMasterIndent(updateMasterIndent: any) {

    return this.http.put(environment.apiPath + 'masterIndent/updateMasterIndent', updateMasterIndent);
  }
  getCategoriesByPriceListId(priceListId) {

    return this.http.get(environment.apiPath + 'priceList/getSubCategoriesByPriceListId/' + priceListId);

  }

  getPriceListName(priceList) {
    return this.http.get(environment.apiPath + 'orderType/getPriceListName/' + priceList);
  }

  getMasterIndentsByAccountNumber(accountNumber) {

    return this.http.get(environment.apiPath + 'masterIndent/getMasterIndentsByAccountNumber/' + accountNumber);
  }

  getCustomerBalanceByAcctNo(accountNumber) {

    return this.http.get(environment.apiPath + 'customerBalance/getCustomerBalanceByAcctNo/' + accountNumber);
  }

}
