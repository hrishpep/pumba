import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore'
import { throws } from 'assert';
import { BehaviorSubject } from 'rxjs';
import { QAuthService } from './qauth.service'

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  public signedIn:boolean;
  public vpk_count:BehaviorSubject<any>;

  constructor(private firestore: AngularFirestore, private qAuth:QAuthService) { 

    this.vpk_count = new BehaviorSubject<any>(null);
    
    this.qAuth.isSignedIn().subscribe(signedIn => {
      this.signedIn = signedIn;
    })

    this.firestore.doc('analytics/vpk-count').valueChanges()
    .subscribe(
      val => {
        this.vpk_count.next(val)
      }
    )
  }

  get_vpk_count() {
    return this.vpk_count;
  }
}