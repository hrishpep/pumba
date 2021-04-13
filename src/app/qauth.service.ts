import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Subject } from 'rxjs';

export class QUser {
  displayName:string;
  email:string;
  uid:string;
  picURL:string;
}



@Injectable({
  providedIn: 'root'
})
export class QAuthService {

  user: Subject<QUser>;
  signedIn:Subject<boolean>;

  constructor(private fAuth:AngularFireAuth) {

    this.signedIn = new Subject<boolean>();
    this.user = new Subject<QUser>();

    //listen to all updates
    this.fAuth.authState
        .subscribe(status => {
          console.log('STATUS CHANGED',status)
          this.signedIn.next((status != null))
          if(status != null) { 
            let _user = new QUser();
            _user.displayName = status.displayName;
            _user.uid= status.uid;
            _user.email = status.email;
            _user.picURL = status.photoURL;
            this.user.next(_user)
          }
          else {
            this.user.next(null)
          }
          console.log('User logged in: ', this.signedIn, '. Details:',this.user)
        }
        
    )
  }

  followAuthState() {
    return this.fAuth.authState
  }

  isSignedIn() {
    return this.signedIn;
  }

  signOut() {
    this.fAuth.signOut()
  }


}
