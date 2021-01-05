import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DriverService {
  vehicleData: any;
  drivreData: any;

  constructor(private http: HttpClient) { }


  fileUpload(formaData) {
    // return this.http.post<any>(environment.apiPath +'imageupload/save', formaData);
    return this.http.post<any>(environment.apiPath + '/commondocuments/detailsupload', formaData);
  }

  // getDriverDetails() {
  //   return this.http.get<any>(environment.apiPath + 'driver/getAllDrivers');
  // }
  getDriverDetails(pageNumber,PageSize,search) {
    return this.http.get<any>(environment.apiPath + 'driver/getDrivers?pageNo='+pageNumber+'&pageSize='+PageSize+'&driver='+search);
  }
  getDropDownList(application, screenName, dropDownName) {
    return this.http.get(environment.apiPath + 'resource/getDropDownValues/' + application + '/' + screenName + '/' + dropDownName);
  }


  updateDriver(updateDriver: any) {
    return this.http.put<any>(environment.apiPath + 'driver/updateDriverHeader', updateDriver)
  }


  updateDriverAssignments(updateDriverAssignments: any) {
   
    return this.http.put<any>(environment.apiPath + 'driverassignments/updateDriverAssignments', updateDriverAssignments)
  }

  updateDriverDocumentsList(updateDriverDocumentsList: any) {
    return this.http.put<any>(environment.apiPath + 'driver/docs/updateDriverDocumentsList', updateDriverDocumentsList)
  }

  getAllDepartmentDetails() {

    return this.http.get<any>(environment.apiPath + 'department/getAllDepartmentDetails');
  }
  createDriver(createDriver: any) {

    return this.http.post<any>(environment.apiPath + 'driver/saveDriver', createDriver)

  }
  saveDriverAssignments(saveDriverAssignments: any) {
    return this.http.post<any>(environment.apiPath + 'driverassignments/saveDriverAssignments', saveDriverAssignments)
  }

  uploaddocumentanddetails(saveDriverDoc: any) {
    return this.http.post<any>(environment.apiPath + '/documents/uploaddocumentanddetails', saveDriverDoc)
    // return this.http.post<any>(environment.apiPath + 'driver/docs/saveDriverDocumentsListwithImage', saveDriverDoc)
    // return this.http.post<any>(environment.apiPath + '/commondocuments/detailsupload', saveDriverDoc)
    }


  UpdateDriver(updateDriver: any) {

    return this.http.post<any>(environment.apiPath + 'driver/updateDriver', updateDriver)

  }
  byrefidandreference(driverId) {
    return this.http.get<any>(environment.apiPath + 'documents/byrefidandreference?refId=' + driverId + '&reference=Driver');
  }
  deletedocument(docId) {

    return this.http.delete<any>(environment.apiPath + 'documents/deletedocument/' + docId);
  }
 
  driverassignmentsList(bydriverid){
    return this.http.get(environment.apiPath +'driverassignments/bydriverid?driverId='+bydriverid);
 
  }

}

