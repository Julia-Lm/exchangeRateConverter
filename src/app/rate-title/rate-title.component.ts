import { Component, Input, OnInit } from '@angular/core';
import {RatesService} from '../shared/rates.service';

@Component({
  selector: 'app-rate-title',
  templateUrl: './rate-title.component.html',
  styleUrls: ['./rate-title.component.scss']
})
export class RateTitleComponent {

  constructor(public ratesService: RatesService) { }


}
