import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public months = [
    { value : null, name : "Selecciona un mes"},
    { value : '01', name: "01"},
    { value : '02', name: "02"},
    { value : '03', name: "03"},
    { value : '04', name: "04"},
    { value : '05', name: "05"},
    { value : '06', name: "06"},
    { value : '07', name: "07"},
    { value : '08', name: "08"},
    { value : '09', name: "09"},
    { value : '10', name: "10"},
    { value : '11', name: "11"},
    { value : '12', name: "12"}
  ]

  public years = []

  public cardForm = this.fb.group({
    number : [''],
    month  : [''],
    year   : [''],
    cvc    : [''] 
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getYearExpirationDates();
  }

  getYearExpirationDates(){
    let date = new Date()
    let currentYear = date.getFullYear();

    let placeholder = {
      value : null,
      name : "selecciona un año"
    }

    this.years.push(placeholder);

    for(let i = currentYear; i <currentYear+15; i++){
      let year = {
        value : i,
        name : i
      };

      this.years.push(year);

    }

  }

}
