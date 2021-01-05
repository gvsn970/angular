import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GatePassService} from 'src/app/shared/service/gate-pass.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-gate-pass',
  templateUrl: './list-gate-pass.component.html',
  styleUrls: ['./list-gate-pass.component.css']
})
export class ListGatePassComponent implements OnInit {
  gateList: any;
  userDetails: any;
  
 constructor(
    private router: Router,
    private gatepassService :GatePassService,
    private spinnerService: NgxSpinnerService ) { 
    this.userDetails=  JSON.parse(localStorage.getItem('data'));
    }

  ngOnInit( ) {
    this.getAllGatePass();
      }

  redirectTo( i) {
        this.router.navigateByUrl('super-admin/security/update-gatepass' );
    //console.log(i, 'gatepassUpdate');
  let gateListParticularRow = i;
    localStorage.setItem('gatepassUpdate', JSON.stringify(gateListParticularRow));
  }


  gateView(i) {
        this.router.navigateByUrl('super-admin/security/view-gatepass' );
    //console.log(i, 'gatepassUpdate');
  let gateListParticularRow = i;
    localStorage.setItem('gatepassUpdate', JSON.stringify(gateListParticularRow));
  }

  getAllGatePass() {
    this.spinnerService.show();
    this.gatepassService.getAllGatePass().subscribe(res => {
          this.gateList = res;
      this.spinnerService.hide();
    }, error => {
           //console.log(error);
    })
  }

}
