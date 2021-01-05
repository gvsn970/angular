import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class MilkSocietyService {
    constructor(private http: HttpClient) { }

    getSupplierViewByVendorNumber(vendorNum) {
        return this.http.get(environment.apiPath + 'supplierview/vendornum/' + vendorNum);
    }

    getAllLocations() {
        return this.http.get(environment.apiPath + 'location/getAllLocations/');
    }
    getUserDetailsById(userId) {
        return this.http.get(environment.apiPath + 'userLogin/getUser/' + userId);
    }

    saveSociety(dispatchData: any) {
        return this.http.post<any>(environment.apiPath + 'societylog/savesociety/log', dispatchData);
    }
    getSocietyLog(socId,shift,tripdate) {
        return this.http.get(environment.apiPath + `societylog/shiftwithsocidtripdate?socId=${socId}&shift=${shift}&tripDate=${tripdate}`);
    }
updateSocietyLog(updateLogs) {
    return this.http.put<any>(environment.apiPath + 'societylog/updatesociety/log',updateLogs);
}
    // updateTripPoints(updateDispatchData: any) {
    //     return this.http.put<any>(environment.apiPath + 'trip/updateTripPoints', updateDispatchData);
    // }

    updateTripPoints(updateDispatchData: any) {
        return this.http.put<any>(environment.apiPath + 'trip/update/trippoint', updateDispatchData);
    }
    getdispatchListBySocId(socId: any) {
        return this.http.get(environment.apiPath + 'societylog/societyid?socId=' + socId);
    }
    getCustomerShipping(custId) {
        return this.http.get(environment.apiPath + 'customerShipping/' + custId);
    }

    getTripDetailsByScheduleDateAndShiftAndRoutePointCode(dateNow, shift, vendorNum) {
        return this.http.get(environment.apiPath + 'trip/getTripDetailsByScheduleDateAndShiftAndRoutePointCode/' + dateNow + '/' + shift + '/' + vendorNum);
    }
    getTripPointDetails(tripTransactionId, vendorNum) {
        return this.http.get(environment.apiPath + 'trip/getTripPointDetails/' + tripTransactionId + '/' + vendorNum);
    }
    getLocationByType(locationType) {
        return this.http.get(environment.apiPath + 'location/getLocationByType/' + locationType);
    }
}
