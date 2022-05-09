import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';  
import { PaymentPage } from '../payment/payment';

/**
 * Generated class for the UpgradeplanmorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upgradeplanmore',
  templateUrl: 'upgradeplanmore.html',
})
export class UpgradeplanmorePage {
  @ViewChild(Slides) slides: Slides; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log(currentIndex) 
  }
  
  showImage() {
   
  }   

  GotoNext(){
    this.navCtrl.push(PaymentPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpgradeplanmorePage');
  }

}
