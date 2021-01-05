import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-screens',
  templateUrl: './screens.component.html',
  styleUrls: ['./screens.component.css']
})
export class ScreensComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  redirectTo(path: any) {
    this.router.navigateByUrl('/' + path);
  }
}
