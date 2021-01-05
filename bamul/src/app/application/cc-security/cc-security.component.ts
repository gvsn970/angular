import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cc-security',
  templateUrl: './cc-security.component.html',
  styleUrls: ['./cc-security.component.css']
})
export class CcSecurityComponent implements OnInit {

  constructor() { }
  status = false;
  ngOnInit() {
  }
  toogleFullScreen() {
    this.status = !this.status;
    if (this.status) {
      document.body.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}
