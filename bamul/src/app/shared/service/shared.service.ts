import { Injectable } from '@angular/core';
import states from '../../../assets/data/india-states.json';
import stateCity from '../../../assets/data/state-city.json';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  states = [];
  cities = [];
  selectedState = 0;
  constructor(private http: HttpClient) {

  }

getDate() {
let today:any = new Date();
let dd: any = today.getDate();
let mm: any = today.getMonth() + 1; //January is 0!

const yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}
today = dd + '-' + mm + '-' + yyyy;
return today;
}
getTime() {
  return new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
}
getShift() {
  let data;
  const shiftDate: any = new Date().getHours();
  if (shiftDate >= 14) {
       data = 'E';
       return data;
    } else {
      data = 'M';
      return data;
    }
}

  getStates() {
    return states;
  }

  getCity() {
    return stateCity;
  }
  sendMessage(messageContent: any) {
    let testpath="http://localhost:10010/api/v1/sendMail";
    // return this.http.post<any>(environment.apiPath + 'driver/saveDriver', messageContent)
    return this.http.post<any>(testpath, messageContent)
  }

}
