import { Component, OnInit } from '@angular/core';

import { from } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TransferindentService } from 'src/app/shared/service/transferindent.service';

@Component({
  selector: 'app-transfer-indent',
  templateUrl: './transfer-indent.component.html',
  styleUrls: ['./transfer-indent.component.css']
})
export class TransferIndentComponent implements OnInit {
  MilkTransferIndent: FormGroup;
  submitted = false;
  allLocation: object;
  currenytDate: any;
  currenytTime: any = new Date();
  currenytTm: any;
  totalFat: any;
  disabled = false;
  disabled1 = false;
  disabled2 = false;
  disabled3 = false;
  disabled4 = false;
  disabled5 = false;

  totalSNF: any;

  totalQTY: any;
  totalQT: any;
  depDate: string;
  constructor(private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private transferindentService: TransferindentService) {


    this.currenytTm = this.datePipe.transform(new Date(), 'HH:mm:ss');
    this.currenytDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
  }

  ngOnInit() {
    this.MilkTransferIndent = this.formBuilder.group({
      sourceLocationId: ['', Validators.required],
      targetLocationId: ['', Validators.required],
      requiredDate: '',
      requiredTime: '',
      requiredQty: ['', Validators.required],
      requiredFAT: ['', Validators.required],
      requiredSNF: ['', Validators.required],
      status: 'NEW',
      requiredRemarks: '',


      vehicleNumber: '',
      driverNames: '',
      transactionRemarks: '',

      sourceTareWt: '',
      loadedQuantity: '',
      loadedFat: '',
      loadedSNF: '',
      sourceGrosseWt: '',
      loadingRemarks: '',
      firstSealNo: '',
      secondSealNo: '',
      thirdSealNo: '',

      depertureDate: '',
      depertureTime: '',
      depertureVerifiedBy: '',
      depertureSecurityRemarks: '',

      arrivalDate: '',
      arrivalTime: '',
      arrivalVerifiedBy: '',
      arrivalSecurityRemarks: '',

      targetRecvdGrossWt: '',
      receivdQuantity: '',
      receivdFat: '',
      receivdSNF: '',
      receivdTareWt: '',
      receivingRemarks: '',
      deliveryChallanRemarks: '',
      recordCreationDate: this.currenytDate,
      recordCreationBy: 89,
      lastUpdateDate: this.currenytDate,
      lastUpdateBy: 899,

    });
    this.MilkTransferIndent.patchValue({
      requiredTime: this.currenytTm,
      requiredDate: this.currenytDate,


      depertureDate: this.currenytDate,
      depertureTime: this.currenytTm,


      arrivalDate: this.currenytDate,
      arrivalTime: this.currenytTm,

    });
    this.getAllLocations();
  }

  // depertureDate(event) {
  //   //console.log(event) // Shows proper selection!
  //
  //
  // this.MilkTransferIndent.patchValue({
  //   depertureDate :this.depDate=this.datePipe.transform(event.target.value, "dd-MM-yyyy")
  // })


  // }
  // depertureTime(event){
  //
  //   this.MilkTransferIndent.patchValue({
  //     depertureTime:this.datePipe.transform(event.target.value, "HH:mm:ss")
  //   })

  // }

  requiredQty(event) {

    //console.log(parseInt(this.totalQT = event.target.value));
    //console.log(parseInt(this.totalQTY = event.target.value));
  }
  requiredFAT(event) {

    //console.log(parseInt(this.totalFat = event.target.value));
  }
  requiredSNF(event) {

    //console.log(parseInt(this.totalSNF = event.target.value));
  }


  get f() { return this.MilkTransferIndent.controls; }
  getAllLocations() {
    this.transferindentService.getAllLocations().subscribe(res => {
      this.allLocation = res;
      //console.log(res);
    }, error => {
      //console.log(error);
    });
  }


  saveTranferIndent() {

    this.submitted = true;

    if (this.MilkTransferIndent.invalid) {
      return;
    }

    this.transferindentService.milkTransferIndent(this.MilkTransferIndent.value).subscribe(res => {

      //console.log(res);
      // this.MilkTransferIndent.disable();

      this.disabled = true;

    },
      error => {
        //console.log(error);
      });

  }
  upadteVechile() {

    this.submitted = true;


    this.transferindentService.updateMilkTrIndent(this.MilkTransferIndent.value).subscribe(res => {

      //console.log(res);
      // this.MilkTransferIndent.disable();

      this.disabled1 = true;
    },
      error => {
        //console.log(error);
      });

  }
  upadteLoading() {

    this.submitted = true;


    this.transferindentService.updateMilkTrIndent(this.MilkTransferIndent.value).subscribe(res => {

      //console.log(res);
      // this.MilkTransferIndent.disable();

      this.disabled2 = true;
    },
      error => {
        //console.log(error);
      });
  }
  upadteSecurityOutInward() {

    this.submitted = true;


    this.transferindentService.updateMilkTrIndent(this.MilkTransferIndent.value).subscribe(res => {

      //console.log(res);
      // this.MilkTransferIndent.disable();

      this.disabled3 = true;
    },
      error => {
        //console.log(error);
      });
  }
  upadteSecurityInInward() {

    this.submitted = true;


    this.transferindentService.updateMilkTrIndent(this.MilkTransferIndent.value).subscribe(res => {

      //console.log(res);
      // this.MilkTransferIndent.disable();

      this.disabled4 = true;
    },
      error => {
        //console.log(error);
      });
  }
  upadteReciving() {

    this.submitted = true;


    this.transferindentService.updateMilkTrIndent(this.MilkTransferIndent.value).subscribe(res => {

      //console.log(res);
      // this.MilkTransferIndent.disable();

      this.disabled5 = true;
    },
      error => {
        //console.log(error);
      });
  }


}
