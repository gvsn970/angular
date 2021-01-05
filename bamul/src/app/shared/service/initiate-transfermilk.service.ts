import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InitiateTransferMilkService {

    constructor(private http: HttpClient) {
    }
    getUserDetails(userId) {
        return this.http.get(environment.apiPath + 'userLogin/getUser/' + userId);
    }
    getAllDepartmentDetails() {
        return this.http.get(environment.apiPath + 'department/getAllDepartmentDetails');
    }
    getAllMilkTransTypes() {
        return this.http.get(environment.apiPath + 'tranferTypes/getAllMilkTransTypes');
    }
    getAllLocationWithOrgSubInvtory() {
        return this.http.get(environment.apiPath + 'location/getAllLocationWithOrgSubInvtory');
    }
    getLocationDetailsByLocId(locId) {
        return this.http.get(environment.apiPath + 'locationDetails/getLocationDetailsByLocationId/'+locId);
    }
    getCustomerBySalesOrder(val) {
        return this.http.get(environment.apiPath + 'milkDelivery/customer/getCustomerBySalesOrder/' + val);
    }
    getShippingDetailsByAccountNumber(accNo) {
        return this.http.get(environment.apiPath + 'customerDetail/getCustShippingDetailsByAcctNo/' + accNo);
    }
    getItemsByTransferRequestType(val) {
        return this.http.get(environment.apiPath + 'milkTransferItems/getItemsByTransferRequestType/' + val);
    }
    getallitemsviewbycategory(val) {
        return this.http.get(environment.apiPath + 'itemsview/getallitemsviewbycategory/' + val);
    }
    getDistinctOrgId() {
        return this.http.get(environment.apiPath + 'location/getDistinctOrgId');
    }
    getAllSubInvCodeByOrgId(orgId) {
        return this.http.get(environment.apiPath + 'location/getAllSubInvCodeByOrgId/' + orgId);
    }
    getLocationDetailsByLocationId(locId,itemId) {
        return this.http.get(environment.apiPath + 'itemsview/bylocationidanditemid?locationId=' + locId + '&itemId=' + itemId);
    }
    getAllLocationBySubInvCode(subInvCode) {
        return this.http.get(environment.apiPath + 'location/getAllLocationBySubInvCode/' + subInvCode);
    }

    getAllItemLevelLocationBySubInvCode(itemId, subInvCode, locationId) {
        // return this.http.get(environment.apiPath + 'onhandQty/getLocatoryByLocationIdAndSubInvCode/' + fromLocId + '/' + subInvCode);
        // return this.http.get(environment.apiPath + 'itemsview/byitemidandsubinventorycode?itemId=' + itemId +'&subinventoryCode=' + subInvCode);
        return this.http.get(environment.apiPath + 'itemsview/getItemsviewByItemIdAndSubinventoryCodeAndInventoryLocationId/'+itemId+'/'+subInvCode+'/'+locationId);
    }

    saveMilkTransferHeader(Data: any) {
        return this.http.post<any>(environment.apiPath + 'milkDelivery/saveMilkTransHdr', Data);
    }
    getAllMilkTransferByFromLocationId(locationId) {
        return this.http.get(environment.apiPath + 'milkDelivery/getAllMilkTransferByFromLocationId/' + locationId);
    }
    getItemsviewByItemIdAndSubinventoryCodeAndInventoryLocationId(itemId) {
        return this.http.get(environment.apiPath + 'itemsview/getUOMByItemId/' + itemId);
    }
    getMilkTransferByChallanNos(challanNo) {
        return this.http.get(environment.apiPath + 'milkDelivery/getMilkTransferByChallanNo/' + challanNo);
    }
    getDistinctMaterialType() {
        return this.http.get(environment.apiPath + 'itemsview/getDistinctMaterialType');
    }
    getAllLocationDetail() {
        return this.http.get(environment.apiPath + 'locationDetails/getAllLocationDetailDistinct');
    }

    deleteLineItem(itemNumber) {
        //use
        return this.http.delete(environment.apiPath + 'milkDelivery/deleteMTDCItem/' + itemNumber);
    }
    getUOMByItemId(val) {
        return this.http.get(environment.apiPath + 'itemsview/getUOMByItemId/' + val);
    }
    getAllLocationByLocId(val) {
        return this.http.get(environment.apiPath + 'location/getAllLocationByLocId/' + val);
    }
    getMilkTransferByTripTransactionId(val) {
        return this.http.get(environment.apiPath + 'milkDelivery/getMilkTransferByTripTransactionId/' + val);
    }
    getSourceDestinationType() {
        return this.http.get(environment.apiPath + 'locationDetails/getDistinctSubInventoryType');
    }
    getLocationByType(type) {
        return this.http.get(environment.apiPath + 'locationDetails/getLocationDetailsBySubInventoryType/' + type);
    }

    getDistinctMaterialTypeById(id) {
        return this.http.get(environment.apiPath + `itemsview/distinctMaterialTypeByLocationId/${id}`);
    }
    
}
