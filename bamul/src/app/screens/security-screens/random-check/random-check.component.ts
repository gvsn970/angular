import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouteService } from 'src/app/shared/service/route.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-random-check',
  templateUrl: './random-check.component.html',
  styleUrls: ['./random-check.component.css']
})
export class RandomCheckComponent implements OnInit {
  dateValue: any;
  theCheckbox = true;
  shiftDispatch: string;
  listOfRandomCheck: any = [];
 
  submitted: boolean = false;
  show: boolean = false;
  listArray: any = [];
  randomCheckDate: any;
  randomCheckShift: any;
  routeNo: any;
  randomCheckReq: string;
  noOfRecords: any = [];
  listArrayRamdomCheck: any = [];
  public searchText: any = '';
  public search: any = '';
  constructor(
    private datePipe: DatePipe,
    private routeService: RouteService,
    private spinnerService: NgxSpinnerService ,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {
    this.dateValue = datePipe.transform(new Date(), 'dd-MM-yyyy');
  }

  ngOnInit() {
    this.getRandomCheckByDate();
  }

  randomCheck(i, index) {
    if (this.listArray[index].randomCheckReq == "Y") {
      this.listArray[index].randomCheckReq = "N";
    } else {
      this.listArray[index].randomCheckReq = "Y";
    }
  }

  randomCheckUpadte(index) {
    
    if (this.listArrayRamdomCheck[index].randomCheckReq == true) {
      this.listArrayRamdomCheck[index].randomCheckReq = false;
    } else {
      this.listArrayRamdomCheck[index].randomCheckReq = true;
    }
  }

  saveAllRandomCheck() {
    
    if(this.listArray.length!=0){
    this.routeService.saveAllRandomCheck(this.listArray).subscribe(
      data => {
        this.toastr.success('Random Check List updated Sucessfully', '');
        this.listArray = [];
        this.listArrayRamdomCheck=[];
        this.listOfRandomCheck=[];
        this.noOfRecords=[];
        this.getRandomCheckByDate();
      },
      error => {
        this.listArray = [];
        this.listArrayRamdomCheck=[];
        this.listOfRandomCheck=[];
        this.noOfRecords=[];
        this.toastr.error('Something Went Wrong ', 'Random Check ', {
          timeOut: 3000
        });
      }); 
     }
  }

  updateRandomCheck() {
    for (let index = 0; index < this.listArrayRamdomCheck.length; index++) {
      if (this.listArrayRamdomCheck[index].randomCheckReq == true) {
        this.listArrayRamdomCheck[index].randomCheckReq = "Y";
      } else {
        this.listArrayRamdomCheck[index].randomCheckReq = "N";
      }
    }
    this.routeService.updateRandomCheck(this.listArrayRamdomCheck).subscribe(
      data => {
            this.toastr.success('Random Check List updated Sucessfully', '');
        this.getRandomCheckByDate();
        this.listArray = [];
        this.listArrayRamdomCheck=[];
        this.listOfRandomCheck=[];
        this.noOfRecords=[];
      },
      error => {
        this.toastr.error('Something Went Wrong ', 'Random Check ', {
          timeOut: 3000
        });

      })
  }

  getRandomCheckByDate() {
    this.spinnerService.show();
    this.routeService.getRandomCheckByDate(this.dateValue).subscribe(res => { 
      this.noOfRecords.push(res);
      if (this.noOfRecords[0].length == 0) {
        this.getRouteSheetByReportDate()
      } else {
        this.show = true;
        this.noOfRecords[0].forEach(element => {
          this.listArrayRamdomCheck.push({
            'routeNo': element.routeNo, "randomCheckShift": element.randomCheckShift,
            "randomCheckDate": element.randomCheckDate,
            "randomCheckReq": element.randomCheckReq,
            "randomCheckId": element.randomCheckId
          });
        });

        for (let index = 0; index < this.listArrayRamdomCheck.length; index++) {
          if (this.listArrayRamdomCheck[index].randomCheckReq == "Y") {
            this.listArrayRamdomCheck[index].randomCheckReq = true;
          } else {
            this.listArrayRamdomCheck[index].randomCheckReq = false;
          }
        }
      }
      this.spinnerService.hide();
    }, error => {

    })
  }

 globalSearch(selection) {
    this.search = selection;
  }

  getRouteSheetByReportDate() {
    this.spinnerService.show();
    this.routeService.getRouteSheetByReportDate(this.dateValue).subscribe(res => {
      this.listOfRandomCheck.push(res);
      this.show = false;
      this.listOfRandomCheck[0].forEach(element => {
        this.listArray.push({
          'routeNo': element.routeNo, "randomCheckShift": element.shift,
          "randomCheckDate": element.reportDate, "randomCheckReq": "N"
        });
      });
      this.spinnerService.hide();
    }, error => {
    });
  }
}
