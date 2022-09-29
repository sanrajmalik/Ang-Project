import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService implements OnInit {
  public userList:any

  constructor() { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
     return this.userList = JSON.parse(sessionStorage.getItem('User')!);
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

  deleteUser(user:any){
    // const search = obj => obj.dev === true;
    var val = user.email;
    let userfind = JSON.parse(sessionStorage.getItem('User')!);
    var index = userfind.findIndex(function(item:any){
      return item.email == val
       }); 
       userfind.splice(index, 1);
       sessionStorage.setItem('User', JSON.stringify(userfind));
       console.log(userfind); 
  }
}
