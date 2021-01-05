import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-route-sheet',
  templateUrl: './view-route-sheet.component.html',
  styleUrls: ['./view-route-sheet.component.css']
})
export class ViewRouteSheetComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  redirectTo(path: any) {
    this.router.navigateByUrl('/' + path);
  }
}
