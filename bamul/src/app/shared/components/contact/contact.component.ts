import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../service/shared.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactEmailForm: FormGroup;
  submitted = false;
  states: any;
  constructor(private formBuilder: FormBuilder,private sharedService: SharedService) { 
    this.states = this.sharedService.getStates();
  }

  ngOnInit() {
    this.contactEmailForm = this.formBuilder.group({
      department: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  sendMessage(){
    this.submitted=true;
    let postData={
      "from": "ankur.arora@yopmail.com",
      "to": "bamultest@yopmail.com",
      "subject": this.contactEmailForm.value.department,
      "text": "test",
      "html": this.contactEmailForm.value.message
    }
    this.sharedService.sendMessage(postData)
      .subscribe(
        data => {
          alert('message send' + data);
        },
        error => {
          alert('error');
        });
  }
  get fval() {
    return this.contactEmailForm.controls;
  }
}
