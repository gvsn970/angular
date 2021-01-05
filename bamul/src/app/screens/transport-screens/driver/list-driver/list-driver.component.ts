import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverService } from 'src/app/shared/service/driver.service';
// import { ExportExcelService } from 'src/app/shared/service/export-excel.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-driver',
  templateUrl: './list-driver.component.html',
  styleUrls: ['./list-driver.component.css']
})
export class ListDriverComponent implements OnInit {
  drivers: any;
  p:any = 1;
  pageSize = 10;
  public search: any = '';
  constructor(private DriverService: DriverService,
    private router: Router,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getDriverDetails();
  }
  exportAsXLSX(): void {
    //this.ExportExcel.exportAsExcelFile(this.drivers, 'Driver');
  }
  globalSearch(selection) {
    this.search = selection;
    if(this.search.length>3){
      this.getDriverDetailsBySearch();
    } else if(this.search.length==0){
      this.getDriverDetailsBySearch();
    }
  }
  redirectTo(driver) {
    this.router.navigateByUrl('/transport/driver/update-driver');
    localStorage.setItem('driverList', JSON.stringify(driver));
  }
  redirectToView(driver) {
    this.router.navigateByUrl('/transport/driver/view-driver');
    localStorage.setItem('driverList', JSON.stringify(driver));
  }
  getDriverDetails() {
    this.spinnerService.show();
    this.DriverService.getDriverDetails(this.p,this.pageSize,this.search).subscribe(
      data => {
        this.drivers = data;
      });
      this.spinnerService.hide();
  }
  getDriverDetailsBySearch() {
    this.spinnerService.show();
    this.p=1;
    this.DriverService.getDriverDetails(this.p,this.pageSize,this.search).subscribe(
      data => {
        this.drivers = data;
      });
      this.spinnerService.hide();
  }
  pagechange(value){
    this.p = (value);
    this.getDriverDetails();
  }
}
