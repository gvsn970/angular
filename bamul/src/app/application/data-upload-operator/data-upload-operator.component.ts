import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-upload-operator',
  templateUrl: './data-upload-operator.component.html',
  styleUrls: ['./data-upload-operator.component.css']
})
export class DataUploadOperatorComponent implements OnInit {

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
