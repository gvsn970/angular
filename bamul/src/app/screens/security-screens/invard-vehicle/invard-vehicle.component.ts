import { Component, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SecurityService } from 'src/app/shared/service/security.service';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-invard-vehicle',
  templateUrl: './invard-vehicle.component.html',
  styleUrls: ['./invard-vehicle.component.css']
})
export class InvardVehicleComponent implements OnInit {

  userData: any;
  invardVehicleItem: any;
  ngForm: FormGroup;
  submitted: boolean = false;
  receivedCans: any;

  constructor(private securityService: SecurityService, private datePipe: DatePipe, private formBuilder: FormBuilder, private toastr: ToastrService , private SharedService: SharedService) {

  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('data'));

    var timeNow: any = this.datePipe.transform(new Date(), "HH")

    if (timeNow > 4 && timeNow < 16) {
      var shift = 'M';
    }
    else {
      var shift = 'E';
    }

    //var dateNow: any = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    var dateNow: any = '19-12-2019';


    this.securityService.getVehicleInward(this.SharedService.getShift(), this.SharedService.getDate()).subscribe((response) => {
      if (response)
        this.invardVehicleItem = response;
      //console.log(this.invardVehicleItem, 'invardVehicleItem');
    });

    this.ngForm = this.formBuilder.group({
      receivedCans: ['', Validators.required]
    });
  }

  saveInward(receivedCans) {
    //console.log(this.receivedCans, 'receivedCans');
    var objVal = this.ngForm.value;
    objVal.shift = this.invardVehicleItem.shift;
    // objVal.creationDate = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    // objVal.createdBy = this.userData.userId;
    // objVal.lastUpdatedBy = this.userData.userId;
    // objVal.lastUpdateLogin = null;
    // objVal.status = 'New';

    // objVal.tripDate = '24-12-2019';
    // objVal.lastUpdateDate = '24-12-2019';
    // objVal.arrTime = this.ngForm.value.arrTime + ':00';
    // objVal.depTime = this.ngForm.value.depTime + ':00';
    //console.log(objVal, 'objVal')
    this.submitted = true;
    if (this.ngForm.invalid) {
      return;
    }
    // if (this.ngForm.valid) {
    //   this.securityService.saveVehicleInward(objVal).subscribe((response) => {
    //     this.toastr.success('Dispatch Created Sucessfully', 'Dispatch', {
    //       timeOut: 4000
    //     });

    //   });
    //   this.ngForm.reset();
    // }


  }

}
