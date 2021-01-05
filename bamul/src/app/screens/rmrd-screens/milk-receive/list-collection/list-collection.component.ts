import { Component, OnInit } from '@angular/core';
import { MilkCollectionService } from 'src/app/shared/service/milk-collection.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerService } from "ngx-spinner";
import { SharedService } from 'src/app/shared/service/shared.service';
@Component({
  selector: 'app-list-collection',
  templateUrl: './list-collection.component.html',
  styleUrls: ['./list-collection.component.css']
})
export class ListCollectionComponent implements OnInit {
  public search: any = '';
  p: number = 1;
  tempList;
  UserData;
  shippingHeadersList =[];
  filterDate = new Date();
  filterShift = this.SharedService.getShift();
  filterRoute = null;
  filteredShippingheaderList;
  receiptCode;
  constructor(private MilkCollectionServices: MilkCollectionService , private router: Router , 
              private spinnerService: Ng4LoadingSpinnerService , private spinner: NgxSpinnerService , private SharedService: SharedService , private route: ActivatedRoute) { }
  globalSearch(selection) {
    this.search = selection;
  }
  ngOnInit() {
    this.receiptCode ="RMRD DOC 1";
    this.UserData = JSON.parse(localStorage.getItem('data'));
    this.spinner.show();
    this.MilkCollectionServices.RetrieveallshippingHeaders(this.UserData.locationID , this.SharedService.getDate()).subscribe(
      res => {
        this.shippingHeadersList = []
          this.tempList = res;
          this.tempList.forEach((element,i) => {
            if(element.bmcRefNo ==null) {
                this.shippingHeadersList.push(element);
            }

        })
          this.spinner.hide();
          //console.log(this.shippingHeadersList);
          this.filterData()
      }, error => {
      });
  }

//   onPrint(){
//     window.print();
// }

  redirectTo(path: any, id) {
    this.router.navigate([`../${path}` , id] , { relativeTo: this.route });
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
