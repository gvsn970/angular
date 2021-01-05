import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MilkCollectionService } from 'src/app/shared/service/milk-collection.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-list-samples',
  templateUrl: './list-samples.component.html',
  styleUrls: ['./list-samples.component.css']
})
export class ListSamplesComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;
  shippingHeadersList = [];
  tempList;
  sampleObject;
  userRole;
  public search: any = '';
  p = 1;
  approvalArr=[];
  isSelectAll = false;
  UserData;
  filterDate = new Date();
  filterShift = this.SharedService.getShift();
  filterRoute = null;
  filteredShippingheaderList;
  receiptCode = 'RMRD DOC 1';
  constructor(private modalService: BsModalService, private MilkCollectionServices: MilkCollectionService , private router: Router , 
              private spinnerService: Ng4LoadingSpinnerService , private MilkCollectionService: MilkCollectionService , private toastr: ToastrService , private spinner: NgxSpinnerService , private SharedService: SharedService) { }

  ngOnInit() {
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
          // for(let i=0; i<this.shippingHeadersList.length; i++) {
          //   this.MilkCollectionServices.getsupplierInfo(this.shippingHeadersList[i].vendorId).subscribe(
          //     res => {
          //       if(res) {
          //           this.shippingHeadersList[i].vendorName = res["vendorName"];
          //           //console.log(this.shippingHeadersList);
          //       }else{
          //         this.shippingHeadersList[i].vendorName = "";
          //       }
          //     }, error => {
          //     });
          // }
      }, error => {
      });
  }
  globalSearch(selection) {
    this.search = selection;
  }
  // updateData(shipingHeader , k) {
  //   for(let shipLines of shipingHeader.mshippingLines) {
  //     delete shipLines.shipmentLineId;
  //     if (shipLines.clr != 0 && shipLines.fat != 0)
  //     {
  //       shipLines.snf = (parseInt(shipLines.clr)/4)+0.25*parseInt(shipLines.fat)+0.35;
  //       shipLines.lineStatusCode ="Updated";
  //     } else {
  //       shipLines.snf = null;
  //       shipingHeader.mshippingLines.lineStatusCode = "QC-InProgress";
  //     }
  //   }
  //   this.MilkCollectionService.updateMilkCollection(shipingHeader).subscribe(
  //     res => {
  //       this.toastr.success('Updation', 'Updated Sucessfully', {
  //         timeOut: 2000
  //       });

  //     }, error => {
  //     });
  // }
  roundToTwo(num) {    
    let n = Number(num + 'e+2');
    return +(Math.round(n)  + "e-2");
}
  //  roundToTwo(num) {    
  //   return +(Math.round(num + 'e+2')  + 'e-2');
  //  }

  updateData(shipingHeader , k) {
    for (var i = 0; i < shipingHeader.mshippingLines.length; i++) {
      //delete shipingHeader.mshippingLines[i].shipmentLineId;
  }
  shipingHeader.mshippingLines[k].clr = (parseFloat((shipingHeader.mshippingLines[k].clrAccepted)).toFixed(2));
  shipingHeader.mshippingLines[k].fat  =(parseFloat((shipingHeader.mshippingLines[k].fatAccepted)).toFixed(1));
  shipingHeader.mshippingLines[k].clrAccepted = (parseFloat((shipingHeader.mshippingLines[k].clrAccepted)).toFixed(2));
  shipingHeader.mshippingLines[k].fatAccepted  =(parseFloat((shipingHeader.mshippingLines[k].fatAccepted)).toFixed(1));

    if (shipingHeader.mshippingLines[k].clrAccepted != 0 && shipingHeader.mshippingLines[k].fatAccepted != 0)
      {
       
        shipingHeader.mshippingLines[k].snf = this.roundToTwo(((((shipingHeader.mshippingLines[k].clr)/4)+(0.25*shipingHeader.mshippingLines[k].fat) + 0.35)));
      // tslint:disable-next-line: max-line-length
        shipingHeader.mshippingLines[k].snfAccepted = this.roundToTwo(((((shipingHeader.mshippingLines[k].clr)/4)+(0.25*shipingHeader.mshippingLines[k].fat) + 0.35)));
        if(shipingHeader.mshippingLines[k].snf == 8.28) {
          shipingHeader.mshippingLines[k].snf = 8.30;
          shipingHeader.mshippingLines[k].snfAccepted =8.30;
        }
        if(shipingHeader.mshippingLines[k].snf == 8.38) {
          shipingHeader.mshippingLines[k].snf = 8.40;
          shipingHeader.mshippingLines[k].snfAccepted =8.40;
        }
        if(shipingHeader.mshippingLines[k].snf == 8.48) {
          shipingHeader.mshippingLines[k].snf = 8.50;
          shipingHeader.mshippingLines[k].snfAccepted =8.50;
        }
        shipingHeader.mshippingLines[k].lineStatusCode ='Updated';
        shipingHeader.mshippingLines[k].fatInKg = (shipingHeader.mshippingLines[k].quantityReceived * shipingHeader.mshippingLines[k].fatAccepted)/100;
        shipingHeader.mshippingLines[k].snfInKg = (shipingHeader.mshippingLines[k].quantityReceived * shipingHeader.mshippingLines[k].snfAccepted)/100;
        shipingHeader.mshippingLines[k].fatInKgAccepted = (shipingHeader.mshippingLines[k].quantityReceived * shipingHeader.mshippingLines[k].fatAccepted)/100;
        shipingHeader.mshippingLines[k].snfInKgAccepted = (shipingHeader.mshippingLines[k].quantityReceived * shipingHeader.mshippingLines[k].snfAccepted)/100;
      } else {
        shipingHeader.mshippingLines[k].snfAccepted = 0;
        shipingHeader.mshippingLines[k].lineStatusCode = 'QC-InProgress';
      }
    //console.log(shipingHeader);
    this.MilkCollectionService.updateMilkCollection(shipingHeader).subscribe(
        res => {

          this.toastr.success('Updation', 'Updated Sucessfully', {
            timeOut: 2000
          });
        }, error => {
        });
  }
  openModal(template: any) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  // approveData(shipingHeader , k) {
  //   let linestatuscodeValues =  [];
  //   let approvalValues = [];
  //   let length = shipingHeader.mshippingLines.length;
  //   shipingHeader.mshippingLines[k].lineStatusCode = 'Completed';
  //   shipingHeader.mshippingLines[k].approvalStatus = 'Approved';
  //   shipingHeader.avgClr = 0;
  //   shipingHeader.avgFat= 0;
  //   shipingHeader.avgSnf=0;
  //   for (let i = 0; i < shipingHeader.mshippingLines.length; i++) {
  //   this.MilkCollectionService.getunitPrice(shipingHeader.mshippingLines[i].itemId,shipingHeader.mshippingLines[i].shipmentLineId).subscribe(
  //       res => {
  //         shipingHeader.mshippingLines[i].noticeUnitPrice = res[0]['paymentRate'];
  //       }, error => {
  //       });
  //   shipingHeader.avgClr += +shipingHeader.mshippingLines[i].clr;
  //   shipingHeader.avgFat += +shipingHeader.mshippingLines[i].fat;
  //   shipingHeader.avgSnf += +shipingHeader.mshippingLines[i].snf; 
  //       //delete shipingHeader.mshippingLines[i].shipmentLineId;
  //   if(shipingHeader.mshippingLines[i].lineStatusCode == 'Completed') {
  //         linestatuscodeValues.push('true');
  //       }
  //   if(shipingHeader.mshippingLines[i].approvalStatus == 'Approved') {
  //         approvalValues.push('true');
  //       }
  // }
  //   if (length == linestatuscodeValues.length && length == approvalValues.length ) {
  //   shipingHeader.avgClr = +(shipingHeader.avgClr/(length)).toFixed(2);
  //   shipingHeader.avgFat = +(shipingHeader.avgFat/(length)).toFixed(2);
  //   shipingHeader.avgSnf = +(shipingHeader.avgSnf/(length)).toFixed(2);
  // }
  //   //console.log(shipingHeader);
  //   if (length == linestatuscodeValues.length && length == approvalValues.length ) {
  //   shipingHeader.receiptStatus = 'QC Completed';
  //   }
  //   this.MilkCollectionService.updateMilkCollection(shipingHeader).subscribe(
  //     res => {
  //       this.toastr.success('Action', 'Aprroved', {
  //         timeOut: 2000
  //       });
  //     }, error => {
  //     });
  // }

  approveData(shipingHeader , k) {
    let linestatuscodeValues =  [];
    let approvalValues = [];
    let length = shipingHeader.mshippingLines.length;
    let headerlength = shipingHeader.mshippingLines.length;
    shipingHeader.mshippingLines[k].lineStatusCode = 'Completed';
    shipingHeader.mshippingLines[k].approvalStatus = 'Approved';
    shipingHeader.avgClr = 0;
    shipingHeader.avgFat= 0;
    shipingHeader.avgSnf=0;
    let promises = [];
    var that = this;
    for (let i = 0; i < shipingHeader.mshippingLines.length; i++) {
        let promise = new Promise(function(resolve, reject) {
          that.MilkCollectionService.getunitPrice(shipingHeader.mshippingLines[i].itemId,shipingHeader.mshippingLines[i].shipmentLineId).subscribe(
            res => { 
              if(res['length'] == 0) {
                // shipingHeader.mshippingLines[i].lineStatusCode ='Updated';
                // shipingHeader.mshippingLines[i].approvalStatus = 'Awaiting For Approval';
                // that.toastr.error('Action', `Out of Range Error for sample No ${shipingHeader.mshippingLines[i].sampleNum}`, {
                //   timeOut: 2000
                //   });
                shipingHeader.mshippingLines[i].noticeUnitPrice = 0;
              }
              else {
                shipingHeader.mshippingLines[i].noticeUnitPrice = res[0]['paymentRate'];
                
              }
                shipingHeader.avgClr += +shipingHeader.mshippingLines[i].clrAccepted;
                shipingHeader.avgFat += +shipingHeader.mshippingLines[i].fatAccepted;
                shipingHeader.avgSnf += +shipingHeader.mshippingLines[i].snfAccepted;
                if(shipingHeader.mshippingLines[i].itemDescription=='COB MILK') {
                  headerlength = headerlength-1;
                } 
                if(shipingHeader.mshippingLines[i].lineStatusCode == 'Completed') {
                  linestatuscodeValues.push('true');
                }
                if(shipingHeader.mshippingLines[i].approvalStatus == 'Approved') {
                  approvalValues.push('true');
                }
                resolve(true);

            });
        });
        promises.push(promise)
;
  }

    Promise.all(promises)
    .then((values) => {
       if (length == linestatuscodeValues.length && length == approvalValues.length ) {
            shipingHeader.avgClr = +(shipingHeader.avgClr/(headerlength)).toFixed(2);
            shipingHeader.avgFat = +(shipingHeader.avgFat/(headerlength)).toFixed(1);
            shipingHeader.avgSnf = +(shipingHeader.avgSnf/(headerlength)).toFixed(2);
        }

       //console.log(shipingHeader);
       if (length == linestatuscodeValues.length && length == approvalValues.length ) {
        shipingHeader.receiptStatus = 'QC Completed';
        }
       that.MilkCollectionService.updateMilkCollection(shipingHeader).subscribe(
        res => {
            this.toastr.success('Action', 'Aprroved', {
            timeOut: 2000
            });
        }, error => {
        });
    });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  selectAll(data) {
    //this.approvalArr = []
    if(data.target.checked){
      this.filteredShippingheaderList.forEach((element,i) => {
        element.mshippingLines.forEach((mShippingLineObj,j)=>{
          if(mShippingLineObj.approvalStatus =='Awaiting For Approval' &&  mShippingLineObj.snfAccepted>0){
            //.approvalArr.push(element);
            this.filteredShippingheaderList[i].mshippingLines[j].isChecked = true;
          }
          if(mShippingLineObj.approvalStatus =='Awaiting For Approval' &&  mShippingLineObj.itemDescription=='COB MILK'){
            //.approvalArr.push(element);
            this.filteredShippingheaderList[i].mshippingLines[j].isChecked = true;
          }
        });
      });
    } else {
      this.filteredShippingheaderList.forEach((element,i) => {
        element.mshippingLines.forEach((mShippingLineObj,j)=>{
          if(mShippingLineObj.approvalStatus =='Awaiting For Approval' &&  mShippingLineObj.snfAccepted>0){
            this.filteredShippingheaderList[i].mshippingLines[j].isChecked = false;
          }
          if(mShippingLineObj.approvalStatus =='Awaiting For Approval' &&  mShippingLineObj.itemDescription=='COB MILK'){
            //.approvalArr.push(element);
            this.filteredShippingheaderList[i].mshippingLines[j].isChecked = false;
          }
        })
      });
      //this.approvalArr = [];
    }
  }
  onChangeSelection(data,i,k) {
    this.isSelectAll=false;
  }
  approveAll() {
    var that = this;
    this.approvalArr = []
    this.filteredShippingheaderList.forEach((element,i) => {
      let linestatuscodeValues =  [];
      let promises = [];
      let approvalValues = [];
      let length = 0;
      let headerlength = 0;
      this.filteredShippingheaderList[i].avgClr = 0;
      this.filteredShippingheaderList[i].avgFat = 0;
      this.filteredShippingheaderList[i].avgSnf = 0;
      headerlength = that.filteredShippingheaderList[i].mshippingLines.length;
      element.mshippingLines.forEach((mShippingLineObj,j)=>{
        
        
        that.filteredShippingheaderList[i].avgClr += parseFloat(that.filteredShippingheaderList[i].mshippingLines[j].clrAccepted);
        that.filteredShippingheaderList[i].avgFat += parseFloat(that.filteredShippingheaderList[i].mshippingLines[j].fatAccepted);
        that.filteredShippingheaderList[i].avgSnf += parseFloat(that.filteredShippingheaderList[i].mshippingLines[j].snfAccepted); 
        if(that.filteredShippingheaderList[i].mshippingLines[j].itemDescription=='COB MILK') {
          headerlength = headerlength-1;
        } 
        if(that.filteredShippingheaderList[i].mshippingLines[j].isChecked == undefined) {
          if(that.filteredShippingheaderList[i].mshippingLines[j].lineStatusCode == 'Completed') {
            linestatuscodeValues.push('true');
          }
          if(that.filteredShippingheaderList[i].mshippingLines[j].approvalStatus == 'Approved') {
            approvalValues.push('true');
          }
        }
        if (that.filteredShippingheaderList[i].mshippingLines[j].isChecked == true){
          let promise = new Promise(function(resolve, reject) {
          that.approvalArr.push('true');
          length = that.filteredShippingheaderList[i].mshippingLines.length;
          that.filteredShippingheaderList[i].mshippingLines[j].lineStatusCode = 'Completed';
          that.filteredShippingheaderList[i].mshippingLines[j].approvalStatus = 'Approved';

          that.MilkCollectionService.getunitPrice(that.filteredShippingheaderList[i].mshippingLines[j].itemId,that.filteredShippingheaderList[i].mshippingLines[j].shipmentLineId).subscribe(
            res => { 
              if(res['length'] == 0) {
                that.filteredShippingheaderList[i].mshippingLines[j].noticeUnitPrice = 0;
                // that.filteredShippingheaderList[i].mshippingLines[j].lineStatusCode ='Updated';
                // that.filteredShippingheaderList[i].mshippingLines[j].approvalStatus = 'Awaiting For Approval';
                // that.toastr.error('Action', `Out of Range Error for sample No ${that.filteredShippingheaderList[i].mshippingLines[j].sampleNum}`, {
                //   timeOut: 2000
                //   });
              }
              else {
                that.filteredShippingheaderList[i].mshippingLines[j].noticeUnitPrice = res[0]['paymentRate'];  
              }
              if(that.filteredShippingheaderList[i].mshippingLines[j].lineStatusCode == 'Completed') {
                linestatuscodeValues.push('true');
              }
              if(that.filteredShippingheaderList[i].mshippingLines[j].approvalStatus == 'Approved') {
                approvalValues.push('true');
              }
              delete that.filteredShippingheaderList[i].mshippingLines[j].isChecked;
              resolve(true);
            });
          });
          promises.push(promise)
        }
      });

      Promise.all(promises)
      .then((values) => {
      if (length == linestatuscodeValues.length && length == approvalValues.length ) {
        that.filteredShippingheaderList[i].avgClr = +(that.filteredShippingheaderList[i].avgClr/(headerlength)).toFixed(2);
        that.filteredShippingheaderList[i].avgFat = +(that.filteredShippingheaderList[i].avgFat/(headerlength)).toFixed(1);
        that.filteredShippingheaderList[i].avgSnf = +(that.filteredShippingheaderList[i].avgSnf/(headerlength)).toFixed(2)
      }
      if (length == linestatuscodeValues.length && length == approvalValues.length ) {
        that.filteredShippingheaderList[i].receiptStatus = 'QC Completed';
      }
      //console.log(that.filteredShippingheaderList[i]);
      that.MilkCollectionService.updateMilkCollection(that.filteredShippingheaderList[i]).subscribe(
              res => {
                this.toastr.success('Action', 'Aprroved', {
                  timeOut: 2000
                });
              }, error => {
              });
            });
    });
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
      return (v['receiptSourceCode'] == this.receiptCode  && v['shift'] == this.filterShift);
    })
    //console.log(this.filteredShippingheaderList);
  }
  else {
    this.filteredShippingheaderList = this.shippingHeadersList.filter((v, i)=> {
      return (v['receiptSourceCode'] == this.receiptCode  && v['shift'] == this.filterShift && v['routeNo']== this.filterRoute);
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
this.receiptCode = 'RMRD DOC 1';

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
