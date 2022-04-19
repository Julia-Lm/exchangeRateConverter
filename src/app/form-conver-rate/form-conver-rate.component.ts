import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {RatesService} from '../shared/rates.service';
import { FormControl, FormGroup , Validators, NgModel} from '@angular/forms';
import 'rxjs/operators';

@Component({
  selector: 'app-form-conver-rate',
  templateUrl: './form-conver-rate.component.html',
  styleUrls: ['./form-conver-rate.component.scss']
})
export class FormConverRateComponent implements OnInit{

  errorMessage = 'Виберіть валюту'
  testForm = {valid: false, select: false}

  constructor(public ratesService: RatesService) {  }

  form = new FormGroup({
    selectOne: new FormControl('', [Validators.required]),
    selectTwo: new FormControl('', [Validators.required]),
    inputOne: new FormControl('',[Validators.pattern(/^(?=.*[1-9])\d*(?:\.\d{0,2})?$/), Validators.maxLength(10)]),
    inputTwo: new FormControl('',[Validators.pattern(/^(?=.*[1-9])\d*(?:\.\d{0,2})?$/), Validators.maxLength(10)]),
  });


  get inputOne(): any { return this.form.get('inputOne'); }
  get selectOne(): any { return this.form.get('selectOne'); }
  get inputTwo(): any { return this.form.get('inputTwo'); }
  get selectTwo(): any { return this.form.get('selectTwo'); }


  inputHandler(event: any){

    const rates = this.ratesService.exchangeRates;
    event.target.value = event.target.value.replace(/[^0-9\.]/, '');

    if(this.form.value.selectOne !=='' && this.form.value.selectTwo !== ''){
      this.errorMessage = "";
      this.testForm.valid = true;


      let selectOneId = rates.findIndex(elem => +elem.id === +this.form.value.selectOne);
      let selectTwoId = rates.findIndex(elem => +elem.id === +this.form.value.selectTwo);

      switch (event.target.name) {
        case 'inputOne':
            let valueInputOne = (parseFloat(event.target.value) * (rates[selectOneId].rate / rates[selectTwoId].rate)).toFixed(2);
            this.form.patchValue({ inputTwo: valueInputOne !== 'NaN' ? valueInputOne : '' });
          break;
        case 'inputTwo':
            let valueInputTwo = (parseFloat(event.target.value) * (rates[selectTwoId].rate / rates[selectOneId].rate)).toFixed(2);
            this.form.patchValue({ inputOne: valueInputTwo !== 'NaN' ? valueInputTwo : ''});
          break;
        default:
          break;
      }
    }
  }

  selectHandler(event: any){
    const rates = this.ratesService.exchangeRates;

    if(this.form.value.selectOne !=='' && this.form.value.selectTwo !== ''){
      if(this.form.value.inputOne !== null && this.form.value.inputTwo !== null){
        this.errorMessage = "";
        this.testForm.valid = true;

        let selectOneId = rates.findIndex(elem => +elem.id === +this.form.value.selectOne);
        let selectTwoId = rates.findIndex(elem => +elem.id === +this.form.value.selectTwo);

        switch (event.name) {
          case 'selectTwo':
              let valueInputOne = (parseFloat(this.form.value.inputOne) * (rates[selectOneId].rate / rates[selectTwoId].rate)).toFixed(2);
              this.form.patchValue({ inputTwo: valueInputOne !== 'NaN' ? valueInputOne : ''});
            break;
          case 'selectOne':
              let valueInputTwo = (parseFloat(this.form.value.inputTwo) * (rates[selectTwoId].rate / rates[selectOneId].rate)).toFixed(2);
              this.form.patchValue({ inputOne: valueInputTwo !== 'NaN' ? valueInputTwo : ''});
            break;
          default:
            break;
        }
      }

    }else{
      this.form.statusChanges.subscribe((status) => {
        if(this.selectOne.status === 'INVALID' || this.selectTwo.status === 'INVALID'){
          this.errorMessage = 'Виберіть валюту';
        }else {
          this.testForm.select = true;
        }
      });
    }
  }

  cleanInput(){
    this.inputOne.reset();
    this.inputTwo.reset();
    this.testForm.valid = false;
  }

  ngOnInit() {

  }

}
