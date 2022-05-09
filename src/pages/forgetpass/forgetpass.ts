import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'  
import { TimerObservable } from 'rxjs/observable/TimerObservable'; 

import{FormBuilder,FormGroup,Validators}from'@angular/forms'
import { FormControl, AbstractControl } from '@angular/forms'

import { LoginworksurlPage } from '../loginworksurl/loginworksurl';   

/**
 * Generated class for the ForgetpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpass',
  templateUrl: 'forgetpass.html',
})
export class ForgetpassPage {

  validation:FormGroup

  emailid:any;

  ErrMsg:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public modal: ModalController, public security :SecurityProvider, public http:Http,public formbuilder:FormBuilder) {
   
    let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  // Email validation 


    this.validation=formbuilder.group({
      EmailID:['',Validators.compose([Validators.maxLength(50),this.noWhitespaceValidator, Validators.pattern(emailRegex), Validators.required])], 
      })   
       
  }

  
  public noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  GotoNext() {   
    this.security.resetpass(this.emailid).subscribe(result => {      
      if (result.status === 200) { 
        if(result.wpstatus == 1){
          let firewallTypeModal=this.modal.create(HomePage, { ParamsTXT:"forgetpass" }); 
          firewallTypeModal.onDidDismiss(data => {  if(data=="forgetpass"){  this.navCtrl.pop(); }  })
          firewallTypeModal.present();  
        }  
        else {  this.ErrMsg=result.message;   }     
      }    
     else {  this.ErrMsg=result.message;   }     
   }, err => {  console.log("err", err); this.ErrMsg="No internet connection, Please connect to internet.";  }
  ); 
}
 
 BacktoLogin() {
   this.navCtrl.pop();
 }

 GotoLoginworks(){ 
  this.navCtrl.push(LoginworksurlPage);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpassPage');
  }

}
