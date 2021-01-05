import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-assign-vehicle-milk-transfer',
  templateUrl: './list-assign-vehicle-milk-transfer.component.html',
  styleUrls: ['./list-assign-vehicle-milk-transfer.component.css']
})
export class ListAssignVehicleMilkTransferComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  redirectTo(path: any) {
    //console.log(path);

    this.router.navigateByUrl('/' + path);
  }

}
