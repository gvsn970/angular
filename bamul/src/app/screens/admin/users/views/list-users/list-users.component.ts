import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/service/data.service';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(private userService: UserService, private dataService: DataService, private toastr: ToastrService) { }

  userListItem: any;

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUserList().subscribe((response) => {
      if (response)
        this.userListItem = response;
      ////console.log(this.userListItem, 'userList');
    });
  }

  updateUser(userId) {
    this.dataService.setOption('userId', userId);
  }

  deleteUser(userId) {
    this.dataService.setOption('userId', userId);
    if (confirm("Are you sure you want to delete this user")) {
      this.userService.deleteUser(userId).subscribe((response) => {
        ////console.log(response, 'response');
        if (response === null) {
          this.getUserList();
        }
      });
    }
  }
}
