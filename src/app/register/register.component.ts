import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public step:any = 1;
  public userDetails:any={};
  public details:any
  buttonDisabled: boolean = false;
  readmore:boolean[] = [];
  registrationForm: any;
  userlist:any;

  constructor(private formBuilder: FormBuilder, private service:DataServiceService, private Router:Router, private toastr : ToastrService){
  }

  ngOnInit(): void {  
    this.registrationForm = this.formBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      address: this.formBuilder.group({ 
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zip: ['',[Validators.required]],
      }),
    });

  }
  

  next(){
    this.step = this.step + 1 ;

  }
  prev(){
    this.step = this.step - 1 ;
  }
  submit(){
    if(this.registrationForm.valid){
      this.userDetails = Object.assign(this.userDetails, this.registrationForm.value);
      this.service.addUser(this.userDetails)
      this.registrationForm.reset();
      this.step = 1;
      this.toastr.success('Redirecting','User Added');
      let obj = this;
      setTimeout(function(){
        obj.Router.navigateByUrl('/users')

      },2000)
    }
    else{
      this.toastr.error('Fill All Details Carefully');
      let obj = this;
      setTimeout(function(){
        obj.step = 1;

      },2000)
    }
  }



}
