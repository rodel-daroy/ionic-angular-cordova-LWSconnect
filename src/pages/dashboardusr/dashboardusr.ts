import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, ToastController } from 'ionic-angular';
import { Chart } from 'chart.js'; 

import { UpgradeplanmorePage } from '../upgradeplanmore/upgradeplanmore';  
import { UpgradeplanPage } from '../upgradeplan/upgradeplan';
import { NotificationPage } from '../notification/notification';   

import FusionCharts from 'fusioncharts/core'
 
// include chart from viz folder - import ChartType from fusioncharts/viz/[ChartType];
import Column2D from 'fusioncharts/viz/column2d';    
import Doughnut2d from 'fusioncharts/viz/doughnut2d'; 
import { AddtaskPage } from '../addtask/addtask';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'      
import { TimerObservable } from 'rxjs/observable/TimerObservable'; 

import { TasksegmentPage } from '../tasksegment/tasksegment'; 
import { TaskpopupPage } from '../taskpopup/taskpopup'; 
import { BuyadditionalPage } from '../buyadditional/buyadditional';  
 

/**
 * Generated class for the DashboardusrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboardusr',
  templateUrl: 'dashboardusr.html',
})
export class DashboardusrPage {   
    
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;  
  
  BalanceHours
  TotalHours

  public n : number = 1;
  public chattimes:any;   
  
  NotifyStatus:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public security :SecurityProvider, public http:Http, public menuCtrl: MenuController,public events: Events, public toastCtrl:ToastController) { 
    this.menuCtrl.enable(true, 'authenticated'); 
    this.menuCtrl.enable(false, 'menu2');    
  }

  ionViewWillEnter() {     
    this.chattimes=TimerObservable.create(0, (3*1000)).subscribe(t => { 
     console.log("t==",t);  
     this.events.publish('userrole:usrrole',localStorage['userid'], Date.now())  
    });        
   this.events.subscribe('usernotify:usrnotify', (user, time) => {   this.NotifyStatus =user;  });    
  }
  
  ionViewWillLeave() {     
    this.chattimes.unsubscribe();   
  }

  itempending() {
    this.navCtrl.push(TasksegmentPage,{ ShowPopup:true });     
  }

  btnOptions(){
     
  }
 
  CreateBtn() {     
    this.navCtrl.push(AddtaskPage);  
  }
  UpgradeBtn(){
    this.navCtrl.push(BuyadditionalPage);     
  }
  NotifyBtn(){  
    this.navCtrl.push(NotificationPage);
  }  
 
ChartjsCall(){
    // add chart as dependency - FusionCharts.addDep(ChartType);
FusionCharts.addDep(Doughnut2d);  
// instantiate the chart.
var chartInstance = new FusionCharts({
      type: 'doughnut2d',  
      renderAt: 'chart-container',
      width: '100%', 
      height: '50%', 
      dataFormat: 'json',
      dataSource: {
        "chart": {  
          "numberPrefix": "$",
          "bgColor": "#ffffff",
          "startingAngle": "310",
          "showLegend": "1",
          "defaultCenterLabel": "Total revenue: $64.08K",
          "centerLabelBold": "1",
          "showTooltip": "0",
          "decimals": "0",
       
        },
        "data": [{
          "label": "Food",
          "value": "285040"
        }, {
          "label": "Apparels",
          "value": "146330"
        }]
      }  
  // type: 'doughnut2d', 
  // renderAt: "chart-container", 
  // width: "600",
  // height: "400",
  // dataFormat: "json",
  // dataSource: {
  //     chart: {
  //       caption: "Countries With Most Oil Reserves [2017-18]",
  //       subcaption: "In MMbbl = One Million barrels"
  //     },
  //     data: [
  //       { label: "Venezuela", value: "290000" },
  //       { label: "Saudi", value: "260000" },
  //       { label: "Canada", value: "180000" },
  //       { label: "Iran", value: "140000" },
  //       { label: "Russia", value: "115000" },
  //       { label: "UAE", value: "100000" },
  //       { label: "US", value: "30000" },
  //       { label: "China", value: "30000" }
  //     ]
  //   }




});
// render the chart
chartInstance.render();
  }

  ionViewDidLoad() {
     
    console.log('ionViewDidLoad DashboardusrPage'); 
    this.security.dashboard().subscribe(result => {      
      if (result.status === 200) {
        this.TotalHours=result.TotalHours; this.BalanceHours=result.BalanceHours;
        let firstlbl=" Hours left";
        let secondlbl=" Hours logged";          
        //let gradient = this.doughnutCanvas.nativeElement.getContext('2d').createLinearGradient(170, 227, 125,0.1);
        //gradient.addColorStop(0,'green');       
        //gradient.addColorStop(1, 'green');     
        let gradient = this.doughnutCanvas.nativeElement.getContext('2d').createLinearGradient(77, 216, 160,0.1);
         gradient.addColorStop(0,'#AAE37D');     
         gradient.addColorStop(1, '#4DD8A0');    
         this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
           type: 'doughnut',
           data: {
           //  labels: [ firstlbl, secondlbl],    
             datasets: [{   
               data: [ this.BalanceHours, this.TotalHours ],   
               //data: [ "5", "15" ],     
               backgroundColor:["#EFEFEF",gradient]  
             }]    
           },
           options: {
             legend: {
               display: true, 
               position :top
             },
             tooltips: { 
               enabled: false
             },
             title: {
               display: false,
               fontStyle: 'bold',
               fontSize: 9    
             },
             cutoutPercentage : 40        
           },
         }); 
        }    
      else {    } 
   }, err => {  console.log("err", err);  
   this.toastCtrl.create({ message: `Please check your internet connection and try again`, duration: 4000, position: 'top' }).present(); return; 
   }
  );

  

    
  }     

  ChartDoughtnut(){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [
            "25","75" 
          ], 
          backgroundColor: [
            '#FFF','linear-gradient(#4DD8A0,#AAE37D)' 
          ]
        }]    
      },
      options: {
        legend: {
          display: true, 
          position :top
        },
        tooltips: {
          enabled: false
        },
        title: {
          display: false,
          fontStyle: 'bold',
          fontSize: 9    
        },
        cutoutPercentage : 40        
      },
    });
  }

   



}
