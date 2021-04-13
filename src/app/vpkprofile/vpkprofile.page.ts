import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-vpkprofile',
  templateUrl: './vpkprofile.page.html',
  styleUrls: ['./vpkprofile.page.scss'],
})
export class VpkprofilePage implements OnInit {

  value:any;

  constructor(private uS:UserService) { }

  ngOnInit() {
    this.uS.get_vpk_analysis().subscribe (val=> {
      this.value = val;
    })
    console.log('(((_)))',this.value)
  }

}
