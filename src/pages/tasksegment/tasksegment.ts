import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import { TaskpopupPage } from '../taskpopup/taskpopup';  

import { TaskapprovePage } from '../taskapprove/taskapprove';   
import { AddtaskPage } from '../addtask/addtask';
import { BuyadditionalPage } from '../buyadditional/buyadditional';   
import { DashboardusrPage } from '../dashboardusr/dashboardusr';     
  

/**
 * Generated class for the TasksegmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasksegment',
  templateUrl: 'tasksegment.html',
})
export class TasksegmentPage {

  createtask

  taskongoing:any;
  taskcomp:any;

  tasksrc:any;
  categorywp
  statuswp
  postname

  onTaskPower:boolean=false; 

  chooseOptions:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider,public modalCtrl:ModalController, public platform: Platform, public viewController:ViewController) {   
  
       // Register for android's system back button
       let backAction =  platform.registerBackButtonAction(() => {
         this.navCtrl.pop();       
         this.navCtrl.setRoot(DashboardusrPage);
        backAction();    
       },1)  

    this.chooseOptions="gotask";   

    this.tasksrc = this.navParams.get("tasksrc")

    this.taskongoing=[];    
    this.taskcomp=[]; 
   
    this.gettasklist("open");   
 if(this.navParams.get("ShowPopup") !=undefined)   {
  let successModal=this.modalCtrl.create(TaskpopupPage);   
  successModal.onDidDismiss(data => {     
  })         
  successModal.present();
 }
       

  }
 
     
  NotifyBtn() {     
    this.navCtrl.setRoot(DashboardusrPage);    
  } 

  GotoNext(){ 
    this.navCtrl.setRoot(AddtaskPage);        
  }

  UpgradeBtn(){
    this.navCtrl.push(BuyadditionalPage);        
  }


  NextNav(PostID,PostTitle,PostStatus) {  
    console.log("PostStatus==",PostStatus);       
      this.navCtrl.push(TaskapprovePage,{PostID:PostID,PostTitle:PostTitle,PostStatus:PostStatus});         
  }
  segmentChanged(event) {   
      console.log(event.value)
      if(event.value=='gotask'){
        this.gettasklist("open"); 
      }
      else{
        this.gettasklist("closed");  
      }
  } 
      
  onChangeTaskPower() { this.onTaskPower=true;   } 
   
  gettasklist(status){

    this.security.taskoncomwp(status).subscribe(result => {         
      if (result.status === 200) { 
        console.log("result.final_array==",result.final_array)
        if(status=='open'){    
          this.taskongoing=result.final_array;   
        }  
        if(status=='closed'){
          this.taskcomp=result.final_array;       
        }     
        }    
     else {    }
   }, err => {  console.log("err", err);   }
  );

  }

  ionViewDidLoad() {
    this.viewController.showBackButton(false)  
    console.log('ionViewDidLoad TasksegmentPage');
  }

}
