import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {AnalyticsService } from '../analytics.service'

@Component({
  selector: 'app-vpkprofile',
  templateUrl: './vpkprofile.page.html',
  styleUrls: ['./vpkprofile.page.scss'],
})
export class VpkprofilePage implements OnInit {

  value:any;
  vpk_count_analytics: any;
  vpk_count_keys: string[];


  constructor(private uS:UserService, private aS:AnalyticsService) { }

  ngOnInit() {
    this.uS.get_vpk_analysis().subscribe (val=> {
      this.value = val;
    })

    this.aS.get_vpk_count().subscribe(vpk_count => {
      if(vpk_count != null) {
      this.vpk_count_analytics = vpk_count
      this.vpk_count_keys = Object.keys(this.vpk_count_analytics).sort()
      }
    }
    )
  }

}
