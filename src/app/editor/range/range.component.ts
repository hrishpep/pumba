import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
})
export class RangeComponent implements OnInit {

  @Input() value:any;

  constructor() { }

  ngOnInit() {
  }

}
