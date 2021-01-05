import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-route-sheet',
  templateUrl: './list-route-sheet.component.html',
  styleUrls: ['./list-route-sheet.component.css']
})
export class ListRouteSheetComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  redirectTo(path: any) {
    this.router.navigateByUrl('/' + path);
  }
}
