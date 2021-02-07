import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable, Subject } from 'rxjs';
import { ObservationsPage } from './observations/observations.page';
import { QAuthService, QUser } from './qauth.service';


export class UserObs {

}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user:QUser;
  public obs:Subject<any>;

  constructor(private firestore: AngularFirestore, private qAuth:QAuthService) { 

    this.obs = new Subject<any>()

    this.qAuth.user.subscribe( u => { 
      console.log(u)
      this.user= u; 
      this.firestore.collection('user/'+ this.user.uid+'/observations', 
              ref => ref.orderBy("sym_doc_id").orderBy("createTime","desc")
          ).valueChanges({ idField: 'doc_id' }).subscribe(
        user_observations => { 

          let last_index_name_desc = null
          for (let o of user_observations) { 

            // mark the first element of each time as _display_flag = true
            if(o['name'] + o['desc'] != last_index_name_desc) {
              //most recent element of it's type (name + desc) -> this is guaranteed by the order by in ///the query
              o['_display_flag'] = true
              last_index_name_desc = o['name'] + o['desc']  
            }
            //convert timestamp to string
            let cDate = o['createTime'].toDate()
            o['createTime'] = cDate.toDateString()
            
          }
          console.log(user_observations)
          this.obs.next(user_observations)
        }, error => {
          console.log('error getting observations',error)
      })
    })
  }

  get_user_data(){
    return this.obs;
  }

  set_as_hide(doc_id) {
    this.firestore.doc('user/'+ this.user.uid+'/observations/'+doc_id).update({hide:true})
  }

  add_user_sym(sym) {
    let doc_id = this.firestore.createId();
    return this.firestore.doc('user/'+ this.user.uid+'/observations/'+doc_id).set(sym);
  }

}
