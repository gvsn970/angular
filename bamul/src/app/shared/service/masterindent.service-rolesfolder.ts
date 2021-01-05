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

  getCustomerBilling(id) {
    return this.http.get(environment.apiPath + 'customerBilling/' + id);
  }

  getCustomerDetailByAcctId(acctId) {
    return this.http.get(environment.apiPath + 'customerDetail/getCustomerDetailByAcctId/' + acctId);
  }

  getCustomerShipping(id) {
    return this.http.get(environment.apiPath + 'customerShipping/' + id);
  }

  OrderType(priceList) {
    return this.http.get(environment.apiPath + 'orderType/getOrderTypeByPriceListId/' + priceList);
  }

  getItemsByPriceListIdAndCategory(catgery) {
    return this.http.get(environment.apiPath + 'priceList/getItemsByPriceListIdAndCategory/18013/' + catgery);
  }

  createMstrIndent(saveMasterIndent: any) {
    return this.http.post(environment.apiPath + 'masterIndent/createMasterIndent', saveMasterIndent);
  }

  updateMasterIndent(updateMasterIndent: any) {

    return this.http.put(environment.apiPath + 'masterIndent/updateMasterIndent', updateMasterIndent);
  }
  retrieveAllCategories() {

    return this.http.get(environment.apiPath + 'category/retrieveAllCategories');

  }

  getPriceListName(priceList) {
    return this.http.get(environment.apiPath + 'orderType/getPriceListName/' + priceList);
  }

  getMasterIndentByCustomerId(CustomerId) {
    return this.http.get(environment.apiPath + 'masterIndent/getMasterIndentByCustomerId/' + CustomerId);
  }

}
