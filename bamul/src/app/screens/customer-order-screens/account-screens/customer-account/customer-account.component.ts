import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.css']
})
export class CustomerAccountComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  rechargeAccount() {

    this.router.navigateByUrl('account-operator/recharge-account');

  }
}
