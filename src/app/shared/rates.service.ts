import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { tap, catchError } from 'rxjs/operators';

export interface Rates {
  id: number
  cc: string
  rate: number
  txt: string
}
export interface SelectClass {
  idname: string
}

@Injectable({providedIn: 'root'})

export class RatesService {
  public exchangeRates: Rates [] = []

  public selects: SelectClass [] = [
    {idname: 'selectOne'},
    {idname: 'selectTwo'}
  ]

  constructor(private http: HttpClient) { }


  fetchRates(): Observable<Rates[]> {
    return this.http.get<Rates[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .pipe(
      tap(data => {
        let idIndex = 0;
        data.forEach((elem) => {
          if (elem.cc === 'USD' || elem.cc === 'EUR') {
            this.exchangeRates.push({id: ++idIndex, txt: elem.txt, rate: elem.rate, cc: elem.cc});
          }
        });
        this.exchangeRates.push({id: 3, txt: 'Гривні', rate: 1.00, cc: 'UAH'});
      })
    )

  }
}
