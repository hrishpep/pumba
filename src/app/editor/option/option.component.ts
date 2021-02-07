import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent implements OnInit {

  @Input() value:any;
  @Output() optionRemoveRequested:EventEmitter<String> = new EventEmitter<String>()
  @Output() optionChanged:EventEmitter<any> = new EventEmitter<any>()

  //@ViewChild('optionLabel') optionLabel: IonText;

  _editMode = false;
  _input_buffer:any;

  constructor(public alertController: AlertController) { }

  ngOnInit() {
    // if this is a new option then set default to edit mode
    if(Object.keys(this.value).length == 0) {
      this.value.label = ''
      this.value.k = 0;
      this.value.p = 0;
      this.value.v = 0;
      this.edit()
    }

  }

  edit() {
    this._input_buffer = {...this.value} // syntax to clone this.value
    this._editMode = true;
  }

  cancel_edit() {
    this._editMode = false;

    if(this.value.label === '') // if the item is blank then don't just cancel - also delete
      this.optionRemoveRequested.emit(this.value.label)
  }

  save_edit() {

    try{ 
    this._input_buffer.k = parseInt(this._input_buffer.k);
    this._input_buffer.p = parseInt(this._input_buffer.p);
    this._input_buffer.v = parseInt(this._input_buffer.v);
    }
    catch(error) {
      console.log(error)
      this.show_courtesy_message('K P V must be numberic and should total to 9')
      return; 
    }

    if(this._input_buffer.label === '') {
      this.show_courtesy_message('please enter a label')
      return;
    }
    if(this._input_buffer.k + this._input_buffer.p + this._input_buffer.v !== 9) {
      this.show_courtesy_message('K + P + V should equal 9')   
      return;
    }

    this._editMode = false;
    this.value = {...this._input_buffer};
    this.optionChanged.emit(this.value)
  }

  delete() {
    console.log('delete pressed')
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Option?',
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
            this.optionRemoveRequested.emit(this.value.label)
          }
        }
      ]
    });

    await alert.present();
  }

  async show_courtesy_message(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention!',
      message: msg,
      buttons: [
      {
          text: 'Okay',
          handler: () => {
            console.debug('courtsey message shown - do nothing else')
            //do nothing
          }
        }
      ]
    });

    await alert.present();
  }

}
