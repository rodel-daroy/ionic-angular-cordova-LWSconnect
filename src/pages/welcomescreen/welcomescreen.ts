import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { WlchourpopPage } from '../wlchourpop/wlchourpop';  

import { AddtaskPage } from '../addtask/addtask';

/**
 * Generated class for the WelcomescreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcomescreen',
  templateUrl: 'welcomescreen.html',    
})
export class WelcomescreenPage {  
  fullname
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController) {
      this.modalCtrl.create(WlchourpopPage).present(); 
      this.fullname=this.navParams.get("fullname");
      localStorage['showusrpop']="yes"; 
  }      

  GotoNext(){
    this.navCtrl.setRoot(AddtaskPage);        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomescreenPage');
  }

}
