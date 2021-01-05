import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    createUser(userData: any) {
        return this.http.post<any>(environment.apiPath + 'userLogin/createUser', userData);
    }

    getUserList() {
        return this.http.get(environment.apiPath + 'userLogin/getAllUsers');
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

}
