import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, NgForm } from '@angular/forms';
import { GatePass } from 'src/app/shared/model/gate-pass';
import { GatePassService } from 'src/app/shared/service/gate-pass.service';
import { GatePassHeader } from 'src/app/shared/model/gate-pass-header';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-gate-pass',
  templateUrl: './create-gate-pass.component.html',
  styleUrls: ['./create-gate-pass.component.css']
})
export class CreateGatePassComponent implements OnInit {
  GatePass: FormGroup;
  gatePassLine: FormArray;
  gatePassLines: FormArray;
  gatePassHeader: GatePassHeader;
  submitted: boolean = false;
  currenytDate: any;
  currenytTime:any;
  todaysDataTime = '';
  lineItem: FormArray;
  today: number;
  currenytTm: any;
  timer:any
  time=new Date();

  
  constructor(
    private formBuilder: FormBuilder,
    private gatePassService: GatePassService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private router: Router
  ) 
  
  {

    this.currenytDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    setInterval(() => {this.today = Date.now()}, 1);  
    
    this.currenytTm = this.datePipe.transform(new Date(), 'HH:mm:ss ');
  }

  
 


  ngOnInit() {
   
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.GatePass = this.formBuilder.group({
      vehicleNo: ['', Validators.required],
      refNo: ['', Validators.required],
      issuedDate: ['', Validators.required],
      issuedTo: ['', Validators.required],
      address: ['', Validators.required],
      returnedDate: ['', Validators.required],
      remarks: "",
      time:"",
      gatePassLine: this.formBuilder.array([])
    });

    this.GatePass.patchValue({
      issuedDate: this.currenytDate,
      returnedDate: this.currenytDate,
      time: this.currenytTm
    })

    this.addNewRow();
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  initiatForm(): FormGroup {
    return this.formBuilder.group({
      itemDescription: ['', Validators.required],
      itemQuantity: ['', Validators.required],
      returnable: false,
    });
  }
  get formArr() {
    return this.GatePass.get('gatePassLine') as FormArray;

  }
  checkBox(event) {
    
    if (event.target.value == "") {

    }
  }
  createGatePass() {
    
    this.submitted = true;

    if (this.GatePass.invalid) {
      return;
    }
    this.gatePassLine = this.GatePass.get('gatePassLine') as FormArray;
    for (let index = 0; index < this.gatePassLine.length; index++) {
      if (this.gatePassLine.value[index].returnable == "") {
        this.formArr.patchValue([
          { returnable: false, }
        ]

        )
      }
     
    }
    this.gatePassService.createGatePass(this.GatePass.value).subscribe(
      data => {
        // 
        // alert(data);
        this.toastr.success('Sucessfully Gate Pass Created !', 'Gate Pass');
        
        this.router.navigateByUrl('super-admin/security/list-gatepass' );
        //console.log(data);
      },
      error => {
        this.toastr.error('Something Went Wrong ', 'Gate  Pass ', {
          timeOut: 3000
        });
      });
  }
  addNewRow() {
    this.GatePass.controls.gatePassLine.setValidators([Validators.required]);
    this.formArr.push(this.initiatForm());
  }

  


  deleteRow(index: number) {
   
    if (this.formArr.length !== 1) {
      this.formArr.removeAt(index);

    } else {
      this.toastr.error('At least One Product is Mandatory', 'Single row', {
        timeOut: 3000
      });
    }

  }


}







