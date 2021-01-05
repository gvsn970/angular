import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-invard-vehicles',
  templateUrl: './list-invard-vehicles.component.html',
  styleUrls: ['./list-invard-vehicles.component.css']
})
export class ListInvardVehiclesComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  newIssue() {
    this.route.navigateByUrl('/issue-inward');
    //console.log('you cli');

  }
}
