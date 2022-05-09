import { Component } from '@angular/core';
import { NavController, ViewController , NavParams} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ParamsTXT
  constructor(public navCtrl: NavController, public viewCtrl : ViewController , public navParam:NavParams) {
    this.ParamsTXT=this.navParam.get("ParamsTXT"); 
    console.log(this.ParamsTXT) 
  }

  ok()  {    
    this.viewCtrl.dismiss(this.ParamsTXT); 
  }

   
}
