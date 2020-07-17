import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PayService } from '../../services/pay.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public response;
  public plans = [];
  public id;
  public succeded;
  public invalidPrice;
  public error;
  public months;
  public confirmError;

  public cardForm = this.fb.group({
    number : ['', [Validators.required]],
    month  : ['', [Validators.required]],
    year   : ['', [Validators.required]],
    cvc    : ['', [Validators.required]] 
  })

  constructor(private fb: FormBuilder, private ps: PayService) { }

  ngOnInit(): void {

    let amount = this.getAmount();

    if(amount){
      this.cardForm.valueChanges.subscribe(value => {
        this.validateFields();    
        if(value.number.length == 16 && value.month.length == 2 && value.year.length == 4 && value.cvc.length == 3){
          this.getPlans(value, amount);
        }
      });
    }else{
      this.invalidPrice = true;
    }

    
  }

  validateFields(){
    let fields = ['number', 'month', 'year', 'cvc']

    for(let field of fields){
      this.cardForm.controls[field].valueChanges.subscribe(change => {
        let regex = /^[0-9]*$/;
        if(!regex.test(change)){
          this.cardForm.controls[field].setValue(change.substring(0,change.length-1));
        }
      });
    }
  }

  async getPlans(value : any, amount){
    let body = {
      type : "generate",
      data : {
        amount : amount,
        card : value
      }
    }
    console.log("lorem");
    let plans : any = await this.ps.getplans(body);
    
    if(plans.Message.id){
      this.response = plans;
      this.id = plans.Message.id;
      //this.plans = plans.Message.plans;

      if(this.months > 0){
        plans.Message.plans.forEach(element => {
          for(let i = 0; i<this.months.length; i++){
            if(element.count == this.months[i]){
              this.plans.push(element);
            }
          }
        });
      }else{
        plans.Message.plans.forEach(element => {  
          this.plans.push(element);
        });
      }
      


    }else{
      this.error = plans.Message;
    }
    
  }

  async confirm(plan){
    let res : any = await this.ps.confirm(plan, this.id);
    console.log(res);
    console.log(res.Title == "Pago a meses sin intereses concluido satisfactoriamente");
    if(res.Title == "Pago a meses sin intereses concluido satisfactoriamente"){
      this.succeded = true;  
    }else{
      this.succeded = true;  
      this.confirmError = res.Message;
    }
  }

  getAmount(){
    let urlParams = new URLSearchParams(window.location.search);
    let amount = urlParams.get("price");
    let months = urlParams.get("installments");
    if(months){
      this.months = months.split(",");
    }
    return amount;
  }

  /**
   * @function validateFields
   * funcion que verifica que los campos estén bien
   */
  check(field: string){
    if( this.cardForm.get(field).hasError('required') && this.cardForm.get(field).touched ){
      return false;
    }
    return true;
  }

}
