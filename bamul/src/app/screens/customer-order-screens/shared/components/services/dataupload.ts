import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DataUploderService {
  constructor(private http: HttpClient) { }
  receptCreation(readReceptCreationExcelSheet) {
    return this.http.post<any>(environment.apiPath + 'receptCreation/readReceptCreationExcelSheet', readReceptCreationExcelSheet)
  }
  axisBankCashReceipt(readAxisBankReceptExcelSheet) {
    return this.http.post<any>(environment.apiPath + 'axisBankCashReceipt/readAxisBankReceptExcelSheet', readAxisBankReceptExcelSheet)
  }

  uploadempbioexcelsheetdata(uploadempbioexcelsheetdata) {
    return this.http.post<any>(environment.apiPath + 'bmlempbio/uploadempbioexcelsheetdata', uploadempbioexcelsheetdata)
  }
  employeeNumber(employeeNumber) {
    return this.http.get<any>(environment.apiPath+'portalbioview/valempnum?employeeNumber='+employeeNumber)
  }
}