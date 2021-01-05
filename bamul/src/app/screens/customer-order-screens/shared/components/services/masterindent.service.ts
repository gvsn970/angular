import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MasterindentService {
  priceList = new Subject();

  private data = {};
  public listMaterIndent: Subject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }
  masterindentList(data) {
    this.listMaterIndent.next(data);
  }
  getMasterindentList(): Observable<any> {
    return this.listMaterIndent.asObservable();
  }

  setOptions(value) {
    this.data = value;
  }

  getOptions() {
    return this.data;
  }

  passPriceListId(id) {
    this.priceList.next(id);
  }
  getMasterIndentByMstrIndentId(masterIndentId) {

    return this.http.get(environment.apiPath + 'masterIndent/getMasterIndentByMstrIndentId/' + masterIndentId);
  }

  getCategoriesByPriceListIdAndItemCode(priceListId: any, itemCode: any) {
    //use
    return this.http.get(environment.apiPath + 'priceList/getCategoriesByPriceListIdAndItemCode/' + priceListId + '/' + itemCode);
  }

  validateMIAvailable(shipTositeUseId, shift, startDate, endDate) {

    return this.http.get(environment.apiPath + 'masterIndentView/validateMIAvailable/' + shipTositeUseId + '/' + shift + '/' + startDate + '/' + endDate);
  }

  getOrderTypeByPriceListId(priceList) {
    //use
    return this.http.get(environment.apiPath + 'orderType/getOrderTypeByPriceListId/' + priceList);
  }


  getCustBillingDetailsByAcctNo(accountNumber) {
    //use
    return this.http.get(environment.apiPath + 'customerDetail/getCustBillingDetailsByAcctNo/' + accountNumber
    );
  }

  getCustShippingDetailsByAcctNo(accountNumber) {
    //use
    return this.http.get(environment.apiPath + 'customerDetail/getCustShippingDetailsByAcctNo/' + accountNumber);
  }
  getOrderTypeName(orderTypeName) {
    //use
    return this.http.get(environment.apiPath + 'orderType/getOrderTypeName/' + orderTypeName);
  }
  getItemsByPriceListIdAndCategory(priceListId, catgery) {
    //use
    return this.http.get(environment.apiPath + 'priceList/getpricelistdistinctbypricelistidandsubcategory/' + priceListId + '/' + catgery);
  }

  createMstrIndent(saveMasterIndent: any) {
    //use
    return this.http.post(environment.apiPath + 'masterIndent/createMasterIndent', saveMasterIndent);
  }

  updateMasterIndent(updateMasterIndent: any) {

    return this.http.put(environment.apiPath + 'masterIndent/updatemasterindentdetails', updateMasterIndent);
  }
  getCategoriesByPriceListId(priceListId) {
    //use
    return this.http.get(environment.apiPath + 'priceList/getSubCategoriesByPriceListId/' + priceListId);

  }

  getPriceListName(priceList) {
    return this.http.get(environment.apiPath + 'orderType/getPriceListName/' + priceList);
  }

  getMasterIndentsByAccountNumber(accountNumber) {
   
    return this.http.get(environment.apiPath + 'masterIndentView/getMasterIndentsByAccountNumber/' + accountNumber);
  }

  getCustomerBalanceByAcctNo(accountNumber) {
    //use
    return this.http.get(environment.apiPath + 'customerBalance/getCustomerBalanceByAcctNo/' + accountNumber);
  }
  deleteLineItem(mstLineId) {
    //use
    return this.http.delete(environment.apiPath + 'masterIndent/deleteLineItem/' + mstLineId);
  }

  getItemDetailsByPriceListIdAndItemIdAndSellingUom(priceListId, inventoryItemId,  uom) {
    //use1
    return this.http.get(environment.apiPath + 'priceList/getItemDetailsByPriceListIdAndItemIdAndSellingUom/' + priceListId + '/' + inventoryItemId +  '/' + uom);
  }
  getItemDetails(priceListId, inventoryItemId, orderTypeId, uom) {
    //use1
    return this.http.get(environment.apiPath + 'priceList/getItemDetailsByPriceListIdAndItemIdAndOrderTypeIdAndUom/' + priceListId + '/' + inventoryItemId + '/' + orderTypeId + '/' + uom);
  }
  getAllIndentShifts(){
    return this.http.get(environment.apiPath +'indentShift/getAllIndentShifts');
  }
  getallsalesordertype(){
    return this.http.get(environment.apiPath +'salesordertypeview/getallsalesordertype');
  }
  getroutenumberandsequencebyshiptositeidordertypeidandshift(shipToSiteUseId,orderTypeId ,shift ) {
    
    return this.http.get(environment.apiPath + 'route/getroutenumberandsequencebyshiptositeidordertypeidandshift?shipToSiteUseId='+shipToSiteUseId+'&orderTypeId='+orderTypeId +'&shift='+shift);
  }

  shipToAdress(customerAccountNumber,shipToSiteUseId){
    return this.http.get(environment.apiPath + 'customerDetail/getcustdetailsbycustacntnumberandsiteuseidforshipto/'+customerAccountNumber+'/'+shipToSiteUseId);
  }
  billToAdress(customerAccountNumber,billToSiteUseId){
    return this.http.get(environment.apiPath + 'customerDetail/getcustdetailsbycustacntnumberandsiteuseidforbillto/'+customerAccountNumber+'/'+billToSiteUseId);
  }

  getAccountNumber(accountNumber){
    return this.http.get(environment.apiPath + 'customerDetail/getAccountNumber/'+accountNumber);
  }
  masterIndentStatus(){
    return this.http.get(environment.apiPath + 'resource/getDropDownValues/MASTERINDENT_STATUS');
  }

}
