import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, NgForm } from '@angular/forms';
import { GatePass } from 'src/app/shared/model/gate-pass';
import { GatePassService } from 'src/app/shared/service/gate-pass.service';
import { GatePassHeader } from 'src/app/shared/model/gate-pass-header';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-gatepass',
  templateUrl: './update-gatepass.component.html',
  styleUrls: ['./update-gatepass.component.css']
})
export class UpdateGatepassComponent implements OnInit {

  GatePass: FormGroup;
  gatePassLine: FormArray;
  gatePassLines: FormArray;
  gatePassHeader: GatePassHeader;
  submitted: boolean = false;
  currenytDate: any;
  lineItem: FormArray;
  updatedGatePassList: any;
  GatePassLine: any;
  returnabletrue: any;
  currenytTm: any;





  constructor(
    private formBuilder: FormBuilder,
    private gatePassService: GatePassService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private router: Router,


  ) {
    this.currenytDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.currenytTm = this.datePipe.transform(new Date(), 'HH:mm:ss ');
  }


  ngOnInit() {
    this.GatePass = this.formBuilder.group({
      gatePassId: "",
      vehicleNo: ['', Validators.required],
      refNo: ['', Validators.required],
      issuedDate: "",
      issuedTo: ['', Validators.required],
      address: ['', Validators.required],
      returnedDate: ['', Validators.required],
      remarks: "",
      time: "",
      gatePassLine: this.formBuilder.array([])
    });

    this.GatePass.patchValue({
      issuedDate: this.currenytDate,
      returnedDate: this.currenytDate,
      time: this.currenytTm
    })
    this.updatedGatePass();

  }
  updatedGatePass() {

    this.updatedGatePassList = JSON.parse(localStorage.getItem('gatepassUpdate'));
    this.GatePass.patchValue({

      gatePassId: this.updatedGatePassList.gatePassId,
      vehicleNo: this.updatedGatePassList.vehicleNo,
      refNo: this.updatedGatePassList.refNo,
      issuedDate: this.updatedGatePassList.issuedDate,
      issuedTo: this.updatedGatePassList.issuedTo,
      address: this.updatedGatePassList.address,
      returnedDate: this.updatedGatePassList.returnedDate,
      remarks: this.updatedGatePassList.remarks
    })


    for (let i = 0; i < this.updatedGatePassList.gatePassLine.length; i++) {

      this.addNewRow(this.updatedGatePassList.gatePassLine[i]);
    }
  }




  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }




  initiatForm(data): FormGroup {
    if (data != undefined) {


      if (data.returnable == "true") {
        true
        this.returnabletrue = true;
      } else {
        this.returnabletrue = false;
      }
    }
    return this.formBuilder.group({
      gatePassLineId: [data && data.gatePassLineId ? data.gatePassLineId : ''],
      itemDescription: [data && data.itemDescription ? data.itemDescription : '', Validators.required],
      itemQuantity: [data && data.itemQuantity ? data.itemQuantity : '', Validators.required],
      returnable: [data && this.returnabletrue ? this.returnabletrue : false, Validators.required],
    });
  }

  get formArr() {
    return this.GatePass.get('gatePassLine') as FormArray;

  }
  checkBox(event) {

    if (event.target.value == "") {

    }
  }

  updateGatePass() {


    this.submitted = true;

    if (this.GatePass.invalid) {
      return;
    }

    this.gatePassService.updateGatePass(this.GatePass.value).subscribe(


      data => {
        // 
        // alert(data);
        this.toastr.success('Sucessfully Gate Updated !', 'Gate Pass');
        // //console.log(data);
        this.router.navigateByUrl("/super-admin/security/list-gatepass");
      },
      error => {
        this.toastr.error('Something Went Wrong ', 'Gate  Pass ', {
          timeOut: 3000
        });
      });
  }
  addNewRow(data) {
    this.GatePass.controls.gatePassLine.setValidators([Validators.required]);
    this.formArr.push(this.initiatForm(data));
  }



  deleteRow(index: number) {

    if (this.formArr.length > 1) {

      this.gatePassService.deleteGatePass(this.formArr.value[index].gatePassLineId).subscribe(
        data => {
          this.formArr.removeAt(index);

        });

    } else {
      this.toastr.error('At least One Product is Mandatory', 'Single row', {
        timeOut: 3000
      });
    }

  }



  redirectTo() {
    this.router.navigateByUrl('super-admin/security/list-gatepass');
  }




}







