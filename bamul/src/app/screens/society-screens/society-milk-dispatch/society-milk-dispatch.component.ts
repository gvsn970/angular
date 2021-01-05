import { Component, OnInit, ElementRef } from '@angular/core';
import { MilkSocietyService } from 'src/app/shared/service/milk-society.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-society-milk-dispatch',
  templateUrl: './society-milk-dispatch.component.html',
  styleUrls: ['./society-milk-dispatch.component.css']
})
export class SocietyMilkDispatchComponent implements OnInit {
  supplierViewVal: any;
  allLocations: any;
  userData: any;
  userDetailsById: any;
  shift: any;
  currentDate: any;
  currentTime: any;
  dispatchModeList: any;
  societyDispatchDetails: any = {};
  ngForm: FormGroup;
  submitted = false;
  disableSelf = true;
  disableRoute = true;
  locationDetails: any = [];
  selfDispatchTime: any;
  selfView: any;
  routeView: any;
  updateTripDetails: any;
  dispatchLocationDetails: any;
  tripDate;
  ShiftTrip;
  socId;
societyLogs;

  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private milkSocietyService: MilkSocietyService,
    private datePipe: DatePipe,
    private toastr: ToastrService, private router: Router,
    private SharedService: SharedService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('data'));
    const vendorNumber = this.userData.vendorNum;
    this.milkSocietyService.getSupplierViewByVendorNumber(vendorNumber).subscribe((response) => {
      if (response) {
        this.supplierViewVal = response;
      }
    });
    this.activatedRoute.params.subscribe(params => {
      if (params['societyId']) {
        this.socId = params['societyId'];
        console.log(this.socId)
      }
      if (params['shift']) { 
        this.ShiftTrip = params['shift'];
        console.log(this.ShiftTrip);
    }
      if (params['tripdate']) {
        this.tripDate = params['tripdate'];
        console.log(this.tripDate)
      }

    });

    
    // Get Location Details
    this.milkSocietyService.getAllLocations().subscribe((response) => {
      this.allLocations = response;
    });

    this.userData = JSON.parse(localStorage.getItem('data'));

    const userId = this.userData.userId;
    this.milkSocietyService.getUserDetailsById(userId).subscribe((response) => {
      this.userDetailsById = response;
    });

    const dateNow: any = this.datePipe.transform(new Date(), 'HH');

    if (dateNow > 4 && dateNow < 14) {
      this.shift = 'M';
    } else {
      this.shift = 'E';
    }
    this.ngForm = this.formBuilder.group({
      routeNumber:['', Validators.required],
      routeId: [1111],
      vehicleNumber: [''],
      driverName: [''],
      arrTime: [''],
      depTime: [''],
      totalQty: ['', Validators.required],
      looseSalesQty: ['', Validators.required],
      noOfCans: ['', Validators.required],
      apxCLR: ['', Validators.required],
      apxFAT: ['', Validators.required],
      apxSNF: ['', [Validators.required]]
    });

    this.dispatchModeList = ['Route', 'Self'];
    this.disableRoute = true;
    
    this.setUserCategoryValidators();

    this.milkSocietyService.getSocietyLog(this.socId,this.ShiftTrip,this.tripDate).subscribe((response) => {
      this.societyLogs = response;
      console.log(this.societyLogs);
      this.dispatchVal('Route');
       this.ngForm.patchValue({
        totalQty: this.societyLogs.totalQty,
        looseSalesQty: this.societyLogs.looseSalesQty,
        noOfCans : this.societyLogs.noOfCans,
        apxCLR : this.societyLogs.apxCLR,
        apxFAT: this.societyLogs.apxFAT,
        apxSNF : this.societyLogs.apxSNF,
        });
    });
  }

  get f() { return this.ngForm.controls; }


  setUserCategoryValidators() {
    const vehicleNumber = this.ngForm.get('vehicleNumber');
    const driverName = this.ngForm.get('driverName');
    const arrTime = this.ngForm.get('arrTime');
    const depTime = this.ngForm.get('depTime');
    if (this.selfView === true) {
      vehicleNumber.setValidators([Validators.required]);
      driverName.setValidators([Validators.required]);
      arrTime.setValidators([Validators.required]);
      depTime.setValidators([Validators.required]);
    }
    else {
      vehicleNumber.clearValidators();
      driverName.clearValidators();
      arrTime.clearValidators();
      depTime.clearValidators();
    }
    vehicleNumber.updateValueAndValidity();
    driverName.updateValueAndValidity();
    arrTime.updateValueAndValidity();
    depTime.updateValueAndValidity();
  }

  dispatchVal(val) {
    const currentDate: any = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.selfDispatchTime = this.datePipe.transform(new Date(), 'HH:mm:ss ');
    if (val === 'Route') {
      this.disableRoute = false;
      this.routeView = true;
      this.selfView = false;
      this.locationDetails = [];
      const dateNow = '12-06-2020';
      const shift = 'M';
      const vendorNum = this.userData.vendorNum;

      this.milkSocietyService.getTripDetailsByScheduleDateAndShiftAndRoutePointCode(this.tripDate, this.ShiftTrip, this.socId).subscribe((response) => {
        // this.ngForm.patchValue({
        //   vehicleNumber: this.societyDispatchDetails.vehicleNumber,
        // });
        this.societyDispatchDetails = response;
        if (this.societyDispatchDetails && this.societyDispatchDetails!=null && this.societyDispatchDetails.tripTransactionId) {
          this.ngForm.patchValue({
            routeNumber: this.societyDispatchDetails.routeNumber,
         });
          this.milkSocietyService.getTripPointDetails(this.societyDispatchDetails.tripTransactionId, vendorNum).subscribe((response) => {
            this.updateTripDetails = response;
            console.log(this.updateTripDetails);
          });
        }
      });
    }
    else if (val === 'Self') {
      this.selfView = true;
      this.routeView = false;
      this.societyDispatchDetails = {};
      this.locationDetails = [{ 'locationCode': 'CC', 'locationType': 'CHILLING' }, { 'locationCode': 'BMC', 'locationType': 'BCHILLING' }];
      //this.selfDispatchTime = this.datePipe.transform(new Date(), 'HH:mm:ss ');
    }

    this.setUserCategoryValidators();
  }

  getDispatchLocation(locationType) {
    this.milkSocietyService.getLocationByType(locationType).subscribe((response) => {
      this.dispatchLocationDetails = response;

    });
  }

  roundToTwo(num) {    
    let n = Number(num + 'e+2');
    return +(Math.round(n)  + "e-2");
}

updateData() {
  if (this.ngForm.value.apxCLR !="" && this.ngForm.value.apxFAT !="") {
       this.ngForm.patchValue({
          apxSNF: this.roundToTwo((((this.ngForm.value.apxCLR)/4)+(0.25*this.ngForm.value.apxFAT) + 0.35)),
        });
     

  }
}

save() {
  this.setUserCategoryValidators();
  const objVal = this.ngForm.value;
  const updatedObjVal = {
    // ACC_QTY: this.updateTripDetails.actualQuantity,
    // EXP_RCH_TIME: this.selfDispatchTime,
    // EXP_ARR_TIME: this.updateTripDetails.expectedArrivalTime,
    // SEND_QTY: this.updateTripDetails.sendQuantity,
    tripPointId: this.updateTripDetails.tripPointId,
    tripTransactionId: this.updateTripDetails.tripTransactionId,
    routePointId: this.updateTripDetails.routePointId,
    routePointCode: this.updateTripDetails.routePointCode,
    routePointName: this.updateTripDetails.routePointName,
    routeNumber: this.updateTripDetails.routeNumber,
    routePointSequenceNo: this.updateTripDetails.routePointSequenceNo,
    partyShipId: this.updateTripDetails.partyShipId,
    routePointContactName: this.updateTripDetails.routePointContactName,
    routePointContactNo: this.updateTripDetails.routePointContactNo,
    estimatedquantity: this.updateTripDetails.estimatedquantity,
    actualQuantity: this.ngForm.value.noOfCans,
    expectedReachTime: this.selfDispatchTime,
    expectedArrivalTime: this.updateTripDetails.expectedArrivalTime,
    ebsReferenceNo: this.updateTripDetails.ebsReferenceNo,
    remarks: this.updateTripDetails.remarks,
    creationDate: this.updateTripDetails.creationDate,
    creationBy: this.updateTripDetails.creationBy,
    lastUpdateDate: this.updateTripDetails.lastUpdateDate,
    lastUpdatedBy: this.updateTripDetails.lastUpdatedBy,
    lastUpdateLogin: this.updateTripDetails.lastUpdateLogin,
    receivedQty: this.ngForm.value.noOfCans,
    returnQuantity: this.updateTripDetails.returnQuantity,
    distanceInKm: this.updateTripDetails.distanceInKm,
    sendQuantity: this.ngForm.value.totalQty
  };
  objVal.socId = this.userData.vendorNum;
  if (Object.keys(this.societyDispatchDetails).length > 0) {
    objVal.vehicleNumber = this.societyLogs.vehicleNumber;
    objVal.driverName = this.societyLogs.driverName;
    objVal.arrTime = this.societyDispatchDetails.estimatedStartTime;
    objVal.depTime = this.selfDispatchTime;
  }
  else {
    objVal.arrTime = objVal.arrTime + ':00';
    objVal.depTime = objVal.depTime + ':00';
  }

  var aTime = objVal.arrTime.split(':');
  var dTime = objVal.depTime.split(':');
  // if (aTime > dTime) {
  //   this.toastr.warning('Arrival time cannot be earlier than dispatch time', 'Dispatch', {
  //     timeOut: 4000
  //   });
  //   //this.submitted = false;
  //   return;
  // }
  objVal.socLogId = this.societyLogs.socLogId;
  objVal.creationDate = this.societyLogs.creationDate;
  objVal.createdBy = this.societyLogs.createdBy
  objVal.lastUpdatedBy = this.userData.userId;
  objVal.lastUpdateLogin = null;
  objVal.status = 'Running';
  objVal.shift = this.societyLogs.shift;
  objVal.tripDate = this.societyLogs.tripDate;
  objVal.lastUpdateDate = this.SharedService.getDate();

  this.submitted = true;
  if (this.ngForm.invalid) {
    return;
  }
  if (this.ngForm.valid) {
    this.milkSocietyService.updateSocietyLog(objVal).subscribe((response) => {
    });

    this.milkSocietyService.updateTripPoints(updatedObjVal).subscribe((response) => {
      this.toastr.success('Saved Sucessfully', 'Success', {
        timeOut: 4000
      });
      //this.router.navigate(['/society-operator/list-dispatch']);
    });
   
  }


}

  saveDispatch() {
    this.setUserCategoryValidators();
    const objVal = this.ngForm.value;
    const updatedObjVal = {
      // ACC_QTY: this.updateTripDetails.actualQuantity,
      // EXP_RCH_TIME: this.selfDispatchTime,
      // EXP_ARR_TIME: this.updateTripDetails.expectedArrivalTime,
      // SEND_QTY: this.updateTripDetails.sendQuantity,
      tripPointId: this.updateTripDetails.tripPointId,
      tripTransactionId: this.updateTripDetails.tripTransactionId,
      routePointId: this.updateTripDetails.routePointId,
      routePointCode: this.updateTripDetails.routePointCode,
      routePointName: this.updateTripDetails.routePointName,
      routeNumber: this.updateTripDetails.routeNumber,
      routePointSequenceNo: this.updateTripDetails.routePointSequenceNo,
      partyShipId: this.updateTripDetails.partyShipId,
      routePointContactName: this.updateTripDetails.routePointContactName,
      routePointContactNo: this.updateTripDetails.routePointContactNo,
      estimatedquantity: this.updateTripDetails.estimatedquantity,
      actualQuantity: this.ngForm.value.noOfCans,
      expectedReachTime: this.selfDispatchTime,
      expectedArrivalTime: this.updateTripDetails.expectedArrivalTime,
      ebsReferenceNo: this.updateTripDetails.ebsReferenceNo,
      remarks: this.updateTripDetails.remarks,
      creationDate: this.updateTripDetails.creationDate,
      creationBy: this.updateTripDetails.creationBy,
      lastUpdateDate: this.updateTripDetails.lastUpdateDate,
      lastUpdatedBy: this.updateTripDetails.lastUpdatedBy,
      lastUpdateLogin: this.updateTripDetails.lastUpdateLogin,
      receivedQty: this.ngForm.value.noOfCans,
      returnQuantity: this.updateTripDetails.returnQuantity,
      distanceInKm: this.updateTripDetails.distanceInKm,
      sendQuantity: this.ngForm.value.totalQty
    };
    objVal.socId = this.userData.vendorNum;
    if (Object.keys(this.societyDispatchDetails).length > 0) {
      objVal.vehicleNumber = this.societyLogs.vehicleNumber;
      objVal.driverName = this.societyLogs.driverName;
      objVal.arrTime = this.societyDispatchDetails.estimatedStartTime;
      objVal.depTime = this.selfDispatchTime;
    }
    else {
      objVal.arrTime = objVal.arrTime + ':00';
      objVal.depTime = objVal.depTime + ':00';
    }

    var aTime = objVal.arrTime.split(':');
    var dTime = objVal.depTime.split(':');
    // if (aTime > dTime) {
    //   this.toastr.warning('Arrival time cannot be earlier than dispatch time', 'Dispatch', {
    //     timeOut: 4000
    //   });
    //   //this.submitted = false;
    //   return;
    // }
    objVal.socLogId = this.societyLogs.socLogId;
    objVal.creationDate = this.societyLogs.creationDate;
    objVal.createdBy = this.societyLogs.createdBy
    objVal.lastUpdatedBy = this.userData.userId;
    objVal.lastUpdateLogin = null;
    objVal.status = 'Dispatched';
    objVal.shift = this.societyLogs.shift;
    objVal.tripDate = this.societyLogs.tripDate;
    objVal.lastUpdateDate = this.SharedService.getDate();

    this.submitted = true;
    if (this.ngForm.invalid) {
      return;
    }
    if (this.ngForm.valid) {
      this.milkSocietyService.updateSocietyLog(objVal).subscribe((response) => {
      });

      this.milkSocietyService.updateTripPoints(updatedObjVal).subscribe((response) => {
        this.toastr.success('Dispatch Created Sucessfully', 'Dispatch', {
          timeOut: 4000
        });
        this.router.navigate(['/society-operator/list-dispatch']);
      });
      window.print();
    }


  }

  redirectToList(){
    this.router.navigate(['/society-operator/list-dispatch']);
  }
}
