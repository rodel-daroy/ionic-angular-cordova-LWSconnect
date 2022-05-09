import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddlogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addlog',
  templateUrl: 'addlog.html',
})
export class AddlogPage {

  onTask:boolean = false;   
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  onChangeTask()  { this.onTask=true;    }
 
  GotoNext(){
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddlogPage');
  }

}
