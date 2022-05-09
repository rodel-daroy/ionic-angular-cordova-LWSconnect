import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';   

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'

/**
 * Generated class for the BuyadditionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyadditional',
  templateUrl: 'buyadditional.html',
})
export class BuyadditionalPage {
  ErrMsg="";
  getresult;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider) {
    this.GetData();
  }

  GetData() { 
    this.ErrMsg="";   
    this.security.buyadditional().subscribe(result => {    
      console.log("result==",result);
       if (result.wpstatus === 1) {   
           this.getresult=result.final_array; 
       }
      else {  
        this.ErrMsg=result.message;          
      }
    }, err => {  
      console.log("err", err); 
    }); 
  }      

  GotoNext(title,price,balance,total,ItemPrice)  {            
    this.navCtrl.push(PaymentPage,{ title:title,price:price,balance:balance,total:total,ItemPrice:ItemPrice });    
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyadditionalPage');
  }




}
