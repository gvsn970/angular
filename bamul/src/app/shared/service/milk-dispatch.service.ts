import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MilkDispatchService {

  constructor(private http: HttpClient) {
  }
  saveMTDCItems(collectionData) {
    return this.http.post(environment.apiPath + 'milkDelivery/saveMTDCItems', collectionData);
  }
  getMilkTransferByChallanNo(id) {
    return this.http.get (environment.apiPath + `milkDelivery/getMilkTransferByChallanNo/${id}`)
  }
  getItems() {
    return this.http.get (environment.apiPath + `milkTransferItems/getCCToDairyItemsRawMilk`)
  }
  getExtraItems() {
    return this.http.get (environment.apiPath + `milkTransferItems/getCCToDairyItemsNOTRawMilk`)
  }
  getMilkDispatchList() {
    return this.http.get (environment.apiPath + `milkDelivery/getAllMilkTrans`)
  }
  updateMTDCItems(collectionData) {
    return this.http.put(environment.apiPath + 'milkDelivery/updateMTDCItems', collectionData);
  }
}
