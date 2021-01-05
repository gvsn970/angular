import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/shared/service/vehicle.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.css']
})
export class ListVehiclesComponent implements OnInit {
  vehicles: any = [];
  p = 1;
  pageSize = 10;
  serchByName: string;
  itemsList: any;
  searchText: any;
  public search: any = '';
  constructor(private spinnerService: NgxSpinnerService,
    private vehicleService: VehicleService, private router: Router) { }

  ngOnInit() {
    this.getVechileDetails();
  }
  redirectTo(path: any, vehicle) {
    this.router.navigateByUrl('transport/vehicle/' + path);
    this.vehicleService.vehicleData(vehicle);
    localStorage.setItem('vehicleList', JSON.stringify(vehicle));
  }
  redirectToView(path: any, vehicle) {
    this.router.navigateByUrl('transport/vehicle/' + path);
    this.vehicleService.vehicleData(vehicle);
    localStorage.setItem('vehicleList', JSON.stringify(vehicle));
  }

  getVechileDetails() {
    this.spinnerService.show();
    this.vehicleService.getVechileDetails(this.p,this.pageSize,this.search).subscribe(
      data => {
        this.vehicles = data;
        this.spinnerService.hide();
      },
      error => {
        alert('error');
      });
  }
  getVechileDetailsBySearch() {
    this.spinnerService.show();
    this.p=1;
    this.vehicleService.getVechileDetails(this.p,this.pageSize,this.search).subscribe(
      data => {
        this.vehicles = data;
        this.spinnerService.hide();
      },
      error => {
        alert('error');
      });
  }
  globalSearch(selection) {
    this.search = selection;
    if(this.search.length>3){
      this.getVechileDetailsBySearch();
    } else if(this.search.length==0){
      this.getVechileDetailsBySearch();
    }   
  }
  pagechange(value){
    this.p = (value);
    this.getVechileDetails();
  }
}
