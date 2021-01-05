import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common.service';
import { Router } from '@angular/router';
import { RouteService } from 'src/app/shared/service/route.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() onFilter: EventEmitter<any> = new EventEmitter();
  view: any = false;
  constructor(private cs: CommonService, private router: Router, private routeService: RouteService) { }

  resetMenu() {
    this.view = this.cs.getOption();
    if (this.view === true) {
      this.view = false;
    }
    this.cs.setOption('view', this.view);
    this.onFilter.emit(this.view);
    this.cs.filter(this.view);
  }
  ngOnInit() {
    this.view = this.cs.getOption();
  }

  logout() {
    localStorage.clear();
    this.cs.setOption('view', false);
    this.router.navigateByUrl('/login');
  }
  orderDispatch() {
    
    this.routeService.setOptions(true);
    this.router.navigateByUrl('product-dispatch/list-order-dispatch');

  }
}
