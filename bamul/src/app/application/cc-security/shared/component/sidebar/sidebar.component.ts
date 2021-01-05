import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/shared/service/route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private  routeService:RouteService,private  router:Router) { }
  ngOnInit() {
  }
  orderShipping(){  
    this.routeService.setOptions(true);
    this.router.navigateByUrl('security-operator/order-dispatch-security');
  }
  randomCheckShipping(){
    this.routeService.setOptions(true);
    this.router.navigateByUrl('security-operator/ramdom-check-shipping');
  }
}
