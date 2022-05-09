import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'    

/**
 * Generated class for the WlchourpopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wlchourpop',
  templateUrl: 'wlchourpop.html',
})
export class WlchourpopPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController,public loadingCtrl: LoadingController, public toastCtrl:ToastController, public security :SecurityProvider, public http:Http) {


  }


  

  ok()  {   
    this.viewCtrl.dismiss(); 
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WlchourpopPage');
  }

}
