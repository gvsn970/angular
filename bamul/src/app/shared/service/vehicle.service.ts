import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  subject = new Subject<any>();
  constructor(private http: HttpClient) { }
  vehicleData(message: string) {

    this.subject.next({ message });
  }
  getMessage(): Observable<any> {

    return this.subject.asObservable();
  }

  // getVechileDetails() {
  //   return this.http.get<any>(environment.apiPath + 'vehicle/getAllVehicle');
  // }
  getVechileDetails(pageNumber,PageSize,search) {
    return this.http.get<any>(environment.apiPath + 'vehicle/getVehicles?pageNo='+pageNumber+'&pageSize='+PageSize+'&vehicle='+search);
  }
  getVehicleDetailsById(vehicleDetailsById) {
    return this.http.get<any>(environment.apiPath + 'vehicle/' + vehicleDetailsById);
  }
  getVehicleAssignmentsById(vehicleAssignmentsById) {
    return this.http.get<any>(environment.apiPath + 'vehicle/assign/' + vehicleAssignmentsById);
  }
  saveVehicleDetail(vechilereg: any) {

    return this.http.post<any>(environment.apiPath + 'vehicle/saveVehicle', vechilereg);

  }
  saveVehicleAssignment(saveAssign: any) {

    //console.log(saveAssign);
    return this.http.post<any>(environment.apiPath + 'vehicleassignments/saveVehicleAssignment', saveAssign);

  }
  uploaddocumentanddetails(saveDocu: any) {
    return this.http.post<any>(environment.apiPath + 'documents/uploaddocumentanddetails', saveDocu)
    // return this.http.post<any>(environment.apiPath + 'vehicle/docs/saveVehicleDocsList', saveDocu);
  }
  updateVehicleDetail(updateVehicle: any) {

    return this.http.put<any>(environment.apiPath + 'vehicle/updateVehicle', updateVehicle);
  }
  updateVehicleAssignment(updateVehicleAssignment: any) {
    return this.http.put<any>(environment.apiPath + 'vehicleassignments/updateVehicleAssignment', updateVehicleAssignment);
  }
 

  updateVehicleDocsList(updateVehicleDocsList: any) {
    return this.http.put<any>(environment.apiPath + 'vehicle/docs/updateVehicleDocsList', updateVehicleDocsList);
  }
  getDropDownList(application, screenName, dropDownName) {
    return this.http.get(environment.apiPath + 'resource/getDropDownValues/' + application + '/' + screenName + '/' + dropDownName);
  }
  getAllDepartmentDetails() {
    return this.http.get<any>(environment.apiPath + 'department/getAllDepartmentDetails');
  }
  byrefidandreference(vechileId) {
    
    return this.http.get<any>(environment.apiPath +'documents/byrefidandreference?refId='+vechileId+'&reference=vehicle');
  }
  deletedocument(docId) {
    
    return this.http.delete<any>(environment.apiPath +'documents/deletedocument/'+docId);
  }

  getbyvendornameornumber(term) {
    //http://localhost:9091/vehicle/getVehicleDetailsByRegistrationNumber/PU-06-CA-1999
    var listOfBooks = this.http.get(environment.apiPath +'transporterView/getbyvendornameornumber/' + term)
      .pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
          (data: any) => {
            // return (
            //     data.length != 0 ? data as any[] : [{ "BookName": "No Record Found" } as any]
            // );
            return (
              data as any[]
            );
          }
        ));

    return listOfBooks;
  }

  vehicleassignments(vehicleId){
    return this.http.get(environment.apiPath +'vehicleassignments/getAssignmentsByVehicleId/'+vehicleId);
  }
}

