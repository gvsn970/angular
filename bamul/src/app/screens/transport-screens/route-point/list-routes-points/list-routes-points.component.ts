import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RouteService } from '../../../../shared/service/route.service';

@Component({
  selector: 'app-list-routes-points',
  templateUrl: './list-routes-points.component.html',
  styleUrls: ['./list-routes-points.component.css']
})
export class ListRoutesPointsComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {

  }
}
