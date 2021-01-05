import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GatePassService {
  getRoutes: any;

  constructor(private http: HttpClient) { }

  getAllGatePass() {

    return this.http.get<any>(environment.apiPath + 'gatePass/getAllGatePass');
  }
  deleteGatePass(id) {

    return this.http.delete<any>(environment.apiPath + 'gatePass/deleteGatePass/' + id);
  }

  createGatePass(gatePass: any) {

    return this.http.post<any>(environment.apiPath + 'gatePass/createGatePass', gatePass);
  }
  updateGatePass(gatePass: any) {

    return this.http.put<any>(environment.apiPath + 'gatePass/updateGatePass', gatePass);
  }



}
