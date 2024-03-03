import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements  OnInit,OnDestroy {
  userLoginOn: boolean = false;
  constructor(private loginService: LoginService) {

  }

  ngOnInit():void{
    this.loginService.currentUserLoginOn.subscribe(
      {
        next : (userLoginOn:boolean)=>{
          this.userLoginOn=userLoginOn
        },
      }
    );
  }

  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }

}
