import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, Platform, ViewController, MenuController, LoadingController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'

import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { TaskallPage } from '../taskall/taskall';  
import { FileChooser } from '@ionic-native/file-chooser';  
import { HomePage } from '../home/home';
import { FileOpener } from '@ionic-native/file-opener';
import { DashboardusrPage } from '../dashboardusr/dashboardusr';     
import { FilePath } from '@ionic-native/file-path';

import{FormBuilder,FormGroup,Validators}from'@angular/forms'
import { FormControl, AbstractControl } from '@angular/forms' 

import { PhotoViewer } from '@ionic-native/photo-viewer';  
import { VideoPlayer } from '@ionic-native/video-player';


/**
 * Generated class for the AddtaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addtask',
  templateUrl: 'addtask.html',
})
export class AddtaskPage {

  validation:FormGroup

  onTask:boolean = false;  
  onTaskPower:boolean = false; 
  SelectArr:any=[];
  title:any;  
  contents:any;
  PowerSelect:any;

  imgUrl:any;
  profilepic;
  imgmetatitle:any="";  

  ErrMsg:any;

  isEnabled:boolean=true;
  imageshow 
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public security:SecurityProvider,public filetransfer: FileTransfer,public camera:Camera,public actionSheetCtrl:ActionSheetController,private fileChooser: FileChooser, public modalCtrl: ModalController, public file:File,private fileOpener: FileOpener, public platform:Platform,public viewController: ViewController,public filePath: FilePath,public formbuilder:FormBuilder, public menuCtrl: MenuController,private photoViewer: PhotoViewer,private videoPlayer: VideoPlayer,public loadingCtrl: LoadingController) { 
    this.menuCtrl.enable(false, 'menu2');     
  console.log("profilepic==",this.profilepic); 
    this.imgUrl=this.security.ImageUrlLink();

    this.validation=formbuilder.group({       
      PowerSelect:['',Validators.compose([Validators.maxLength(500), Validators.required])], 
      title:['',Validators.compose([Validators.required, Validators.maxLength(65535) ])], 
      contents:['',Validators.compose([Validators.required, Validators.maxLength(4294967295) ])] 
      })  

      this.security.Categorylist().subscribe(result => {      
          if (result.status === 200) { 
            console.log("result.final_array==",result.final_array)  
            this.SelectArr=result.final_array;  
            this.isEnabled=false; 
            }    
         else {    }
       }, err => {  console.log("err", err);   }
      ); 

          // Register for android's system back button
          let backAction =  platform.registerBackButtonAction(() => {
           // this.navCtrl.pop();   
            this.navCtrl.setRoot(DashboardusrPage);
           backAction();    
          },1)   

  }

  public noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  onChangeTask()  { this.onTask=true;    }  

  onChangeTaskPower() { this.onTaskPower=true;   } 

  uploadpicture() {
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
      },
      {
        text: 'Upload File',
        handler: () => {
         this.uploadFile()
        }
      }
    ]
    })
    actionsheet.present(); 
  }

  // uploadFile()  {  
  //   this.fileChooser.open()
  //   .then(uri => { console.log(uri);   this.profilepic=uri; 
  //   })  
  //   .catch(e => console.log(e));
  // }

  txtextension(text) {
    var index = text.lastIndexOf('.');
    return [text.slice(0, index), text.slice(index + 1)]
}


  OpenViewer(titles)  {
    console.log("titles==",titles)  
    var filepaths=this.profilepic; 
    console.log("titles==",filepaths)    
    var splitByLastDot = this.txtextension(titles);   
    let extensions= "."+splitByLastDot[1]; 
    // if(extensions ==".jpg" || extensions ==".png" || extensions ==".jpeg" ) {
    //   console.log("If cond..",this.imageshow)
    //   var options = {
    //     share: true, // default is false
    //     closeButton: true, // default is true 
    //     copyToReference: true // default is false
    // };
    //   this.photoViewer.show(this.imageshow, titles,options);   
    // }    
    // if(extensions == ".mp4" || extensions == ".MP4")  {
    //   // Playing a video.
    //   this.videoPlayer.play(filepaths).then(() => {
    //       console.log('video completed');
    //   }).catch(err => {
    //       console.log(err);
    //   });  
    // } 

  console.log("ELSE cond..")  
    let fileName=''
    let apptypes=''; 
    fileName=titles; 
    if(extensions==".pdf")      {      apptypes= 'application/pdf';     }
    if(extensions==".doc")      {     apptypes = 'application/msword';  }
    if(extensions==".docx")     {   
       apptypes ='application/vnd.openxmlformats-officedocument.wordprocessingml.document'   
    }
    if(extensions==".apk")     {   
      apptypes ='application/vnd.android.package-archive'   
   }
   
   if(extensions==".png")     {   
    apptypes ='image/png'   
 }

 if(extensions==".jpg")     {   
  apptypes ='image/jpeg'   
}

if(extensions==".bmp")     {    
  apptypes ='image/bmp'   
} 
 
    let filespath=this.file.dataDirectory 
    const fileTransfer: FileTransferObject = this.filetransfer.create();       
    fileTransfer.download(filepaths,filespath + fileName, true).then((entry) => {
      let url1 =entry.toURL();
      this.fileOpener.open(url1, apptypes).then(() =>  {   }
    ).catch(e => {   } );
    }, (error) => {   
    });
  
  }

  uploadFile()  {  
    this.fileChooser.open()
    .then(uri => { 
      console.log("uri",uri);     
        // get file path
        this.imageshow=uri;
		this.filePath.resolveNativePath(uri)
		.then(file => {
      console.log("file==",file)       
      let filePath: string = file;
      this.profilepic=file;      


      var url = file;
      var parts = url.split("/");
      this.imgmetatitle=parts[parts.length-1];
      console.log("this.imgmetatitle1==",this.imgmetatitle)  
  
      //this.ErrMsg="Please upload file except .bat/.exe file";

      /*
      if(file.split('file:///storage/emulated/0/Android/data/io.lws.connect/cache/')[1] != undefined){
        this.imgmetatitle=file.split('file:///storage/emulated/0/Android/data/io.lws.connect/cache/')[1]; 
        console.log("this.imgmetatitle1==",this.imgmetatitle)  
      }
   
      if(file.split('file:///storage/emulated/0/Download/')[1] != undefined){
        this.imgmetatitle=file.split('file:///storage/emulated/0/Download/')[1]; 
        console.log("this.imgmetatitle2==",this.imgmetatitle)  
      }
      if(file.split('file:///storage/emulated/0/WhatsApp/Media/WhatsApp Images/')[1] != undefined){
        this.imgmetatitle=file.split('file:///storage/emulated/0/WhatsApp/Media/WhatsApp Images/')[1]; 
        console.log("this.imgmetatitle3==",this.imgmetatitle)  
      }
      if(file.split('file:///storage/emulated/0/DCIM/ScreenRecorder/')[1] != undefined){
        this.imgmetatitle=file.split('file:///storage/emulated/0/DCIM/ScreenRecorder/')[1];  
        console.log("this.imgmetatitle4==",this.imgmetatitle)  
      }

      if(file.split('file:///storage/emulated/0/WhatsApp/Media/WhatsApp Video/')[1] != undefined){
        this.imgmetatitle=file.split('file:///storage/emulated/0/WhatsApp/Media/WhatsApp Video/')[1];  
        console.log("this.imgmetatitle4==",this.imgmetatitle)   
      }  
      */


		})
    .catch(err => console.log(err));
    })  
    .catch(e => console.log(e));
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
      this.imageshow=imageData;
      this.filePath.resolveNativePath(imageData)
      .then(file => {
        console.log("file==",file)       
        //alert('file'+JSON.stringify(file));  
        let filePath: string = file;
        this.profilepic=filePath; 

        var url = file;
        var parts = url.split("/");
        this.imgmetatitle=parts[parts.length-1];
        console.log("this.imgmetatitle1==",this.imgmetatitle)  

        /*
        if(file.split('file:///storage/emulated/0/Android/data/io.lws.connect/cache/')[1] != undefined){
          this.imgmetatitle=file.split('file:///storage/emulated/0/Android/data/io.lws.connect/cache/')[1]; 
          console.log("this.imgmetatitle1==",this.imgmetatitle)  
        }
    
        if(file.split('file:///storage/emulated/0/Download/')[1] != undefined){
          this.imgmetatitle=file.split('file:///storage/emulated/0/Download/')[1]; 
          console.log("this.imgmetatitle2==",this.imgmetatitle)  
        }
        if(file.split('file:///storage/emulated/0/WhatsApp/Media/WhatsApp Images/')[1] != undefined){
          this.imgmetatitle=file.split('file:///storage/emulated/0/WhatsApp/Media/WhatsApp Images/')[1]; 
          console.log("this.imgmetatitle3==",this.imgmetatitle)  
        }
        if(file.split('file:///storage/emulated/0/DCIM/ScreenRecorder/')[1] != undefined){
          this.imgmetatitle=file.split('file:///storage/emulated/0/DCIM/ScreenRecorder/')[1];  
          console.log("this.imgmetatitle4==",this.imgmetatitle)  
        }
        */
        
      })
      .catch(err => console.log(err));
      //this.profilepic=imageData  
      //this.imgmetatitle=imageData.split('file:///storage/emulated/0/Android/data/io.lws.connect/cache/')[1];   
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
    this.imageshow=imageData;
    this.filePath.resolveNativePath(imageData)  
    .then(file => {
      console.log("file==",file)       
      //alert('file'+JSON.stringify(file));
      let filePath: string = file;
      this.profilepic=filePath;  
      
      var url = file;
        var parts = url.split("/");
        this.imgmetatitle=parts[parts.length-1];
        console.log("this.imgmetatitle1==",this.imgmetatitle)  

     // this.imgmetatitle=file.split('file:///storage/emulated/0/Android/data/io.lws.connect/cache/')[1]; 
      console.log("this.imgmetatitle1==",this.imgmetatitle)     
    })
    .catch(err => console.log(err));  
    //this.profilepic=imageData
  }, (err) => {
  })
  }

      ProfileImageUp(imgData,commentID) { 
        const filetransfers: FileTransferObject = this.filetransfer.create();
        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: imgData,      
         // mimeType: "multipart/form-data", 
          params: {
            userid:localStorage['userid'],
            commentID : commentID,
            image : imgData
          }  
        }  
        filetransfers.upload(imgData,this.imgUrl+'/taskcreateimg',options).then((data) => {
          console.log(data)
          console.log(JSON.parse(data.response))
          let imgProfile= JSON.parse(data.response).image;
          }, (err) => {
          }) 
      }

      NotifyBtn() { 
        //this.navCtrl.pop();   
        this.navCtrl.setRoot(DashboardusrPage);    
      } 
       
  GotoNext()  {   
    if(this.title =="" || this.title == undefined || this.PowerSelect == "" || this.PowerSelect==undefined || this.contents =="" || this.contents == undefined) 
    return; 

    let postcontent="<p>"+this.contents+"<p>";

    const loader = this.loadingCtrl.create({ content: "Please wait..." });    
    loader.present();
    this.security.CreateTask(postcontent,this.title,this.PowerSelect).subscribe(result => {      
      if (result.wpstatus === 1) { 
        console.log(result);
        if(this.profilepic != undefined){    
          this.ProfileImageUp(this.profilepic,result.commentID);    
        }  
        loader.dismiss();  
         this.onTaskPower=false;
         this.title="";
         this.PowerSelect="";
         this.contents="";   
         this.navCtrl.setRoot(TaskallPage,{ createtask:"createtask" }); 
      } 
      else if (result.wpstatus === 2)   {   loader.dismiss();  this.ErrMsg=result.message;     }   
     else   {   loader.dismiss(); this.ErrMsg=result.message;    }
   }, err => {       
     loader.dismiss(); 
     console.log("err", err);  
       this.ErrMsg="Please check your internet connection and try again";  
       }
  );  
}

GotoNext1(){
  let fileName=''
  let apptypes='';
  apptypes= 'application/pdf'; 
  fileName="demo.pdf"; 
  //if(extensions==".pdf")      {    fileName=titles+".pdf";  apptypes= 'application/pdf';     }
  //if(extensions==".doc")      {    fileName=titles+".doc";   apptypes = 'application/msword';  }
  //if(extensions==".docx")     {   
     //fileName=titles+".docx";
     //  apptypes ='application/vnd.openxmlformats-officedocument.wordprocessingml.document'   
  //}

  let filespath=this.file.dataDirectory
  const fileTransfer: FileTransferObject = this.filetransfer.create();       
  fileTransfer.download("http://loginworks.net/portal/demowordfortms.pdf",filespath + fileName, true).then((entry) => {
    let url1 =entry.toURL();
    this.fileOpener.open(url1, apptypes).then(() =>  {   }
  ).catch(e => {   } );
  }, (error) => {   
  });
}
   


  ionViewDidLoad() {
    this.viewController.showBackButton(false)  
    console.log('ionViewDidLoad AddtaskPage');
  }

  
}