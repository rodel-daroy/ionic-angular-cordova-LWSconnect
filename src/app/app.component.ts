import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as moment from 'moment'; 
import { OneSignal } from '@ionic-native/onesignal';

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { ForgetpassPage } from '../pages/forgetpass/forgetpass';
import { AddlogPage } from '../pages/addlog/addlog';  
import { DashboardPage } from '../pages/dashboard/dashboard';   
import { NotificationPage } from '../pages/notification/notification';   

import { AddtaskPage } from '../pages/addtask/addtask';    
import { AddtasknewPage } from '../pages/addtasknew/addtasknew'; 
import { DashboardusrPage } from '../pages/dashboardusr/dashboardusr';  

import { HourslogPage } from '../pages/hourslog/hourslog';   
import { UpgradeplanPage } from '../pages/upgradeplan/upgradeplan'; 
import { TaskPage } from '../pages/task/task';   
import { TaskallPage } from '../pages/taskall/taskall';    
import { TasksearchPage } from '../pages/tasksearch/tasksearch';   
import { PaymentPage } from '../pages/payment/payment';    
import { ProfilePage } from '../pages/profile/profile';     
import { UpgradeplanmorePage } from '../pages/upgradeplanmore/upgradeplanmore'; 

import { WelcomescreenPage } from '../pages/welcomescreen/welcomescreen'; 

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../providers/security/security'   
import { TimerObservable } from 'rxjs/observable/TimerObservable';  

import { TaskapprovePage } from '../pages/taskapprove/taskapprove';       
import { TasksegmentPage } from '../pages/tasksegment/tasksegment'; 
import { TaskpopupPage } from '../pages/taskpopup/taskpopup';  

import { LoginworksurlPage } from '../pages/loginworksurl/loginworksurl';   

import { FeedbackPage } from '../pages/feedback/feedback';     

import { BuyadditionalPage } from '../pages/buyadditional/buyadditional';  

import { Storage } from '@ionic/storage';

@Component({   
  templateUrl: 'app.html'
})
export class MyApp {  
  @ViewChild(Nav)nav:Nav      
  
  //  https://xd.adobe.com/spec/65ae4756-638a-4422-75bf-25cbe38ea275-139f/   // user  dev

  //https://xd.adobe.com/view/6e72dcfd-5c12-4270-5262-52fd135b0ad0-1843/screen/09d6931d-0a09-4b7f-81c5-717ef71cdd37     //prod
  newpost:number=0;
  TotalPost:number=0;   

  CatArr:any =[]; 

  createDate:any;
  TicketID:any; 
  updateTaskd:any;

  PowerBI:any;
  OpenTask:any;   

  onTaskPower:boolean = false;  
  onTaskStatus:boolean = false;      

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public security :SecurityProvider, public http:Http,public events: Events,private oneSignal: OneSignal, public str:Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      var date = new Date('2019-04-23T13:41:57.000Z');  
date.toString() // "Wed Jun 29 2011 09:52:48 GMT-0700 (PDT)"
console.log("mmm=22=",date.toString());   
 
     console.log("mmm==",moment('2019-04-23T13:41:57.000Z').format("DD MMM YYYY hh:mm A")); 

      statusBar.styleDefault();
      splashScreen.hide();    
        if(localStorage['loginactive']=="" || localStorage['loginactive']==null ) { 
           this.nav.setRoot(SigninPage);   
        }
        else  {   
             this.nav.setRoot(DashboardusrPage);   
             this.NotificationApp();                                     
             this.activepost();    
             this.CatFun(); 
             this.NotifyUpdate();             
        }
        events.subscribe('userrole:usrrole', (user, time) => {   
          this.activepost();
        });

        events.subscribe('usrrole:notify', (user, time) => {   
          this.NotificationApp();    
          this.CatFun(); 
          this.NotifyUpdate();       
        });  

        events.subscribe('taskid:tskid', (user, time) => { 
          this.TicketID=user;
          console.log("event entry");     
          console.log("this.TicketID ==",user) 
          this.CatFun();        
          this.security.taskrightside(user).subscribe(result => {          
            if (result.status === 200) { 
                   this.onTaskPower =true;
                   this.onTaskStatus =true;
              this.PowerBI=result.TermCat;  
              this.OpenTask=result.TermStatus;    
             // this.createDate=moment(result.post_date).format("DD MMM YYYY HH:mm:ss");   
            //this.updateTaskd=moment(result.post_date_gmt).format("DD MMM YYYY HH:mm:ss");
              var endtime=this.LocalDatetime();
              var Starttime = this.ServerTimestamp(result.post_date_gmt);
              let daytime=[];
              daytime=this.DiffTimestamp(Starttime,endtime);
              if(daytime[0].days !=0){    
                if(daytime[0].days == 1) {   this.updateTaskd=daytime[0].days+" day ago";   }    
                else {  this.updateTaskd=daytime[0].days+" days ago";   }
              }
              else{
                if(daytime[0].hours !=0) { 
                  if(daytime[0].hours == 1) { this.updateTaskd=daytime[0].hours+" hour ago";  } 
                  else {  this.updateTaskd=daytime[0].hours+" hours ago"; }
                }
                else{
                  if(daytime[0].minutes !=0) {
                    if(daytime[0].minutes ==1) { this.updateTaskd=daytime[0].minutes+" minute ago"; }
                    else {  this.updateTaskd=daytime[0].minutes+" minutes ago";   }
                    }
                  else{
                    if(daytime[0].seconds !=0) { 
                      if(daytime[0].seconds == 1) {  this.updateTaskd=daytime[0].seconds+" second ago";  }
                      else { this.updateTaskd=daytime[0].seconds+" seconds ago";   }   
                    }
                    else {   this.updateTaskd="Just Now";  }
                  }
                }
              }
              var endtime1=this.LocalDatetime();
              var Starttime1 = this.ServerTimestamp(result.post_date);
              let daytime1=[];
              daytime1=this.DiffTimestamp(Starttime1,endtime1);
              if(daytime1[0].days !=0){  
                if(daytime1[0].days == 1){ 
                  
                  
                    this.createDate="Yesterday at "+moment(result.post_date).format("hh:mm A");   
                }  
                else {   this.createDate=moment(result.post_date).format("DD MMM YYYY hh:mm A");  }     
              }  
              else  {   this.createDate="Today at "+moment(result.post_date).format("hh:mm A");  }
              }    
           else {    }
         }, err => {  console.log("err", err);   }
        ); 
    }); 


    });
  }


  NotificationApp() {
    console.log("NotificationApp==");                   
    this.oneSignal.startInit('88c090db-e908-4c22-857c-ba9025a471a8', '204995402175');           
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.setSubscription(true);  
    this.oneSignal.handleNotificationReceived().subscribe((jsonData) => { });
    this.oneSignal.handleNotificationOpened().subscribe((jsonData) => { });
    this.oneSignal.endInit(); 
    if(localStorage["pushusrid"]=="" || localStorage["pushusrid"]==undefined) {  
      this.oneSignal.getIds().then(data => {
        console.log("data==",data)
         localStorage["pushusrid"]=data.userId;  
         this.str.set('signalID',data.userId);
         this.security.upplayerID().subscribe(result => { 
          console.log("one signal",result) 
        }, err => {  console.log("err one signal", err);   }  
        );  
      })      
    }   
  }

  NotifyUpdate() {                 
    this.security.upplayerID().subscribe(result => { 
      console.log("one signal",result) 
    }, err => {  console.log("err one signal", err);   }  
    );      
  }

  ServerTimestamp(nowDate) {
    return moment(nowDate).format("DD/MM/YYYY HH:mm:ss");
    }

    LocalDatetime() {
      return moment().format("DD/MM/YYYY HH:mm:ss");
      }

    DiffTimestamp(Starttime,endtime) {    
        let datetime=[];
        var ms = moment(endtime,"DD/MM/YYYY HH:mm:ss").diff(moment(Starttime,"DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        datetime.push({days:d.days(),hours:d.hours(),minutes:d.minutes(),seconds:d.seconds()});
        return datetime;
    }


  sendEmail(){
 
  }


  activepost(){
    this.security.taskactive().subscribe(result => {       
      if (result.status === 200) { 
        this.newpost=result.newpost; this.TotalPost=result.TotalPost; 
        this.events.publish('usernotify:usrnotify',result.NewNotify, Date.now()); 
       }    
      else {    } 
   }, err => {  console.log("err", err);   }
  );
  }

  CatFun(){
    this.security.Categorylist().subscribe(result => {      
      if (result.status === 200) {  
        this.CatArr=result.final_array;    
        }    
     else {    }
   }, err => {  console.log("err", err);   }
  ); 
  }

  ProfileBtn() { 
    this.nav.push(ProfilePage);    
  }
  CreateBtn(){
    this.nav.push(AddtaskPage);     
  }
  AllTaskBtn(){ 
    this.nav.push(TaskallPage);  
  }
  LogoutBtn() {  
    localStorage.clear(); 
    this.str.get('signalID').then(res => {   if(res != null ) { 
      localStorage["pushusrid"]=res; }
     })                 
    //localStorage['showusrpop'] = "yes";      
    this.nav.setRoot(SigninPage);  
  }

}

