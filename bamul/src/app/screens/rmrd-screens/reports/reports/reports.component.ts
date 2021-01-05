import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MilkCollectionService } from 'src/app/shared/service/milk-collection.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SharedService } from 'src/app/shared/service/shared.service';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  date: Date = new Date();
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  route;
  shift ='M';
  routeData=null;
  supplierInfo;
  vehicleNumber=null;
  tripDate=null;
  driverName=null;
  printvalue=false;
  approvalStatus = 'Approved';
  routePoints;
  societyData;
  arrivalTime;
  UserData;
  distinctrouteNumber;


  constructor(
    private datePipe: DatePipe,
    private MilkCollectionService: MilkCollectionService,
    private spinnerService: Ng4LoadingSpinnerService ,
    private SharedService: SharedService 
) { }
  ngOnInit() {
    this.shift = this.SharedService.getShift();
    this.UserData = JSON.parse(localStorage.getItem('data'));
    const datess = this.datePipe.transform(this.date, 'dd/MM/yyyy');
    this.dropdownList = [
      { item_id: 1, item_text: 'S002' },
      { item_id: 2, item_text: 'S023' },
      { item_id: 3, item_text: 'S034' },
      { item_id: 4, item_text: 'S003' },
      { item_id: 5, item_text: 'S005' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'S034' },
      { item_id: 4, item_text: 'S003' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.getTripDetailsByScheduleDateAndShift();
  }
  getTripDetailsByScheduleDateAndShift(){
    this.spinnerService.show();
    const selectedDate = this.datePipe.transform(this.date, 'dd-MM-yyyy');
    this.MilkCollectionService.getTripDetailsByScheduleDateAndShift(selectedDate,this.shift).subscribe(
      res => {
        if (res && res["length"] > 0) {
          this.spinnerService.hide();
          this.routePoints = res;
          this.distinctrouteNumber = [...new Set(this.routePoints.map(i => i.routeNumber))]
          //console.log(this.distinctrouteNumber);
        }
      }, error => {
      });
  }
  onChange(value) {
    console.log(value);
    this.approvalStatus ='Approved'
    this.shift = value;
    this.route = null;
    this.routeData = null;
    this.vehicleNumber =  null;
    this.tripDate = null;
    this.driverName = null;
    this.printvalue=false;
    this.arrivalTime ='';
    this.getTripDetailsByScheduleDateAndShift();
  }
  onChangeDate() {
   // this.date = null;
    this.route = null;
    this.approvalStatus ='Approved'
    //this.shift = null;
    this.routeData = null;
    this.vehicleNumber =  null;
    this.tripDate = null;
    this.driverName = null;
    this.printvalue=false;
    this.arrivalTime ='';
    this.getTripDetailsByScheduleDateAndShift();
  }
  onItemSelect(item: any) {
    //console.log(item);
  }
  onSelectAll(items: any) {
    //console.log(items);
  }
    onPrint(){
    window.print();
}
onChangeStatus(value){
  this.approvalStatus = value;
}
routeonChange(event) {
  this.route = event;
  //console.log(event);
  let tempArr = [];
  tempArr = this.routePoints.filter((obj) => {
    return obj.routeNumber == event;
  });


  // this.MilkCollectionService.getRoutePointData(event, "06-03-2020", this.UserData.locationName, "E").subscribe(
  //   res => {
  //     this.societyData = res;
  //     //console.log(this.societyData);
  //     this.vehicleNumber = this.societyData[0].vehicleNumber;
  //     this.driverName = this.societyData[0].driverName;
  //     this.arrivalTime = this.societyData[0].actualEndTime;
  //   }, error => {
  //   });
  const selectedDate = this.datePipe.transform(this.date, 'dd-MM-yyyy');
    let routeType = "PTC";
      let scheduledDate = "06-03-2020";
      let routeStatus = "Arrived";
      let routeShift = "E"
      let endLocation = this.UserData.locationName;
    this.MilkCollectionService.getAllTripsBySchDatertptCode(routeType, selectedDate, routeStatus, routeShift, endLocation).subscribe(
      res => {
        if (res && res["length"] > 0) {
      this.societyData = res;
      console.log(this.societyData);
      this.vehicleNumber = this.societyData[0].vehicleNumber;
      this.driverName = this.societyData[0].driverName;
      this.arrivalTime = this.societyData[0].actualEndTime;
        }
      }, error => {
      });

}
  reset() {
    this.approvalStatus ='Approved'
    this.date = new Date();
    this.route = null;
    this.shift = this.SharedService.getShift();
    //this.shift = null;
    this.routeData = null;
    this.vehicleNumber =  null;
    this.tripDate = null;
    this.driverName = null;
    this.printvalue=false;
    this.arrivalTime ='';
  }
  generateReport() {
    this.printvalue=true;
    this.spinnerService.show();
    const dates  = this.datePipe.transform(this.date, 'dd-MM-yyyy');
    this.MilkCollectionService.RetrieveMilkCollectionByFreightCarrierCodeDateAndShiftStatus(this.route,dates,this.shift,this.approvalStatus).subscribe(
      res => {
        this.routeData = res;
        this.spinnerService.hide();
        //this.vehicleNumber =  this.routeData[0].vehicleNumber;
        //this.tripDate = this.routeData[0].tripDate;
        //this.driverName = this.routeData[0].driverName;
        //this.spinnerService.hide();
      //   for (var i = 0; i < this.routeData.length; i++) {
      //     // this.routeData[i].socId = 1242;
      //     this.MilkCollectionService.RetrieveallshippingHeaders().subscribe(
      //       resdata => {
      //         this.supplierInfo = resdata;
      //         //console.log(this.supplierInfo);
      //         // this.routeData[i-1]['socName'] = this.supplierInfo.vendorName;
      //       }, error => {
      //       });
      // }

      }, error => {
      });
  }
}
