import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddtaskexitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addtaskexit',
  templateUrl: 'addtaskexit.html',
})
export class AddtaskexitPage {

  onTask:boolean = false;  
  onTaskPower:boolean = false;  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
  onChangeTask()  { this.onTask=true;    }
  onChangeTaskPower() { this.onTaskPower=true;   } 
  GotoNext(){
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtaskexitPage');
  }

}
