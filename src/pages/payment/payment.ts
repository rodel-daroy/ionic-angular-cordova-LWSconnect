import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, LoadingController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal'; 

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'

import { DashboardusrPage } from '../dashboardusr/dashboardusr'; 
import { PaymentpopupPage } from '../paymentpopup/paymentpopup'; 

import{FormBuilder,FormGroup,Validators}from'@angular/forms'
import { FormControl, AbstractControl } from '@angular/forms'

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage { 
  Amounts:any;
  currency:any;
  validation:FormGroup
  price:any;
  title:any;   
  ErrMsg:any="";
  BalHours
  TotalHours

  fullname
  mobno
  emailid
  constructor( public navCtrl: NavController, public navParams: NavParams,public toastCtrl : ToastController,public payPal: PayPal, public http:Http, public security:SecurityProvider,public formbuilder:FormBuilder , public modal:ModalController, public loadingCtrl:LoadingController) {   

    this.title=this.navParams.get("title"); 
    this.price=this.navParams.get("ItemPrice"); 
    this.Amounts=this.navParams.get("price");
    this.BalHours=this.navParams.get("balance");
    this.TotalHours=this.navParams.get("total");
    this.currency="USD"; 

    let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  // Email validation 

    this.validation=formbuilder.group({    
      fullname:['',Validators.compose([Validators.maxLength(300),Validators.pattern('[a-zA-Z ]*'), Validators.required])],    
      EmailID:['',Validators.compose([Validators.maxLength(100),this.noWhitespaceValidator, Validators.pattern(emailRegex), Validators.required])],  
      mobno:['',Validators.compose([Validators.maxLength(12),this.noWhitespaceValidator,Validators.required])] 
    })  
 
          
  }
   

  MobCheck(vale)  {
    if(vale.length==12)  {
      return false;   
    }
  }  
         

  public noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

    
navigatetoschooldetails()  {      
this.ErrMsg="";
  this.payPal.init({        
    //PayPalEnvironmentProduction: 'AZ0pKY1B0TdV2NvtihDgaanO22BIHjydaUc55DWGQ8nakr_GQXVJr7Hagr2oStosIinKioa71MB2vQfb',
   // PayPalEnvironmentSandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
   PayPalEnvironmentProduction: '',
    PayPalEnvironmentSandbox:  'AYcJ5QLBDuon8ChZZId3ELqrVD_rLIxFNB3_JfzKBdjTyOa2NDV0FeGRnFcxhyIUtImnmWzARFuORp9_'
  }).then(() => {  
    // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({ 
      // Only needed if you get an "Internal Service Error" after PayPal login!
      //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal 
    })).then((resrender) => {
      console.log("resrender == ", resrender)    
      let payment = new PayPalPayment(this.Amounts, this.currency, 'LW Connect payment', 'sale'); 
      this.payPal.renderSinglePaymentUI(payment).then((res) => {
        console.log("response == ", res)
        // Successfully paid  
        let paymentid=res.response.id;  
        let PaidDate=res.response.create_time;  
        // Example sandbox response
        // {
        //   "client": {
        //     "environment": "sandbox",
        //     "product_name": "PayPal iOS SDK",
        //     "paypal_sdk_version": "2.16.0",
        //     "platform": "iOS"
        //   },
        //   "response_type": "payment",
        //   "response": {
        //     "id": "PAY-1AB23456CD789012EF34GHIJ",
        //     "state": "approved",
        //     "create_time": "2016-10-03T13:33:33Z",
        //     "intent": "sale"
        //   }
        // }  
        const loader = this.loadingCtrl.create({  content: "Please wait..."   });
        loader.present();
        this.security.payment(paymentid,this.title,this.BalHours,this.TotalHours,this.Amounts,PaidDate,this.fullname,this.mobno,this.emailid).subscribe(result => {    
          console.log("result==",result);
           if (result.wpstatus === 1) { 
            this.navCtrl.pop(); 
            this.navCtrl.pop();     
            loader.dismiss();     
            let firewallTypeModal=this.modal.create(PaymentpopupPage); 
              firewallTypeModal.onDidDismiss(data => {       
                  this.navCtrl.setRoot(DashboardusrPage);
            })
            firewallTypeModal.present();      
           //this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
            return;
           }
          else { 
            loader.dismiss();   
            this.ErrMsg=result.message;              
          }
        }, err => {  
          loader.dismiss();  
          console.log("err", err); 
        }); 
      }, (errdialog) => {
        // payment cancelled   
        console.log("errdialog == ", errdialog);
        //this.ErrMsg='Payment cancelled ';  
        this.toastCtrl.create({ message: 'Payment cancelled ', duration: 3000, position: 'top' }).present();
        return;
        // Error or render dialog closed without being successful
      });
    }, (errconfig) => {
      console.log("errconfig == ", errconfig)
      // Error in configuration
      //this.ErrMsg='Error in configuration'; 
      this.toastCtrl.create({ message: 'Error in configuration', duration: 3000, position: 'top' }).present();
      return;
    });
  }, (errinitialization) => {
    console.log("errinitialization == ", errinitialization)
    //this.ErrMsg="Error in initialization, maybe PayPal isn't supported or something else"; 
    // Error in initialization, maybe PayPal isn't supported or something else
    this.toastCtrl.create({ message: "Error in initialization, maybe PayPal isn't supported or something else", duration: 3000, position: 'top' }).present();   
    return;
  }); 
  }

   
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }


   
}
