import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import {QuestionnaireService} from '../questionnaire.service'

@Component({
  selector: 'app-search-sym',
  templateUrl: './search-sym.component.html',
  styleUrls: ['./search-sym.component.scss'],
})
export class SearchSymComponent implements OnInit {

  searchResults:any[];
  searchResultDividers:string[];

  @Input() search_phrase:string; 
  @Input() debounce:number;
  @Output() selected:EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private qS:QuestionnaireService, private alertController:AlertController) { }

  ngOnInit() {
    if(this.search_phrase)  // in case it was provided as Input by parent component
    this.suggestions(this.search_phrase)
  }

  suggestions(evt) {
    console.log('called me', evt)
    this.qS.search_symptoms(evt).subscribe(_searchResutls => {
      this.searchResults = _searchResutls
      this.searchResultDividers = []

      // just the name
      this.searchResultDividers  = this.searchResults.map( val => val.name)
      //remove duplicates
      this.searchResultDividers = [...new Set(this.searchResultDividers)]
    })  
  }

  select(i) {
    this.presentConfirm(this.searchResults[i])
  }


  async presentConfirm(symptom) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Start tracking this symptom?',
      message: 'You can then explore Ayurvedic options',
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
            this.selected.emit(symptom)
            this.search_phrase= ''
            this.suggestions(this.search_phrase)
          }
        }
      ]
    });
    await alert.present();
  }



}
