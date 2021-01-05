import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  CustomerBilling: any;
  priceList = new Subject();

  constructor(private http: HttpClient) { }
  userProfile(id) {

    return this.http.get<any>(environment.apiPath + 'customerBilling/' + id);
  }

  getCustomerDetailByAcctId(acctId) {

    return this.http.get(environment.apiPath + 'customerDetail/getCustomerDetailByAcctId/' + acctId);
  }


  passPriceListId(id) {

    this.priceList.next(id);
  }
  getCustomerBilling() {

    return this.http.get(environment.apiPath + 'customerBilling/5059');
  }

  getCustomerShipping(id) {
    return this.http.get(environment.apiPath + 'customerShipping/' + id);
  }

  getItemsByPriceListIdAndCategory(id, catgery) {


    return this.http.get(environment.apiPath + 'priceList/getItemsByPriceListIdAndCategory/' + id + '/' + catgery);

  }
}
