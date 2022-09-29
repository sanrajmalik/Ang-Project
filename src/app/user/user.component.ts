import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userlist:any;
  readmore:boolean = false;
  clickedIndex:any;
  constructor(private service:DataServiceService) { }

  ngOnInit(): void {
       this.getUser();
       if(this.userlist =='' || this.userlist == null){
        this.userlist = [];
      }
  }
  getUser(){
    this.userlist = this.service.getUsers(); 
  }
  deleteUser(user:any){
    this.service.deleteUser(user);
    this.getUser();
  }
  readMore(){
    this.readmore = true;
  }

}
