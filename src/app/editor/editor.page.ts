import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '../questionnaire.service'
import { ModalController, AlertController } from '@ionic/angular';
import { SymptomComponent } from './symptom/symptom.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

 
   public symptoms:any;
   public symptom_edit_buffer:any;

  constructor(public qServ:QuestionnaireService, 
    public modalController: ModalController, 
    public alertController:AlertController) { }

  
  ngOnInit () {
    this.qServ.get_symptoms().subscribe( symptoms_in_db => this.symptoms = symptoms_in_db)
  }

  _new_symptom() {
    let new_sym:any = {}
    new_sym= {}

    new_sym.name = ''
    new_sym.desc = ''
    new_sym.isVikruti = true
    new_sym.answer_type = 'range'

    new_sym.options = []
    new_sym.range = {}
    new_sym.name = ''
    new_sym.desc = ''

    new_sym.range.start = 0
    new_sym.range.end = 10
    new_sym.range.start_label = 'Never'
    new_sym.range.end_label = 'Always'

    return new_sym
  }

  add_symptom() {
    this.edit_symptom(null)    
  }


  /* original method for editing symptoms 
  edit_symptom(index) {

    let symptom_edit_buffer = null;
    if(index == null)
      symptom_edit_buffer = this._new_symptom();
    else
      symptom_edit_buffer = {...this.symptoms[index]}
    

    this.presentModal(symptom_edit_buffer)

  }
  */

  edit_symptom(index){
    if(index == null)
      this.symptom_edit_buffer = this._new_symptom();
    else
      this.symptom_edit_buffer = {...this.symptoms[index]}
  }

  edit_completed(symptom_update_event){
    this.symptom_edit_buffer = null;
  }

  delete_symptom(index) { 
    this.presentDeleteConfirm(this.symptoms[index].doc_id) 
  }

  async presentModal(symptom_edit_buffer) {
    const modal = await this.modalController.create({
      component: SymptomComponent,
      componentProps:{ 
        "value":symptom_edit_buffer
      }
    });
    return await modal.present();
  }

  async presentDeleteConfirm(doc_id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Symptom?',
      message: 'You cannot undo this action.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('cancelled');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.qServ.delete_symptom(doc_id).then(
              success => console.log('success',success), error => console.log('error'), 
            )
          }
        }
      ]
    });
    await alert.present();
  }
}
