import { Component, OnInit } from '@angular/core';
import { MilkCollectionService } from 'src/app/shared/service/milk-collection.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { IfStmt } from '@angular/compiler';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-rmrd-list-collection',
  templateUrl: './rmrd-list-collection.component.html',
  styleUrls: ['./rmrd-list-collection.component.css']
})
export class RmrdListCollectionComponent implements OnInit {

  constructor(private MilkCollectionServices: MilkCollectionService , private router: Router , 
              private spinnerService: Ng4LoadingSpinnerService,private toastr: ToastrService , private SharedService: SharedService) { }

    shippingHeadersList = [];
    filteredList = [];
    isSelectAll = false;
    tempList;
    UserData;
    filterDate = new Date();
    filterShift = this.SharedService.getShift();
    filterRoute = null;
    filteredShippingheaderList;
    receiptCode;

  ngOnInit() {
    this.receiptCode ="RMRD DOC 1";
    this.UserData = JSON.parse(localStorage.getItem('data'));
    this.spinnerService.show();
    this.MilkCollectionServices.RetrieveallshippingHeaders(this.UserData.locationID , this.SharedService.getDate()).subscribe(
      res => {
        this.tempList = res;
        this.tempList.forEach((element,i) => {
          if(element.bmcRefNo ==null && element.receiptStatus == 'QC Completed') {
              this.shippingHeadersList.push(element);
          }

      })
        // this.shippingHeadersList.forEach((element,i) => {
        //     let linestatuscodeValues =  [];
        //     let approvalValues = [];
        //     let length = 0;
        //     if(element.receiptStatus == 'QC Completed') {
        //       this.filteredList.push(element);
        //     }
        //     // element.mshippingLines.forEach((mShippingLineObj,j)=>{
        //     //     length = this.shippingHeadersList[i].mshippingLines.length;
        //     //     if(this.shippingHeadersList[i].mshippingLines[j].lineStatusCode == 'Completed') {
        //     //       linestatuscodeValues.push('true');
        //     //     }
        //     //     if(this.shippingHeadersList[i].mshippingLines[j].approvalStatus == 'Approved') {
        //     //       approvalValues.push('true');
        //     //     }
        //     // });
        //     // if (length == linestatuscodeValues.length && length == approvalValues.length ) {
        //     //     this.filteredList.push(this.shippingHeadersList[i])
        //     // }
        //     //console.log(this.filteredList);
        //   });
        this.spinnerService.hide();
        this.filterData()
      }, error => {
      });
  }

  approveData(shipingHeader){
    let linestatuscodeValues =  [];
    let approvalValues = [];
    let length = shipingHeader.mshippingLines.length;


    for (var i = 0; i < shipingHeader.mshippingLines.length; i++) {
      //delete shipingHeader.mshippingLines[i].shipmentLineId;
      if(shipingHeader.mshippingLines[i].lineStatusCode == 'Completed') {
        linestatuscodeValues.push('true');
      }
      if(shipingHeader.mshippingLines[i].approvalStatus == 'Approved') {
        approvalValues.push('true');
      }
  }
    if (length == linestatuscodeValues.length && length == approvalValues.length ) {

    shipingHeader.approvalStatus ='Approved';
    shipingHeader.receiptStatus = 'Completed';
    }
    this.MilkCollectionServices.updateMilkCollection(shipingHeader).subscribe(
      res => {
        this.toastr.success('Action', 'Aprroved', {
          timeOut: 2000
        });
      }, error => {
      });
  }

  selectAll(data) {
    //this.approvalArr = []
    if(data.target.checked){
      this.filteredShippingheaderList.forEach((element,i) => {
        this.filteredShippingheaderList[i].isChecked = true;
      });
    } else {
      this.filteredShippingheaderList.forEach((element,i) => {
        this.filteredShippingheaderList[i].isChecked = false;
      });
    }
  }

  approveAllData(){
    this.filteredShippingheaderList.forEach((element,i) => {
      delete this.filteredShippingheaderList[i].isChecked;
      this.filteredShippingheaderList[i].approvalStatus ='Approved';
      this.filteredShippingheaderList[i].receiptStatus = 'Completed';

      //console.log(this.filteredShippingheaderList[i]);
      this.MilkCollectionServices.updateMilkCollection(this.filteredShippingheaderList[i]).subscribe(
        res => {
          this.toastr.success('Action', 'Aprroved', {
            timeOut: 2000
          });
          this.isSelectAll=false;
        }, error => {
        });
    });

  }
  onChangeSelection(data,i) {
    this.isSelectAll=false;
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
            if(element.bmcRefNo ==null && element.receiptStatus == 'QC Completed') {
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
            if(element.bmcRefNo ==null && element.receiptStatus == 'QC Completed') {
                this.shippingHeadersList.push(element);
              
            }
        })
        this.filterData();
      }, error => {
      });

  }

}
