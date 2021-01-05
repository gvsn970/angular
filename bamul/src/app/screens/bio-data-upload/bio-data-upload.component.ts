import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataUploderService } from '../customer-order-screens/shared/components/services/dataupload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-bio-data-upload',
  templateUrl: './bio-data-upload.component.html',
  styleUrls: ['./bio-data-upload.component.css']
})
export class BioDataUploadComponent implements OnInit {
  formData: any;
  uploadDataFile: FormGroup;
  submitted = false;
  data: any;
  employeeNum: any;
  show: boolean = false;

  constructor(private dataUploderService: DataUploderService, private spinner: NgxSpinnerService , private toastr: ToastrService, private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.uploadDataFile = this.formBuilder.group({
      uploadfile: ['', Validators.required],
    });
    this.employeeNumber();
  }
  
  employeeNumber() {
    this.data = JSON.parse(localStorage.getItem('data'));
    if (this.data.employeeNum != null) {
      this.dataUploderService.employeeNumber(this.data.employeeNum).subscribe(res => {
        this.employeeNum = res;
        if (this.employeeNum == true) {
          this.show = true;
        } else {
          this.show = false;
        }
      })
    }
  }

  get f() { return this.uploadDataFile.controls; }

  upload(files: File[]) {
    const formData = new FormData();
    Array.from(files).forEach(f =>
      formData.append('file', f),
    );
    this.formData = formData;
  }

  reset() {
    this.uploadDataFile.reset();
  }

  initiateTransfer() {
    this.submitted = true;
    if (this.uploadDataFile.invalid) {
      return;
    }
    this.spinner.show();
    this.dataUploderService.uploadempbioexcelsheetdata(this.formData).subscribe(res => {
      this.formData = '';
      this.submitted = false;
      this.spinner.hide();
        this.uploadDataFile.reset();
      this.toastr.success(res.message);
    }, error => {
      this.submitted = false;
          this.spinner.hide();
            this.uploadDataFile.reset();
        this.toastr.error('Failed  Upload Bio Metric Data', 'File Upload ', {
          timeOut: 2000
        });
    })
  }
}
