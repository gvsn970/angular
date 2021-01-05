import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MilkCollectionService } from 'src/app/shared/service/milk-collection.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/service/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-update-sample',
  templateUrl: './update-sample.component.html',
  styleUrls: ['./update-sample.component.css']
})


export class UpdateSampleComponent implements OnInit {

  constructor(private modalService: BsModalService, private MilkCollectionServices: MilkCollectionService , private router: Router , 
    private spinnerService: Ng4LoadingSpinnerService , private MilkCollectionService: MilkCollectionService , private toastr: ToastrService , private SharedService: SharedService , private spinner: NgxSpinnerService) { 
    }

    modalRef: BsModalRef;
    message: string;
    shippingHeadersList;
    sampleObject;
    userRole;
    tempList;
    previousValues;
    retestClr=null;
    retestFat=null;
    retestSnf=null;
    UserData;
    filterDate = new Date();
    filterShift = this.SharedService.getShift();
    filterRoute = null;
    filteredShippingheaderList;
    receiptCode = "RMRD DOC 1";

  ngOnInit() {
    this.receiptCode = "RMRD DOC 1";
    this.UserData = JSON.parse(localStorage.getItem('data'));
    this.userRole = JSON.parse(localStorage.getItem('data')).role;
    //console.log(this.userRole);
    this.spinner.show();
    this.MilkCollectionServices.RetrieveallshippingHeaders(this.UserData.locationID , this.SharedService.getDate()).subscribe(
      res => {
        this.tempList = res;
        this.tempList.forEach((element,i) => {
          if(element.bmcRefNo == null) {
              this.shippingHeadersList.push(element);
          }

      })
        //console.log(this.shippingHeadersList);
          
        this.spinner.hide();
        this.filterData()
      }, error => {
      });
  }

  openModal(template: any , shippingHeader , k) {
    this.modalRef = this.modalService.show(template, { class: '' });
    this.retestClr=shippingHeader.mshippingLines[k].clrAccepted;
    this.retestFat=shippingHeader.mshippingLines[k].fatAccepted;
    this.retestSnf=shippingHeader.mshippingLines[k].snfAccepted;
    this.previousValues = `CLR-${shippingHeader.mshippingLines[k].clrAccepted}\nFAT-${shippingHeader.mshippingLines[k].fatAccepted}\nSNF-${shippingHeader.mshippingLines[k].snfAccepted}\nORIGINAL VALUES`;
  }


  updateData(shippingHeader , k) {

    if (this.retestClr != 0 && this.retestFat != 0)
    {
      this.retestSnf = (parseInt(this.retestClr)/4)+0.25*parseInt(this.retestFat)+0.35;
    } else {
       this.retestSnf = null;
    }
  }

  sendTestValues (shippingHeader , k) {
    shippingHeader.mshippingLines[k].itemRevision = parseInt(shippingHeader.mshippingLines[k].itemRevision) + 1;
    shippingHeader.mshippingLines[k].comments = `${this.previousValues}\n${shippingHeader.mshippingLines[k].comments}`;
    shippingHeader.mshippingLines[k].clrAccepted = this.retestClr.toFixed(2);
    shippingHeader.mshippingLines[k].fatAccepted = this.retestFat.toFixed(1);
    shippingHeader.mshippingLines[k].snfAccepted = this.retestSnf.toFixed(2);
    shippingHeader.mshippingLines[k].clr = this.retestClr.toFixed(2);
    shippingHeader.mshippingLines[k].fat = this.retestFat.toFixed(1);
    shippingHeader.mshippingLines[k].snf = this.retestSnf.toFixed(2);
    shippingHeader.receiptStatus = "In progress"
    shippingHeader.mshippingLines[k].lineStatusCode = "Updated";
    shippingHeader.mshippingLines[k].approvalStatus = "Awaiting For Approval";
    shippingHeader.mshippingLines[k].noticeUnitPrice = null;
    //console.log(shippingHeader);
    this.modalService.hide(1);
    this.MilkCollectionService.updateMilkCollection(shippingHeader).subscribe(
      res => {
        this.previousValues = null;
        this.retestClr=null;
        this.retestFat=null;
        this.retestSnf=null;
        this.toastr.success('Action', 'Re-Test Details Updated', {
          timeOut: 2000
        });
      }, error => {
      });
  }
  cancel () {
    this.retestClr=null;
    this.retestFat=null;
    this.retestSnf=null;
    this.modalService.hide(1);
  }

  filterData() {
    this.filteredShippingheaderList = [];
    //console.log(this.filterDate, this.filterShift , this.filterRoute);
    let today:any = this.filterDate;
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1; //January is 0!
    const yyyy = today.getFullYear();
    if (dd < 10) {
    dd = '0' + dd;
  }
    if (mm < 10) {
    mm = '0' + mm;
  }
    today = dd + '-' + mm + '-' + yyyy;
if(this.filterRoute == null || this.filterRoute =='') {
    this.filteredShippingheaderList = this.shippingHeadersList.filter((v, i)=> {
      return (v["receiptSourceCode"] == this.receiptCode  && v['shift'] == this.filterShift);
    })
    //console.log(this.filteredShippingheaderList);
  }
  else {
    this.filteredShippingheaderList = this.shippingHeadersList.filter((v, i)=> {
      return (v["receiptSourceCode"] == this.receiptCode  && v['shift'] == this.filterShift && v["routeNo"]== this.filterRoute);
    })
  }   
  }
  onValueChange(value){
    if(value) {
    this.shippingHeadersList = [];
    let today:any = value;
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1; //January is 0!
    const yyyy = today.getFullYear();
    if (dd < 10) {
    dd = '0' + dd;
  }
    if (mm < 10) {
    mm = '0' + mm;
  }
    today = dd + '-' + mm + '-' + yyyy;

    this.MilkCollectionServices.RetrieveallshippingHeaders(this.UserData.locationID ,today).subscribe(
      res => {
        this.shippingHeadersList = []
          this.tempList = res;
          this.tempList.forEach((element,i) => {
            if(element.bmcRefNo ==null) {
                this.shippingHeadersList.push(element);
            }

        })
          // this.spinner.hide();
          
           //this.filterData()
      }, error => {
      });
    }

  }

  reset() {
this.filterRoute = null;
this.filterShift = this.SharedService.getShift();
this.filterDate = new Date();
this.receiptCode = "RMRD DOC 1";

    this.MilkCollectionServices.RetrieveallshippingHeaders(this.UserData.locationID , this.SharedService.getDate()).subscribe(
      res => {
        this.shippingHeadersList = []
          this.tempList = res;
          this.tempList.forEach((element,i) => {
            if(element.bmcRefNo ==null) {
                this.shippingHeadersList.push(element);
              
            }
        })
        this.filterData();
      }, error => {
      });


}
}
