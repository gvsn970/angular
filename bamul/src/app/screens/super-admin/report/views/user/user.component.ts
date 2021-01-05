import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  cols: any[];
  public search:any = '';
  department:string='';
  role:string='';
  status:string='Active';
  advanceSearchForm: FormGroup;
  constructor(private userService: UserService,private formBuilder: FormBuilder) { }

  userListItem: any;

  ngOnInit() {
    this.advanceSearchForm = this.formBuilder.group({
      role: "",
      department: "",
      status: ""
    });
    this.userService.getUserList().subscribe((response) => {
      if (response){
        this.userListItem = response;
        // //console.log(this.userListItem, 'userList');
    }
    });
  }

  globalSearch(selection){
    this.search=selection;
  }

  searchResult(){
    //console.log('this.advanceSearchForm.value',this.advanceSearchForm.value)
    if(this.advanceSearchForm.value.role!=""){
      this.role=this.advanceSearchForm.value.role;
    }
    if(this.advanceSearchForm.value.department!=""){
      this.department=this.advanceSearchForm.value.department;
    }
    if(this.advanceSearchForm.value.status!=""){
      this.status=this.advanceSearchForm.value.status;
    }
  }
  
  filterClear(){
    this.advanceSearchForm.patchValue({
      department:'',
      role:'',
      status:''
    });
    this.role="";
    this.department="";
    this.status="";
  }
}
