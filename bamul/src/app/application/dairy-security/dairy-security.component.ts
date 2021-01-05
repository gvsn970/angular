import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dairy-security',
  templateUrl: './dairy-security.component.html',
  styleUrls: ['./dairy-security.component.css']
})
export class DairySecurityComponent implements OnInit {

  onstructor() { }
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
