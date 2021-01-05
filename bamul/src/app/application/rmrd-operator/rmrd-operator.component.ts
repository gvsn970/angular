import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rmrd-operator',
  templateUrl: './rmrd-operator.component.html',
  styleUrls: ['./rmrd-operator.component.css']
})
export class RmrdOperatorComponent implements OnInit {

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
