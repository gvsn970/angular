import { Component, OnInit } from '@angular/core';
import { WeighingBridgeService } from '../../../shared/service/weighing-bridge.service';
import { FormBuilder, FormGroup, FormArray, Validators, NgForm, FormControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { BsDatepickerConfig, BsModalRef, BsModalService } from 'ngx-bootstrap';
@Component({
  selector: 'app-mnm-weighing-bridge-cc-camp-operator',
  templateUrl: './mnm-weighing-bridge-cc-camp-operator.component.html',
  styleUrls: ['./mnm-weighing-bridge-cc-camp-operator.component.css']
})
export class MnmWeighingBridgeCcCampOperatorComponent implements OnInit {
  modalRef: BsModalRef;
  routeDetail: any;
  vehicleNumber: number;
  vehicleType: number;
  capacityKg: number;
  driverName: string;
  transporter: string;
  challanDetails: any;
  RouteDetailForm: FormGroup;
  challanDetailsForm: FormGroup;
  loadDetailsForm: FormGroup;
  sealNumberDetailsForm: FormGroup;
  remark: string;
  totalWeight: any;
  weightMode: string = 'auto';
  submited: boolean = false;
  compOneSeal: boolean = true;
  compTwoSeal: boolean = true;
  compThreeSeal: boolean = true;
  backSeal: boolean = true;
  isGrossWeightCorrect: boolean = true;
  challanNo: string='';
  tarweight: number=0;
  grossWeight: number=0;
  netWeight: number=0;
  tarWeightDateTime: string;
  grossWeightDateTime: string;
  isGetWeightDisable: boolean = false;
  loadDate: any;
  loadTime: any;
  grossDate: string;
  grossTime: string;
  constructor(
    private weighingBridgeService: WeighingBridgeService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.challanNo = params['id'];
      }
    })
    this.RouteDetailForm = this.fb.group({
      routeNumber: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      vehicleType: ['', Validators.required],
      capacityKg: ['', Validators.required],
      driverName: ['', Validators.required],
      transporter: ['', Validators.required],
      registered: ['', Validators.required]
    });
    this.challanDetailsForm = this.fb.group({
      requestType: ['', Validators.required],
      challanNumber: ['', Validators.required],
      date: ['', Validators.required],
      shift: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.loadDetailsForm = this.fb.group({
      tarWeight: '',
      grossWeight: '',
      tarWeightDate: this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss'),
      grossWeightDate: this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss'),
      netWeight: ['', Validators.required],
      leftOrRight: 'right',
    });
    this.sealNumberDetailsForm = this.fb.group({
      compOne: ['', Validators.required],
      compTwo: ['', Validators.required],
      compThree: '',
      back: ['', Validators.required]
    });
    this.RouteDetailForm.patchValue({
      registered: 'register'
    });
    this.sealNumberDetailsForm.controls['compOne'].disable();
    this.sealNumberDetailsForm.controls['compTwo'].disable();
    this.sealNumberDetailsForm.controls['compThree'].disable();
    this.sealNumberDetailsForm.controls['back'].disable();

    this.RouteDetailForm.controls['routeNumber'].disable();
    this.RouteDetailForm.controls['vehicleNumber'].disable();
    this.RouteDetailForm.controls['vehicleType'].disable();
    this.RouteDetailForm.controls['capacityKg'].disable();
    this.RouteDetailForm.controls['driverName'].disable();
    this.RouteDetailForm.controls['transporter'].disable();
    this.getMilkTransferByChallanNo();
    this.doDisableChallanForm();
    this.doDisableloadDetailsForm();
    this.getTotalWeight();
  }
  get slf() { return this.sealNumberDetailsForm.controls; }
  get lf() { return this.loadDetailsForm.controls; }
  get f() { return this.RouteDetailForm.controls; }
  doDisableChallanForm() {
    this.challanDetailsForm.controls['requestType'].disable();
    this.challanDetailsForm.controls['challanNumber'].disable();
    this.challanDetailsForm.controls['date'].disable();
    this.challanDetailsForm.controls['shift'].disable();
    this.challanDetailsForm.controls['status'].disable();
  }
  doDisableloadDetailsForm() {
    this.loadDetailsForm.controls['tarWeight'].disable();
    this.loadDetailsForm.controls['grossWeight'].disable();
    this.loadDetailsForm.controls['tarWeightDate'].disable();
    this.loadDetailsForm.controls['grossWeightDate'].disable();
    this.loadDetailsForm.controls['netWeight'].disable();
  }
  getMilkTransferByChallanNo() {
    let challanNumber = 405;
    this.weighingBridgeService.getMilkTransferByChallanNo(this.challanNo).subscribe(
      res => {
        this.challanDetails = res;
        if (this.challanDetails != null) {
          this.remark=this.challanDetails.loadedRemarks;
          this.challanDetailsForm.patchValue({
            requestType: this.challanDetails.requestType,
            challanNumber: this.challanDetails.deliveryChallanNo,
            date: this.challanDetails.requestedDate,
            shift: this.challanDetails.shift,
            status: this.challanDetails.status
          });
          this.loadDetailsForm.patchValue({
            tarWeight: this.challanDetails.loadTrarWt,
            grossWeight: this.challanDetails.loadGrossWt,
            netWeight: this.challanDetails.loadNetWt,
          });
          if (this.challanDetails.loadTrarWt == null || this.challanDetails.loadGrossWt == null || this.challanDetails.loadNetWt == null) {
            this.weightMode = 'auto';
            this.changeWeightMode();
          }
          if(this.challanDetails.routeNumber!=null){
            this.getRouteDetailsByRouteNumber(this.challanDetails.routeNumber);
          } else {
            this.RouteDetailForm.patchValue({
              vehicleNumber: this.challanDetails.vehicleNumber,
              vehicleType: this.challanDetails.vehicleType,
              capacityKg: this.challanDetails.capacityInKg,
              driverName: this.challanDetails.driverName,
              transporter: this.challanDetails.transporterName
              //registered: 'register'
            });
          }
          for (let i = 0; i < this.challanDetails.deliveryLItem.length; i++) {
            if (this.challanDetails.deliveryLItem[i].lineNumber == 1) {
              this.sealNumberDetailsForm.patchValue({
                compOne: this.challanDetails.deliveryLItem[i].sealNumber
              });
              this.compOneSeal = (this.challanDetails.deliveryLItem[i].sealApprove == "Y") ? true : false;
            } else if (this.challanDetails.deliveryLItem[i].lineNumber == 2) {
              this.sealNumberDetailsForm.patchValue({
                compTwo: this.challanDetails.deliveryLItem[i].sealNumber
              });
              this.compTwoSeal = (this.challanDetails.deliveryLItem[i].sealApprove == "Y") ? true : false;
            } else if (this.challanDetails.deliveryLItem[i].lineNumber == 3) {
              this.sealNumberDetailsForm.patchValue({
                compThree: this.challanDetails.deliveryLItem[i].sealNumber
              });
              this.compThreeSeal = (this.challanDetails.deliveryLItem[i].sealApprove == "Y") ? true : false;
            } else if (this.challanDetails.deliveryLItem[i].itemId == 0 && this.challanDetails.deliveryLItem[i].itemDescription == null) {
              this.sealNumberDetailsForm.patchValue({
                back: this.challanDetails.deliveryLItem[i].sealNumber
              });
              this.backSeal = (this.challanDetails.deliveryLItem[i].sealApprove == "Y") ? true : false;
            }
          }
        }
      },
    );
  }
  getRouteDetailsByRouteNumber(route: number) {
    this.weighingBridgeService.getRouteDetailsByRouteNumber(route).subscribe(
      res => {
        this.routeDetail = res;
        if (this.routeDetail != null) {
          this.RouteDetailForm.patchValue({
            routeNumber: this.routeDetail.routeNumber,
            vehicleNumber: this.routeDetail.vehicleNumber,
            vehicleType: this.routeDetail.vehicleType,
            capacityKg: this.routeDetail.vehicleCapInKg,
            driverName: this.routeDetail.driverName,
            transporter: this.routeDetail.transporterName
            //registered: 'register'
          });
        }
        // if(this.routeDetail==null&&this.index>6) {
        //   this.toastr.error('Route information not found', 'Record Not Founde', {
        //     timeOut: 2000
        //   });
        // }
      },
    );
  }
  routeRegister(radioValue) {
    // //console.log('radioValue',radioValue)
    if (radioValue === 'register') {
      this.RouteDetailForm.controls['routeNumber'].disable();
      this.RouteDetailForm.controls['vehicleNumber'].disable();
      this.RouteDetailForm.controls['vehicleType'].disable();
      this.RouteDetailForm.controls['capacityKg'].disable();
      this.RouteDetailForm.controls['driverName'].disable();
      this.RouteDetailForm.controls['transporter'].disable();
    } else {
      this.RouteDetailForm.controls['routeNumber'].disable();
      this.RouteDetailForm.controls['vehicleNumber'].enable();
      this.RouteDetailForm.controls['vehicleType'].enable();
      this.RouteDetailForm.controls['capacityKg'].enable();
      this.RouteDetailForm.controls['driverName'].enable();
      this.RouteDetailForm.controls['transporter'].enable();
    }
  }
  getTarWeight(template: any) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  getGrossWeight(template: any) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  decline(): void {
    this.modalRef.hide();
  }
  confirm(index, field, typeofWeight): void {
    this.loadDetailsForm.patchValue({
      grossWeight: this.totalWeight,
      grossWeightDate: this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss')
    });
    this.grossWeightDateTime = this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss');
    this.grossWeight=this.totalWeight;
    this.calculateNetWeight();
    this.modalRef.hide();
  }
  confirmTar(index, field, typeofWeight): void {
    this.loadDetailsForm.patchValue({
      tarWeight: this.totalWeight,
      tarWeightDate: this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss')
    });
    this.tarWeightDateTime=this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss');
    this.loadDate=this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.loadTime=this.datePipe.transform(new Date(), 'hh:mm:ss');
    this.grossDate=this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.grossTime=this.datePipe.transform(new Date(), 'hh:mm:ss');
    this.tarweight=this.totalWeight;
    this.calculateNetWeight();
    this.modalRef.hide();
  }
  calculateNetWeight(){
    this.loadDetailsForm.value.grossWeight= (this.loadDetailsForm.value.grossWeight!=undefined) ? this.loadDetailsForm.value.grossWeight : this.grossWeight;
    this.loadDetailsForm.value.tarWeight = (this.loadDetailsForm.value.tarWeight!=undefined)?this.loadDetailsForm.value.tarWeight: this.tarweight;
    this.tarWeightDateTime=this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss');
    this.grossWeightDateTime = this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss');
    this.loadDate=this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.loadTime=this.datePipe.transform(new Date(), 'hh:mm:ss');
    this.grossDate=this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.grossTime=this.datePipe.transform(new Date(), 'hh:mm:ss');
    let netWeight = parseInt(this.loadDetailsForm.value.grossWeight) - parseInt(this.loadDetailsForm.value.tarWeight);
    // //console.log('netWeight',netWeight)
    if(this.loadDetailsForm.value.tarWeight >0 && this.loadDetailsForm.value.grossWeight>0){
      if(this.loadDetailsForm.value.tarWeight < this.loadDetailsForm.value.grossWeight){
        this.loadDetailsForm.patchValue({
          netWeight : netWeight,
        })
        this.netWeight = netWeight;
        this.isGrossWeightCorrect = true;
      } else {
        this.isGrossWeightCorrect = false;
        this.toastr.error('Tar weight should be less then gross weight', '', {
          timeOut: 2000
        });
        this.loadDetailsForm.patchValue({
          netWeight : 0
        })
        this.netWeight = 0;
      }
    } else {
      this.loadDetailsForm.patchValue({
        netWeight : 0
      })
      this.netWeight = 0;
    }
  }
  submit() {
    this.submited = true;
    if (this.isGrossWeightCorrect==false || this.loadDetailsForm.invalid || this.sealNumberDetailsForm.invalid || this.RouteDetailForm.invalid) {
      this.toastr.error('Please provide your inputs on required fields', 'Required', {
        timeOut: 2000
      });
    } else {
      this.weightMode = 'manual';
      this.changeWeightMode();
      this.routeRegister('unregister');
      //console.log('this.tarWeightDateTime',this.tarWeightDateTime)
      let postData = {
        "deliveryChallanNo": this.challanDetailsForm.value.challanNumber,
        "loadTrarWt": (this.loadDetailsForm.value.tarWeight>0)? parseFloat(this.loadDetailsForm.value.tarWeight):this.tarweight,
        "loadDate": this.loadDate,
        "loadTime": this.loadTime,
        "loadGrossWt": (this.loadDetailsForm.value.grossWeight>0) ? parseFloat(this.loadDetailsForm.value.grossWeight): this.grossWeight,
        "loadGrossdate": this.grossDate,
        "loadGrossTime": this.grossTime,
        "loadNetWt": (this.loadDetailsForm.value.netWeight>0) ? parseFloat(this.loadDetailsForm.value.netWeight) : this.netWeight,
        "wbOprtAproval": this.challanDetails.wbOprtAproval,
        "loadedRemarks": (this.remark)?this.remark:this.challanDetails.loadedRemarks,
        "lastUpdateDate": (this.challanDetails.lastUpdateDate == null) ? this.datePipe.transform(new Date(), 'dd-MM-yyyy') : this.challanDetails.lastUpdateDate,
        "lastUpdateBy": JSON.parse(localStorage.getItem('data')).userId,
        "routeNumber":this.RouteDetailForm.value.routeNumber,
        "vehicleNumber":this.RouteDetailForm.value.vehicleNumber,
        "vehicleType":this.RouteDetailForm.value.vehicleType,
        "capacityInKg": parseFloat(this.RouteDetailForm.value.capacityKg),
        "driverName":this.RouteDetailForm.value.driverName,
        "transporterName":this.RouteDetailForm.value.transporter
      }
      // //console.log('postData',postData)
      this.weighingBridgeService.milkTransUpdateWB(postData).subscribe(
        res => {
          // //console.log('res',res)
          if(res){
            this.toastr.success('Record updated successfully', 'Success', {
              timeOut: 2000
            });
          }
        });
    }
  }
  changeWeightMode() {
    // //console.log('weightMode', this.weightMode)
    if (this.weightMode == 'manual') {
      this.isGetWeightDisable=true;
      // this.loadDetailsForm.patchValue({
      //   tarWeight:this.loadDetailsForm.value.tarWeight > 0 ? this.loadDetailsForm.value.tarWeight: 0,
      //   grossWeight:this.loadDetailsForm.value.grossWeight > 0 ? this.loadDetailsForm.value.grossWeight: 0,
      //   netWeight: this.loadDetailsForm.value.netWeight > 0 ? this.loadDetailsForm.value.netWeight: 0,
      // });
      this.loadDetailsForm.controls['tarWeight'].enable();
      this.loadDetailsForm.controls['grossWeight'].enable();
      this.loadDetailsForm.controls['netWeight'].enable();
    } else {
      this.isGetWeightDisable=false;
      this.loadDetailsForm.controls['tarWeight'].disable();
      this.loadDetailsForm.controls['grossWeight'].disable();
      this.loadDetailsForm.controls['netWeight'].disable();
    }
  }
  getTotalWeight(){
    setInterval(() => {
      this.weighingBridgeService.getweightBowlData().subscribe(
        res => {
         this.totalWeight = res;
        }, error => {
        });
      }, 1500);
  }
}
