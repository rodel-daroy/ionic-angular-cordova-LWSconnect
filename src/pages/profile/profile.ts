import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'

import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { FileOpener } from '@ionic-native/file-opener';   
import { FilePath } from '@ionic-native/file-path';

import{FormBuilder,FormGroup,Validators}from'@angular/forms'
import { FormControl, AbstractControl } from '@angular/forms'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  validation:FormGroup

  onCountry:boolean=false;


  email:any="";
  mobile:any="";
  addresss:any="";
  CountrySelect; 
  states:any="";
  zipcode:any=""; 

  pimg
   
  Arrfinal=[];

  profilepic
  imgUrl
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider,public filetransfer: FileTransfer,public camera:Camera,public actionSheetCtrl:ActionSheetController,private fileOpener: FileOpener,public filePath: FilePath, public toastCtrl:ToastController,public formbuilder:FormBuilder) {  
     
    let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  // Email validation 

    
    this.validation=formbuilder.group({  
      emailid:['',Validators.compose([Validators.maxLength(100),this.noWhitespaceValidator, Validators.pattern(emailRegex), Validators.required])],  
      states:['',Validators.compose([Validators.maxLength(500), Validators.pattern('[a-zA-Z ]*'), Validators.required])], 
      mobile:['',Validators.compose([Validators.required, Validators.maxLength(12),this.noWhitespaceValidator ])],
      addresss:['',Validators.compose([Validators.required, Validators.maxLength(20000) ])],
      CountrySelect:['',Validators.compose([Validators.required, Validators.maxLength(20000) ])],
      zipcode:['',Validators.compose([Validators.required, Validators.maxLength(200) ])],
    })  
  

    this.pimg ="assets/imgs/newimg/group550.png"; 

    this.imgUrl=this.security.ImageUrlLink();

    this.security.getprofile().subscribe(result => {            
        if (result.status === 200) { 
          console.log("result.final_array==",result.getdata)  
          this.Arrfinal=result.getdata;  

    var EmailArr =  this.Arrfinal.filter(function(hero) { return hero.meta_key == "billing_email";  });
  if(EmailArr.length != 0){ this.email=EmailArr[0].meta_value;  }   

  var BillPostArr =  this.Arrfinal.filter(function(hero) { return hero.meta_key == "billing_postcode";  });
  if(BillPostArr.length != 0){ this.zipcode=BillPostArr[0].meta_value;  }

  var BillStateArr =  this.Arrfinal.filter(function(hero) { return hero.meta_key == "billing_state";  });
  if(BillStateArr.length != 0){ this.states=BillStateArr[0].meta_value;  }

  var BillCountryArr =  this.Arrfinal.filter(function(hero) { return hero.meta_key == "billing_country";  });
  if(BillCountryArr.length != 0){ this.CountrySelect=BillCountryArr[0].meta_value;  this.onCountry=true;   }
 
  var BillAddArr =  this.Arrfinal.filter(function(hero) { return hero.meta_key == "billing_address_1";  });
  if(BillAddArr.length != 0){ this.addresss=BillAddArr[0].meta_value;  }
  
  var BillMobArr =  this.Arrfinal.filter(function(hero) { return hero.meta_key == "billing_phone";  });
  if(BillMobArr.length != 0){ this.mobile=BillMobArr[0].meta_value;  }   
  
  var imgArr =  this.Arrfinal.filter(function(hero) { return hero.meta_key == "_attachments";  });
  console.log("imgArr==",imgArr) 
  if(imgArr.length != 0){
    if(imgArr[0].meta_value ==""){
      this.pimg="assets/imgs/newimg/group550.png";     
    } 
    else {
      this.pimg=imgArr[0].meta_value; 
    } 
   }           
          }    
       else {    }
     }, err => {  console.log("err", err);   }
    );
    
    
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

  onChangeCountry(){
    this.onCountry=true; 
  }

  UploadImage(){
    let actionsheet = this.actionSheetCtrl.create({
      title: 'Choose file or image Upload',
      buttons: [{
        text: 'Upload From Gallery',
        handler: () => {
       this.gallery()
        },
      },
      {
        text: 'Take A Snap',
        handler: () => {
         this.camera1()
        }
      }
    ]
    })
    actionsheet.present(); 
  }

  
  gallery()   {  
    this.camera.getPicture({
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {  
      console.log(imageData);
      this.filePath.resolveNativePath(imageData)
      .then(file => {
        console.log("file==",file)       
        //alert('file'+JSON.stringify(file));  
        let filePath: string = file;
        this.profilepic=filePath; 

       // var url = file;
       // var parts = url.split("/");
       // this.pimg=parts[parts.length-1];
        //console.log("this.imgmetatitle1==",this.pimg)  
        this.sendtoServer()
      })
      .catch(err => console.log(err));  
    }, (err) => { 
    })
  }
  
  
  camera1() { 
  this.camera.getPicture({
    quality: 75,
    destinationType:this.camera.DestinationType.FILE_URI,
    sourceType:this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG,
    targetHeight: 500,
    targetWidth: 500,
    saveToPhotoAlbum: false,
    correctOrientation: true
  }).then((imageData) => {
    console.log(imageData);
    this.filePath.resolveNativePath(imageData)  
    .then(file => {
      console.log("file==",file)       
      let filePath: string = file;
      this.profilepic=filePath;     
      //var url = file;
      //var parts = url.split("/");
      //this.pimg=parts[parts.length-1];  
      console.log("this.imgmetatitle1==",this.pimg)   
        this.sendtoServer()
    })
    .catch(err => console.log(err));  
  }, (err) => {
  })
  }

  sendtoServer(){
      const filetransfers: FileTransferObject = this.filetransfer.create();
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: this.profilepic,      
       // mimeType: "multipart/form-data", 
        params: {
          userid:localStorage['userid']
        }  
      }
      filetransfers.upload(this.profilepic,this.imgUrl+'/profileimg',options).then((data) => {  
        console.log(data);
        console.log(JSON.parse(data.response));
        let imgProfile= JSON.parse(data.response).image;
        this.profilepic="";
        this.pimg=JSON.parse(data.response).image;
        this.toastCtrl.create({ message: 'Image uploaded successfully', duration: 3000, position: 'top' }).present();  
        }, (err) => {
          console.log(err);
        }) 
  }




  GotoNext()  {   
    this.security.updateprofile(this.addresss,this.CountrySelect,this.states,this.zipcode,this.mobile).subscribe(result => {            
        if (result.status === 200) { 
          console.log("result==",result) 
          this.toastCtrl.create({ message: 'Profile updated successfully', duration: 3000, position: 'top' }).present();       
          }    
       else {    }
     }, err => {  console.log("err", err);   }
    ); 
  }


   
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
