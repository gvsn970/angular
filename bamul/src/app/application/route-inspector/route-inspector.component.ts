import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-route-inspector',
  templateUrl: './route-inspector.component.html',
  styleUrls: ['./route-inspector.component.css']
})
export class RouteInspectorComponent implements OnInit {


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
