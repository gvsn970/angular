import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferindentService {

  constructor(private http: HttpClient) { }
  milkTransferIndent(milkTransferIndent: any) {
    return this.http.post(environment.apiPath + 'milkDelivery/createMilkTrIndent', milkTransferIndent);
  }
  getAllLocations() {
    return this.http.get(environment.apiPath + 'location/getAllLocations');
  }
  updateMilkTrIndent(updateMilkTrIndent: any) {
    return this.http.put(environment.apiPath + 'milkDelivery/updateMilkTrIndent', updateMilkTrIndent);
  }



}
