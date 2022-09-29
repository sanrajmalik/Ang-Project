import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public innerWidth: any;
  public menu:boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth<=756){
      this.menu = true;
    }
  }

}
