import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-mytest',
  templateUrl: './mytest.page.html',
  styleUrls: ['./mytest.page.scss'],
})
export class MytestPage implements OnInit {

  relationship:String;
  tests:any[];
  constructor(private uS: UserService, private router:Router) { 
    this.relationship = 'family'
    this.tests = [
      {"question":"Your Face is", "v":"Long and Slender", "p":"Oval or Angular", "k":"Mostly round"},
      {"question":"Your Nose is", "v":"Small or Deviated", "p":"Sharp and pointy", "k":"Broad"},
      {"question":"Your Eyes are", "v":"Small, sometimes dry", "p":"Often Red", "k":"Large and watery"},
      {"question":"Your Lips are", "v":"One biggger than another", "p":"Thin and soft", "k":"Full and moist"},
      {"question":"Your Teeth are", "v":"Uneven in size", "p":"Moderate, slightly yellowish", "k":"Big and white"},
      {"question":"Your Tongue is", "v":"Thin & short", "p":"Long, narrow & pointy", "k":"Wide & short"},
      {"question":"Your Body frame is", "v":"This & tall OR Short & Stocks", "p":"Medium body frame", "k":"Broad body frame"},
      {"question":"Your Skin is", "v":"Dry with prominant veins", "p":"Thin & oily", "k":"Think & oily"},
      {"question":"Your Feet are", "v":"High arch", "p":"Medium arch", "k":"Flat foot"},
      {"question":"Your Body temperature is", "v":"Cold extremeties", "p":"Warm, heat up easily", "k":"Steady temperature"},
      {"question":"Your Hair are", "v":"Quick growing, hard to style", "p":"Oily and straight", "k":"Oily and wavy"},
      {"question":"Your Mind is", "v":"Creative, restless", "p":"Organized, competitive", "k":"Calm and undisturbed"},
      {"question":"Your Speech is", "v":"Fast, omiting words", "p":"Fast, clear", "k":"Sweet, slow and calming"},
      {"question":"Your Walk is", "v":"Fast", "p":"Average", "k":"Slow"}, 
      {"question":"Your Energy levels are", "v":"Variable", "p":"Intense, but get burnt out", "k":"Steady"}, 
      {"question":"Your Decisioning is", "v":"Its hard to decide", "p":"Fast with no regrets", "k":"Slow but stubborn"}, 
      {"question":"You can't stand", "v":"Loud noise", "p":"Bright lights", "k":"Strong smell"},
      {"question":"Your Apetite is", "v":"Variable, enjoy grazing", "p":"Strong, can eat large portions", "k":"Slow and succumb to obligatory eating"},
      {"question":"You are most prone to", "v":"Gas, dry stools", "p":"Heart Burn, Hiccups", "k":"Sleepiness after  meals"},
      {"question":"You respond to Alcohol", "v":"Being, chatty/hyperactive", "p":"Heightened competitiveness", "k":"Mellowing out"},
      {"question":"Your favorite Food Group is", "v":"Crisps/Chips, Dark Chocolate, Cold-Raw Salads", "p":"Cheese, beans, Nuts, Ferments", "k":"Dairy/Cream, Sweets rich food, Bread"},

    ]
  }

  ngOnInit() {
  }

  submit() {
    let a:any = {}
    a.createTime = new Date(Date.now()).toDateString()
    a.answers = this.tests
    this.uS.add_vpk_answers(a).then( success => 
      {this.router.navigate(['/vpkprofile'])}, failure => {console.log(failure)}
    )

  }

}
