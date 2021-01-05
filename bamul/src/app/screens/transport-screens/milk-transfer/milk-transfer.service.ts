import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MilkTransferService {
    constructor(private http: HttpClient) { }

    getAllSourceLocation() {
        return this.http.get<any>(environment.apiPath + 'location/getAllLocationByTypes/CC');
    }

    getAllDestinationLocation() {
        return this.http.get(environment.apiPath + 'location/getAllLocationByTypes/DAIRY');
    }

    getMilkTransferList() {
        return this.http.get(environment.apiPath + 'milkDelivery/getAllMilkTrans');
    }


    saveMilkTransferHeader(Data: any) {
        return this.http.post<any>(environment.apiPath + 'milkDelivery/saveMilkTransHdr', Data);
    }

    getAllLocationByLocId(locID) {
        return this.http.get(environment.apiPath + 'location/getAllLocationByLocId/' + locID);
    }

    getMilkTransferByChallanNos(challanNo) {
        return this.http.get(environment.apiPath + 'milkDelivery/getMilkTransferByChallanNo/' + challanNo);
    }
}
