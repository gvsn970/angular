import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataUploderService } from '../customer-order-screens/shared/components/services/dataupload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.css']
})
export class DataUploadComponent implements OnInit {
  formData: any;
  uploadDataFile: FormGroup;
  submitted = false;
  fileFormatList=['Other Bank','Axis  Bank']
  file: boolean=false;
  constructor(private dataUploderService: DataUploderService, private toastr: ToastrService,private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.uploadDataFile = this.formBuilder.group({
      fileFormat: ['', Validators.required],
      uploadfile: ['', Validators.required],
      });
  }
   
  fileFormatSelected(){
    if(this.uploadDataFile.value.fileFormat!==''){
      this.file=true;
    }
    this.uploadDataFile.controls.uploadfile.reset();
  }
  get f() { return this.uploadDataFile.controls; }
  upload(files: File[]) {
    ////console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f =>
      formData.append('file', f),
      // formData.append('file', f),
    );
    this.formData = formData
  }

  initiateTransfer() {
    this.submitted = true;
    if (this.uploadDataFile.invalid) {
     return;
   }
   if(this.uploadDataFile.value.fileFormat=='Other Bank'){
    this.dataUploderService.receptCreation(this.formData).subscribe(res => {
            this.formData = '';
    }, error => {
      if (error.error.code =="500") {
        this.toastr.error('Please Check the Uploaded File Format', 'File Upload ', {
          timeOut: 2000
        });
      } else if (error.status = 200)  {
        this.submitted = false;
        this.uploadDataFile.reset();
        this.toastr.success(error.error.text);
      }
        })
   }else{
    this.dataUploderService.axisBankCashReceipt(this.formData).subscribe(res => {
          this.formData = '';
    }, error => {
      if (error.error.code =="500") {
        this.toastr.error('Please Check the Uploaded File Format', 'File Upload ', {
    timeOut: 2000
  });
} else if (error.status = 200)  {
  this.submitted = false;
  this.uploadDataFile.reset();
  this.toastr.success(error.error.text);
}
  })
   }
   
  }
}
