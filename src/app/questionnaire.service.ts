import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { propriate_array } from './utils'

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  public search_results:Subject<any[]>;

  constructor(private firestore: AngularFirestore) { 
  }

  save_symptom(symptom_obj){

    let doc:AngularFirestoreDocument = null;

    let doc_id = symptom_obj.doc_id
    if(doc_id) {//this is a symptom being updated 
      doc = this.firestore.doc('symptom/'+doc_id)
    }
    else {
      doc_id = this.firestore.createId();
      doc = this.firestore.doc('symptom/'+doc_id)

    }
    
    let resp = {}
    delete symptom_obj.doc_id
    return {"doc_id": doc_id, "server_response": doc.set(symptom_obj) }
  
    
  }

  get_symptoms(){
    return this.firestore.collection('symptom', ref=> ref.orderBy('name')).valueChanges({ idField: 'doc_id' })
  }

  delete_symptom(doc_id){
    return this.firestore.doc('symptom/'+doc_id).delete()
  }

  search_symptoms(searchText:string) {
    if(searchText === '*')
    return this.firestore.collection('symptom', ref => ref.orderBy("name").orderBy("desc")).valueChanges({ idField: 'doc_id' })
    else 
    return this.firestore.collection('symptom', ref => ref.where('_search_tokens','array-contains-any',searchText.toLowerCase().split(" ")).orderBy("name").orderBy("desc")).valueChanges({ idField: 'doc_id' })
    //return this.firestore.collection('symptom', ref => ref.orderBy("name").startAt(searchText).endAt(searchText + '~')).valueChanges({ idField: 'doc_id' })
  }

}
