import { Component, OnInit } from '@angular/core';
import { QAuthService, QUser } from '../qauth.service';

import { Router } from '@angular/router'


@Component({
  selector: 'app-Signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})
export class SignupPage implements OnInit {

  isSignedIn:Boolean;
  constructor(private qAuth: QAuthService, private _router: Router) {}

  user:QUser;

  ngOnInit() {
    this.qAuth.followAuthState().subscribe(
      status=>
      {
        this.isSignedIn = Boolean(status)
        console.log('status of login changed. User signedIN=' + this.isSignedIn); 
        if(status)
          console.log(status.email)
      }
    )

    this.qAuth.isSignedIn().subscribe(s => {console.log('****here***',s)})
    this.qAuth.user.subscribe(u => {this.user = u; console.log(this.user)})

  }

  loginSucceeded(evt) {
    this._router.navigate(['mytest'])
    console.log('login was successful')
    console.log(evt)

  }

  loginFailed(evt) {
    console.log('login was successful')
    console.log(evt)
  }
  
  logout() {
    this.qAuth.signOut();
  }

}
