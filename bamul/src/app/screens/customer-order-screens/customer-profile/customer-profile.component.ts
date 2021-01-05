import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../shared/components/services/user-profile.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  userDetails: any;
  data: any;
  customerShipping: object;
  customerDetailByAcctId: any;
  customerBilling: object;

  constructor(private UserProfileService: UserProfileService) { }

  ngOnInit() {
    this.getCustomerShipping();
    this.getCustomerBilling();
    this.data = JSON.parse(localStorage.getItem('data'));

  }

  getCustomerDetailByAcctId() {

    this.data = JSON.parse(localStorage.getItem('data'));
    this.UserProfileService.getCustomerDetailByAcctId(this.data.accountNumber).subscribe(res => {

      ////console.log(res);
      this.customerDetailByAcctId = res;
      localStorage.setItem('priceListId', JSON.stringify(this.customerDetailByAcctId));
    },
      error => {

        ////console.log(error);
      }
    );
  }
  getCustomerBilling() {

    this.data = JSON.parse(localStorage.getItem('data'));
    this.UserProfileService.getCustomerBilling(this.data.accountNumber).subscribe(response => {

      ////console.log(response);
      this.customerBilling = response;
    },
      error => {

        ////console.log(error);
      }

    );
  }
  getCustomerShipping() {

    this.data = JSON.parse(localStorage.getItem('data'));

    this.UserProfileService.getCustomerShipping(this.data.accountNumber).subscribe(response => {

      ////console.log(response);
      this.customerShipping = response;
    },
      error => {

        ////console.log(error);
      }

    );



  }



}
