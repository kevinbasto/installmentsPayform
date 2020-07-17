import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(private http : HttpClient) { }

  getplans(body){
    return new Promise((resolve) => {
      //let url = "./api/";
      let url = "http://localhost/work/installments/api/";
      this.http.post(url, body).subscribe(res => {
        resolve(res);
      });
    });
  }

  confirm(plan, id){
    return new Promise(resolve => {
      //let url = "./api/";
      let url = "http://localhost/work/installments/api/";
      let body = {
        type: 'confirm',
        data : {
          id : id,
          selected : {
            count : plan.count,
            interval : plan.interval,
            type : plan.type
          }
        }
      }

      this.http.post(url, body).subscribe(res => {
        resolve(res);
      })
    })
    
  }
}