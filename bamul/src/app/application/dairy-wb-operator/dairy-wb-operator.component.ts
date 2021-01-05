import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dairy-wb-operator',
  templateUrl: './dairy-wb-operator.component.html',
  styleUrls: ['./dairy-wb-operator.component.css']
})
export class DairyWbOperatorComponent implements OnInit {

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
