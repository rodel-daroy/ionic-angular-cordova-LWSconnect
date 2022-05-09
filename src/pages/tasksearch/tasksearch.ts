import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskallPage } from '../taskall/taskall'; 

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'

/**
 * Generated class for the TasksearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasksearch',
  templateUrl: 'tasksearch.html',
})
export class TasksearchPage {

  postname:any=""
  statuswp:any=""  
  categorywp:any=""

  SelectArr

  onTask:boolean = false;
  onTaskPower:boolean = false;    
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider) {
    this.security.Categorylist().subscribe(result => {      
      if (result.status === 200) {  
        this.SelectArr=result.final_array;  
        }    
     else {    }
   }, err => {  console.log("err", err);   }
  ); 

  }

  onChangeTask()  { this.onTask=true;    }  

  onChangeTaskPower() { this.onTaskPower=true;   } 


  GotoNext() { 
    this.navCtrl.pop();        
    this.navCtrl.push(TaskallPage,{postname:this.postname,statuswp:this.statuswp,categorywp:this.categorywp,tasksrc:true});     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksearchPage');
  }

}
