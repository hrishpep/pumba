import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionnaireService } from '../../questionnaire.service'
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-symptom',
  templateUrl: './symptom.component.html',
  styleUrls: ['./symptom.component.scss'],
})

export class SymptomComponent implements OnInit {

  @Input() value: any;
  

  @Output() symptom_updated:EventEmitter<any> = new EventEmitter<any>();
  @Output() symptom_edit_cancelled:EventEmitter<any> = new EventEmitter<any>();

  isRangeBased:boolean;

  constructor(private qServ:QuestionnaireService, public modalCtrl: ModalController) { 
  }

  ngOnInit() { 
  }

  answer_changed(evt) {
    this.value.answer_type = evt.detail.value
  }

  remove_option(index, option_value) {
    this.value.options.splice(index,1)
  }

  update_option(index, option_value) {
    this.value.options[index] = option_value;
    
  }

  add_new_option() {
    this.value.options.push({})
  }

  save() {
    let resp = this.qServ.save_symptom(this.value)
    resp.server_response.then(success=> {
      if(!this.value.id)
        this.value.id = resp.doc_id;  // if new value was just saved to the DB then set DOC ID

      //this.modalCtrl.dismiss();
      this.symptom_updated.emit(this.value)
    })
 
  }

  cancel() {
    //this.modalCtrl.dismiss();
    this.symptom_edit_cancelled.emit()
  }

}
