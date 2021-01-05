import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public userData: Subject<any> = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  validateUser(userData: any) {
    return this.http.post<any>(environment.apiPath + 'userLogin/validateApplicationUser', userData);
  }
  verifyUser(userData: any) {
    return this.http.get<any>(environment.apiPath + 'userLogin/checkByUserName/', userData);
    // return this.http.get<any>('https://bmlsuptpo.bamulnandini.coop/userLogin/checkByUserName/'+userData);
  }
  sendUserData(data) {
    this.userData.next(data);
  }
  getUserData(): Observable<any> {
    return this.userData.asObservable();
  }
  generateOtp() {
    return this.http.get<any>(environment.apiPath + 'pwdresetotp/getotp/');
    // return this.http.get<any>('https://bmlsuptpo.bamulnandini.coop/pwdresetotp/getotp/');
  }
  sendSms(phoneNumber,message) {
    return this.http.get<any>(environment.apiPath + 'sms/sendSMS/'+phoneNumber+'/'+message);
    // return this.http.get<any>('https://bmlsuptpo.bamulnandini.coop/sms/sendSMS/'+phoneNumber+'/'+message);
  }
  saveOtpToServer(otpData: any) {
    return this.http.post<any>(environment.apiPath + 'pwdresetotp/createpasswordresetotpdet', otpData);
    // return this.http.post<any>('https://bmlsuptpo.bamulnandini.coop/pwdresetotp/createpasswordresetotpdet', otpData);
  }
  changePassword(postData: any) {
    return this.http.put<any>(environment.apiPath + 'userLogin/updateuserpwd', postData);
    // return this.http.put<any>('https://bmlsuptpo.bamulnandini.coop/userLogin/updateuserpwd', postData);
  }
}
