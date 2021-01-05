import { Component, OnInit , OnDestroy } from '@angular/core';
import { WeighingBridgeService } from '../../../shared/service/weighing-bridge.service';
import { MilkCollectionService } from 'src/app/shared/service/milk-collection.service';
import { BsDatepickerConfig, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators, NgForm, FormControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SharedService } from 'src/app/shared/service/shared.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-weighment-entry',
  templateUrl: './weighment-entry.component.html',
  styleUrls: ['./weighment-entry.component.css']
})
export class WeighmentEntryComponent implements OnInit , OnDestroy {
  modalRef: BsModalRef;
  routeDetail: any;
  vehicleNumber: number;
  vehicleType: number;
  capacityQuantity: number;
  driverName: string;
  transporter: string;
  challanDetails: any;
  RouteDetailForm: FormGroup;
  requestHeaderForm: FormGroup;
  loadDetailsForm: FormGroup;
  remark: string;
  weightMode: string = 'auto';
  submited: boolean = false;
  compOneSeal: boolean = true;
  compTwoSeal: boolean = true;
  compThreeSeal: boolean = true;
  backSeal: boolean = true;
  isGrossWeightCorrect: boolean = true;
  challanNo: string = '';
  weightBowlData;
  requestListData: any;
  shippingHeadersList: any;
  shippingHeadersListUniq = []
  manualMode: any = false;
  disableSubmit: boolean = true;
  bowlInterval;
  userData;
  constructor(
    private weighingBridgeService: WeighingBridgeService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private milkCollectionService: MilkCollectionService,
    private spinnerService: Ng4LoadingSpinnerService,
    private sharedService: SharedService,
    private router: Router,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('data'));
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.challanNo = params['id'];
        //console.log(this.challanNo);
      }
    })
    this.RouteDetailForm = this.fb.group({
      routeNumber: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      vehicleType: ['', Validators.required],
      capacityQuantity: ['', Validators.required],
      routeType: ['', Validators.required],
    });
    this.requestHeaderForm = this.fb.group({
      scheduleDate: ['', Validators.required],
      routeShift: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.loadDetailsForm = this.fb.group({
      tarWeight: '',
      grossWeight: '',
      tarWeightDate : '',
      grossWeightDate : '',
      // tarWeightDate: this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss'),
      // grossWeightDate: this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss'),
      netWeight: ['', Validators.required],
      leftOrRight: 'right',
    });
    this.RouteDetailForm.patchValue({
      registered: 'register'
    });


    this.RouteDetailForm.controls['routeNumber'].disable();
    this.RouteDetailForm.controls['vehicleNumber'].disable();
    this.RouteDetailForm.controls['vehicleType'].disable();
    this.RouteDetailForm.controls['capacityQuantity'].disable();
    this.RouteDetailForm.controls['routeType'].disable();

    //this.getMilkTransferByChallanNo();
    this.doDisableChallanForm();
    this.doDisableloadDetailsForm();


    this.getRequestList();
    this.getDairyQcList();
    this.getWeightBowlData();

  }

  ngOnDestroy() {
    if (this.bowlInterval) {
      clearInterval(this.bowlInterval);
    }
  }

  get lf() { return this.loadDetailsForm.controls; }
  get f() { return this.RouteDetailForm.controls; }

  getRequestList() {
    let userData = JSON.parse(localStorage.getItem('data'));
    var date = new Date();
    date.setDate(date.getDate() + 1);

    const dateNow: any = this.datePipe.transform(new Date(), 'HH');
    if (dateNow > 4 && dateNow < 16) {
      var shift = 'M';
    } else {
      var shift = 'E';
    }

    //var scheduledDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    var scheduledDate = this.sharedService.getDate();
    var routeStatus = 'Arrived';
    var routeShift = this.sharedService.getShift();
    var endLocation = this.userData.locationName;
    var routeType = 'BMC';
    this.spinnerService.show();
    this.weighingBridgeService.getAllTripsBySchDatertptCode(routeType, scheduledDate, routeStatus, routeShift, endLocation).subscribe(
      res => {
        if (res != null) {
          this.requestListData = res[0];
          //console.log(this.requestListData, 'this.requestListData');
          this.requestHeaderForm.patchValue({
            scheduleDate: this.requestListData.scheduleDate,
            routeShift: this.requestListData.routeShift,
            status: 'Arrived',
          });
          this.RouteDetailForm.patchValue({
            vehicleNumber: this.requestListData.vehicleNumber,
            vehicleType: this.requestListData.vehicleType,
            capacityQuantity: this.requestListData.capacityQuantity,
            routeType: this.requestListData.routeType,
            routeNumber: this.requestListData.routeNumber,
            //registered: 'register'
          });

          this.spinnerService.hide();
        }
      });
  }

  getDairyQcList() {
    //var date = '09-04-2020';
    //this.sharedService.getDate()
    this.milkCollectionService.getDairyQcList(this.challanNo, this.userData.locationID, this.sharedService.getDate()).subscribe(
      (res:any) => {        
        this.shippingHeadersList = res.filter((res)=> {
          return res.receiptStatus !='Cancelled';
        });
        let result;
        this.shippingHeadersList.forEach((element,i) => {
          result = this.shippingHeadersListUniq.find((data)=>data.sealNumber == element.sealNumber);
            if(result==undefined) {
            this.shippingHeadersListUniq.push(element);
            }

            
        });


      
        if(this.shippingHeadersList[0].grossWeight != 0){
        this.loadDetailsForm.patchValue({
          grossWeight: this.shippingHeadersList[0].grossWeight,
          tarWeight : this.shippingHeadersList[0].tarWeight,
          netWeight : this.shippingHeadersList[0].netWeight,
          grossWeightDate : this.shippingHeadersList[0].grossWtTime,
          tarWeightDate : this.shippingHeadersList[0].tarWtTime,

        });
        ////console.log(this.shippingHeadersList, 'this.shippingHeadersList');
      }
      });
  }
  getWeightBowlData() {
    // this.weightBowlData = '10';
    this.bowlInterval = setInterval(() => {
      this.milkCollectionService.getweightBowlData().subscribe(
        res => {
          if(res >= 0) {
         this.weightBowlData = res;
          } else {
			if (res == -1002) {
				this.toastr.error('RMRD', 'Specific Port Not Available/Responding', {
				timeOut: 1000});
			} else if (res == -1003) {
				this.toastr.error('RMRD', 'No Ports Available', {
				timeOut: 4000});
			}
		  }
        }, error => {
          this.weightBowlData = 0;
          if (this.bowlInterval) {
            clearInterval(this.bowlInterval);
           
          }
          if(error.status ==0 || error.status ==404 ) {  
            this.toastr.error('RMRD', 'Weighing service is not running', {
              timeOut: 4000
            });
          
        }
        if(error.status==406) { 
            this.toastr.error('RMRD', 'Weighing scale not connected', {
              timeOut: 4000
            });
        }
        });
      }, 500);
  }
  doDisableChallanForm() {
    this.requestHeaderForm.controls['scheduleDate'].disable();
    this.requestHeaderForm.controls['routeShift'].disable();
    this.requestHeaderForm.controls['status'].disable();
  }
  doDisableloadDetailsForm() {
    this.loadDetailsForm.controls['tarWeight'].disable();
    this.loadDetailsForm.controls['grossWeight'].disable();
    this.loadDetailsForm.controls['tarWeightDate'].disable();
    this.loadDetailsForm.controls['grossWeightDate'].disable();
    this.loadDetailsForm.controls['netWeight'].disable();
  }

  changeWeightMode() {
    if (this.weightMode == 'manual') {
      // this.loadDetailsForm.patchValue({
      //   tarWeight: this.loadDetailsForm.value.tarWeight > 0 ? this.loadDetailsForm.value.tarWeight : 0,
      //   grossWeight: this.loadDetailsForm.value.grossWeight > 0 ? this.loadDetailsForm.value.grossWeight : 0,
      //   netWeight: this.loadDetailsForm.value.netWeight > 0 ? this.loadDetailsForm.value.netWeight : 0,
      // });
      this.loadDetailsForm.controls['tarWeight'].enable();
      this.loadDetailsForm.controls['grossWeight'].enable();
      this.loadDetailsForm.controls['netWeight'].disable();
      this.manualMode = true;
    } else {
      // this.loadDetailsForm.patchValue({
      //   tarWeight: 0,
      //   grossWeight: 0,
      //   netWeight: 0,
      // });
      this.loadDetailsForm.controls['tarWeight'].disable();
      this.loadDetailsForm.controls['grossWeight'].disable();
      this.loadDetailsForm.controls['netWeight'].disable();
      this.manualMode = false;
    }
  }

  openModal(template: any, index, typeofWeight) {
    if (this.weightBowlData > 0) {
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }
    else {
      if (typeofWeight === 'tarWeight') {
        this.getTarWeight();
      }
      else {
        this.getGrossWeight();
      }
    }
  }

  confirm(index, field, typeofWeight): void {
    if (typeofWeight === 'tarWeight') {
      this.getTarWeight();
      this.modalRef.hide();
    }
    else {
      this.getGrossWeight();
      this.modalRef.hide();
    }

    // if (this.formArr.length > 1) {
    //   this.masterIndentService.deleteLineItem(field.value.dp[0].lineItemId).subscribe(
    //     res => {
    //       this.formArr.removeAt(index);
    //     }
    //   )
    // } else {
    //   this.toastr.error('At least One product Manditary', 'Single row', {
    //     timeOut: 1000
    //   });
    // }
  }

  decline(): void {
    this.modalRef.hide();
  }

  getTarWeight() {
    //console.log(this.weightBowlData, 'this.weightBowlData');
    //if (this.weightBowlData > 0) {
    //if (confirm("Are you sure you want to update Tar Weight?")) {
    this.loadDetailsForm.patchValue({
      tarWeight: this.weightBowlData,
      tarWeightDate: this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss')
    });
    this.calculateNetWeight('tarWeight');
    //}
    //}
    // else {
    //   this.loadDetailsForm.patchValue({
    //     tarWeight: this.weightBowlData,
    //     tarWeightDate: this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss')
    //   });
    //   this.calculateNetWeight('tarWeight');
    // }

  }
  getGrossWeight() {
    //if (this.weightBowlData > 0) {
    //if (confirm("Are you sure you want to update Gross Weight?")) {
    this.loadDetailsForm.patchValue({
      grossWeight: this.weightBowlData,
      grossWeightDate: this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss'),
    });
    this.calculateNetWeight('grossWeight');
    //}
    //}
    // else {
    //   this.loadDetailsForm.patchValue({
    //     grossWeight: this.weightBowlData,
    //     grossWeightDate: this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss'),
    //   });
    //   this.calculateNetWeight('grossWeight');
    // }
  }
  calculateNetWeight(typeofWeight) {
    if (typeofWeight === 'tarWeight') {
      this.loadDetailsForm.patchValue({
        tarWeightDate: this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss')
      });
    }
    else if (typeofWeight === 'grossWeight') {
      this.loadDetailsForm.patchValue({
        grossWeightDate: this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss')
      });
    }
    let netWeight = parseInt(this.loadDetailsForm.controls.grossWeight.value) - parseInt(this.loadDetailsForm.controls.tarWeight.value);
    if (this.loadDetailsForm.controls.tarWeight.value > 0 && this.loadDetailsForm.controls.grossWeight.value > 0) {
      if (parseInt(this.loadDetailsForm.controls.tarWeight.value) < parseInt(this.loadDetailsForm.controls.grossWeight.value)) {
        this.loadDetailsForm.patchValue({
          netWeight: netWeight,
        })
        this.isGrossWeightCorrect = true;
      } else {
        this.isGrossWeightCorrect = false;
        this.toastr.error('Tar weight should be less then gross weight', '', {
          timeOut: 2000
        });
        this.loadDetailsForm.patchValue({
          netWeight: 0
        })
      }
    } else {
      this.loadDetailsForm.patchValue({
        netWeight: 0
      })
    }
    if (netWeight != undefined && netWeight > 0) {
      this.disableSubmit = false;
    } else {
      this.disableSubmit = true;
    }
  }
  submit() {
    this.submited = true;
    if (this.isGrossWeightCorrect == false || this.loadDetailsForm.invalid || this.RouteDetailForm.invalid) {
      this.toastr.error('Please provide your inputs on required fields', 'Required', {
        timeOut: 2000
      });
    } else {
      this.shippingHeadersList.forEach((element, i) => {
        element.grossWeight = this.loadDetailsForm.controls.grossWeight.value;
        element.netWeight = this.loadDetailsForm.controls.netWeight.value;
        element.tarWeight = this.loadDetailsForm.controls.tarWeight.value;
        element.grossWtTime = this.loadDetailsForm.controls.grossWeightDate.value;
        element.tarWtTime = this.loadDetailsForm.controls.tarWeightDate.value;
        this.weighingBridgeService.updateShipping(this.shippingHeadersList[i]).subscribe(
          res => {
            if (res) {
              this.toastr.success('Record updated successfully', 'Success', {
                timeOut: 2000
              });
            }
          });
      });
      this.router.navigate(['/dairy-wb/request-list']);
    }
  }
}