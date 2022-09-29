import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from './data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  public step:any = 1;
  public userDetails:any={};
  public details:any
  buttonDisabled: boolean = false;
  readmore:boolean[] = [];
  registrationForm: any;
  userlist:any;


  constructor(private formBuilder: FormBuilder, private service:DataServiceService){

  }

  ngOnInit(): void {  
    // this.getDetails()
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
    this.getUsers();
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
      
      this.addUser(this.userDetails)
      this.registrationForm.reset();
      this.step = 1;
      this.getUsers()
    }
    else{
      alert('Please enter all details')
    }
    // this.getDetails();
  }
  addUser(user:any){
    let users = [];
    if(sessionStorage.getItem('User')){
      users = JSON.parse(sessionStorage.getItem('User')!);
      users=[user, ...users];
    }else{
      users = [user];
    }
    sessionStorage.setItem('User', JSON.stringify(users));
  }

 getDetails(){
    this.details  = JSON.parse(sessionStorage.getItem('UserDetails')!);
  }
  getUsers(){
    if(sessionStorage.getItem('User')){
      this.userlist = JSON.parse(sessionStorage.getItem('User')!);
    }
    else{
      this.userlist = "no user"
    }
  }

  readMore(){
    //this.readmore = [true];
  }

  delete(a:any){
    // const search = obj => obj.dev === true;
    var val = a.email;
    
    let userfind = JSON.parse(sessionStorage.getItem('User')!);
    var index = userfind.findIndex(function(item:any){
      return item.email == val
       }); 
       userfind.splice(index, 1);
       sessionStorage.setItem('User', JSON.stringify(userfind));
       console.log(userfind); 
  
       this.getUsers()
  }
}
