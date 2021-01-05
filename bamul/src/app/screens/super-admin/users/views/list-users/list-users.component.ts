import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/service/data.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(private userService: UserService, private dataService: DataService, private toastr: ToastrService, private spinnerService: NgxSpinnerService) { }

  userListItem: any;
  public search: any = '';
  p:any = 1;
  pageSize = 10;
  filterValue="";
  ngOnInit() {
    
    this.getUserList();
  }

  getUserList() {
    this.spinnerService.show();
    this.userService.getUsers(this.p,this.pageSize,this.filterValue).subscribe((response) => {
      if (response) {
        this.userListItem = response;
        console.log(this.userListItem);
      }
      this.spinnerService.hide();
    });
  }

  updateUser(userId) {
    this.dataService.setOption('userId', userId);
  }

  deleteUser(userId) {
    this.dataService.setOption('userId', userId);
    if (confirm("Are you sure you want to delete this user")) {
      this.userService.deleteUser(userId).subscribe((response) => {
        if (response === null) {
          this.getUserList();
          this.search = '';
        }
      });
    }
  }

  globalSearch(selection) {
    this.search = selection;
    if (selection.length === 0) {
      this.getUserList();
    }
    if (selection.length > 3) {
      this.p =1;
      this.spinnerService.show();
      this.userService.getUsers(this.p,this.pageSize,selection).subscribe((response) => {
        if (response) {
          this.userListItem = response;
          console.log(this.userListItem);
        }
        this.spinnerService.hide();
      });
    }
  }
  pagechange(value){
    this.p = (value);
    this.getUserList();
  }
}
