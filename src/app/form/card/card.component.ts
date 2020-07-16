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

  public cardForm = this.fb.group({
    number : [''],
    month  : [''],
    year   : [''],
    cvc    : [''] 
  })

  constructor(private fb: FormBuilder, private ps: PayService) { }

  ngOnInit(): void {
    this.validateFields();
    let amount = 3000;

    this.cardForm.valueChanges.subscribe(value => {
      if(value.number.length == 16 && value.month.length == 2 && value.year.length == 4 && value.cvc.length == 3){
        
        this.getPlans(value, amount);
      }
    });
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

  setData(){
    this.cardForm.controls['number'].setValue("4000004840000008");
    this.cardForm.controls['month'].setValue("05");
    this.cardForm.controls['year'].setValue("2025");
    this.cardForm.controls['cvc'].setValue("672");
  }

  async getPlans(value : any, amount: number){
    let body = {
      type : "generate",
      data : {
        amount : amount,
        card : value
      }
    }
    let plans : any = await this.ps.getplans(body);
    this.response = plans;
    this.id = plans.Message.id;
    this.plans = plans.Message.plans;
  }

  async confirm(plan){
    let res : any = await this.ps.confirm(plan, this.id);
    console.log(res);
    if(res.Title = "Pago a meses sin intereses concluido satisfactoriamente"){
      this.succeded = true;
    }
  }
}
