import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    createUser(userData: any) {
        return this.http.post<any>(environment.apiPath + 'userLogin/createUser', userData);
    }

    getUserList() {
        return this.http.get(environment.apiPath + `userLogin/getAllUsers`);
    }

    getUserByUserId(userId) {
        return this.http.get(environment.apiPath + 'userLogin/getUser/' + userId);
    }

    updateUser(userData: any) {
        return this.http.put<any>(environment.apiPath + 'userLogin/updateUser', userData);
    }

    deleteUser(userData: any) {
        return this.http.delete<any>(environment.apiPath + 'userLogin/deleteUser/' + userData);
    }
    getUsers(currentPageNumber , pageSize , filterValue) {
        return this.http.get(environment.apiPath + `userLogin/getUsers?pageNo=${currentPageNumber}&pageSize=${pageSize}&user=${filterValue}`);
    }

    //http://localhost:9091/customerDetail/getAllCustomerDetails

    // getCustomerList() {
    //     return this.http.get(environment.apiPath + 'customerDetail/getAllCustomerDetails');
    // }

    getSupplierList(supplierData) {
        return this.http.get(environment.apiPath + 'supplierview/vendorName/' + supplierData);
    }

    getContractorList() {
        return this.http.get(environment.apiPath + 'vehicleContractor/getAllContractors');
    }

    getEmployeeList(employeeData) {
        return this.http.get(environment.apiPath + 'employee/getEmpByName/' + employeeData);
    }

    getLocationList() {
        return this.http.get(environment.apiPath + 'location/getAllLocations');
    }

    getApplicationList() {
        return this.http.get(environment.apiPath + 'department/getAppName');
    }

    getRoleByAppName(appName) {
        return this.http.get(environment.apiPath + 'department/getRoleByAppName/' + appName);
    }





    checkuserExist(userName: any) {
        //return this.http.get<any>(environment.apiPath + 'userLogin/userCheck', userName);
        return this.http.get(environment.apiPath + 'userLogin/userCheck/' + userName);
    }

    getDropDownList(application, screenName, dropDownName) {
        return this.http.get(environment.apiPath + 'resource/getDropDownValues/' + application + '/' + screenName + '/' + dropDownName);
    }

    getCustomerList(term) {
        var listOfBooks = this.http.get(environment.apiPath + 'customerDetail/getCustDetailsByName/' + term)
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

}
