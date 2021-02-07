import { Component, Input, OnInit } from '@angular/core';
import { QuestionnaireService } from '../questionnaire.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.page.html',
  styleUrls: ['./observations.page.scss'],
})
export class ObservationsPage implements OnInit {

  user_symptoms:any[] = [];
  clicked_suggest:boolean = false;
  active_index:number = null;
  from_search = false;
  original_data = null;
  awaiting_user_data_update:boolean = false;

  constructor(private uS:UserService, private qS:QuestionnaireService) { 
    this.awaiting_user_data_update = true;
  }

  ngOnInit() {
    this.uS.get_user_data().subscribe(data => {
        this.user_symptoms = data; 
        this.awaiting_user_data_update = false
      })
  }

  __deepcopy(source:any) {
    // cannot use {...obj} or Object.assing to clone becasue RHS object is hierarchial 
    // and those methods do not do a full deep copy - and range.value is still the same ref
    return JSON.parse(JSON.stringify(source))
  }

  new_observation(symp) {
    let alreadyPresent = (this.user_symptoms.
                              filter( val => val.doc_id == symp.doc_id).length > 0)
    if(!alreadyPresent) {
      this.user_symptoms.push(symp)
      this.original_data = null; 
      this.active_index = this.user_symptoms.length - 1;
      this.from_search = true; // this is a new item v/s you are just editing an existing item
    }
  }


  edit_sym(i) {
    console.log(this.user_symptoms)
    this.original_data = this.__deepcopy(this.user_symptoms[i]) // clone
    this.active_index = i; // last index
    console.log(this.original_data)
  }

  cancel_sym_edit(i){
      console.log(this.user_symptoms)

      if(this.from_search) {// the item itself must be deleted
        this.user_symptoms.splice(i,1);
        this.from_search = false;
      }
      else 
        this.user_symptoms[i] = this.__deepcopy(this.original_data);

      console.log(this.user_symptoms)
      this.active_index = null;
      
  }


  hide_sym(i) {
    this.uS.set_as_hide(this.user_symptoms[i].doc_id)
    this.awaiting_user_data_update = true;
  }

  
  add_sym_obs() {

    let sym = {}
    let aI = this.active_index

    // if value is same as the original_data - you should still be able to save it as the user 
    // my be trying to say that there is no difference in the intensity of his symptoms BUT 
    // if the user is providing same data on the same day then we must not send update message  
    if(!this.from_search && this.user_symptoms[aI].range.value == this.original_data.range.value 
      && this.user_symptoms[aI].createTime == new Date(Date.now()).toDateString()) {
      this.active_index = null;
      this.from_search= false;
      //this.awaiting_user_data_update = true;  // nothing awaited
      return;
    }



    sym['name'] = this.user_symptoms[aI].name
    sym['sub_type']= this.user_symptoms[aI].sub_type
    sym['desc']= this.user_symptoms[aI].desc
    sym['range'] = {}
    sym['range']['start'] = this.user_symptoms[aI].range.start
    sym['range']['value'] = this.user_symptoms[aI].range.value
    sym['range']['end'] = this.user_symptoms[aI].range.end
    sym['range']['start_label'] = this.user_symptoms[aI].range.start_label
    sym['range']['end_label'] = this.user_symptoms[aI].range.end_label

   
    // if this was searched then the symptom object user_symtoms[aI] has the structure of 
    // of symptoms (master object) -but instead of this was not searched but instead "edit"
    // of an existing symptom observation then it will have the structur of user >> symotom
    sym['sym_doc_id'] = this.from_search ? this.user_symptoms[aI].doc_id 
                                 : this.user_symptoms[aI].sym_doc_id

    this.uS.add_user_sym(sym).then(success=> {
      this.active_index = null;
      this.from_search= false;
      this.awaiting_user_data_update = true;
    })
    
  }

  
}
