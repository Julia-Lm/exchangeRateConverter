import { Component } from '@angular/core';
import {RatesService} from '../app/shared/rates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  appTitle = 'Конвертер валют'

  public loading: boolean = true

  constructor(public ratesService: RatesService) { }

  ngOnInit() {
    this.ratesService.fetchRates().subscribe(()=>{
      this.loading = false
    });
  }

}
