import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, Events, Platform, MenuController } from 'ionic-angular';
import { ForgetpassPage } from '../forgetpass/forgetpass';
import { AddlogPage } from '../addlog/addlog'; 
import { DashboardusrPage } from '../dashboardusr/dashboardusr';    

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'
import { WelcomescreenPage } from '../welcomescreen/welcomescreen'; 

import{FormBuilder,FormGroup,Validators}from'@angular/forms'
import { FormControl, AbstractControl } from '@angular/forms'
import { LoginworksurlPage } from '../loginworksurl/loginworksurl';  

import { AddtaskPage } from '../addtask/addtask';


/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage { 
  
  validation:FormGroup

  EmailID
  Password
  ErrMsg:any=""; 
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController,public loadingCtrl: LoadingController, public http:Http, public security:SecurityProvider, public alertCtrl:AlertController,public events: Events, public platform: Platform,public formbuilder:FormBuilder, public menuCtrl: MenuController) {   
    // this.EmailID="chetan.singh@loginworks.com";
    // this.Password="wC$tb#Q%%ou%"; 
    this.menuCtrl.enable(false, 'authenticated'); 
    this.menuCtrl.enable(false, 'menu2');      
    platform.ready().then((readySource) => {   
      console.log('Width: ' + platform.width()); 
      console.log('Height: ' + platform.height());
    });

    let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  // Email validation 

    this.validation=formbuilder.group({
      EmailID:['',Validators.compose([Validators.maxLength(50),this.noWhitespaceValidator, Validators.pattern(emailRegex), Validators.required])], 
      Password:['',Validators.compose([Validators.required, Validators.maxLength(20),this.noWhitespaceValidator ])]
    })


  }


  ForgetNext() {
    this.navCtrl.push(ForgetpassPage); 
  }


  GotoNext(EmailID,Pass) {
    this.ErrMsg="";            
    //let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading1.gif" style="height:100px!important">`, cssClass: 'transparent' })  
    //loading.present();    
       this.security.loginCheck(EmailID,Pass).subscribe(result => {    
         console.log("result==",result);
          //loading.dismiss();   
          if (result.wpstatus === 1) {
              console.log(result.getdata[0].ID)    
              localStorage['userid']=result.getdata[0].ID; 
              localStorage['loginactive']="loginusr";  
                let fullname=result.getdata[0].display_name;     
              this.events.publish('userrole:usrrole',result.getdata[0].ID, Date.now());
              this.events.publish('usrrole:notify',result.getdata[0].ID, Date.now());
              if(result.postlen > 0)  {
                  this.navCtrl.setRoot(DashboardusrPage);  
              }  
              else  {
                this.navCtrl.setRoot(WelcomescreenPage,{ fullname:fullname });    
                // if(localStorage['showusrpop'] == "yes")  {
                //   this.navCtrl.setRoot(AddtaskPage);           
                // }
                // else   { 
                //   this.navCtrl.setRoot(WelcomescreenPage,{ fullname:fullname });  
                // } 
              }          
         } 
         else {  
           this.ErrMsg="Please enter valid credentials!";       
          // this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
         }
       }, err => {  
         console.log("err", err); 
         this.ErrMsg="Please check your internet connection and try again";         
        // loading.dismiss();    
         //this.toastCtrl.create({ message: `Please Enter valid credentials!`, duration: 4000, position: 'top' }).present(); return;

      

       }); 
  }

  public noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  GotoLoginworks() {  
    this.navCtrl.push(LoginworksurlPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

   
}
