import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, Content, ActionSheetController, Events, MenuController, Platform } from 'ionic-angular';
import { DashboardusrPage } from '../dashboardusr/dashboardusr';  

import { Http, Headers, RequestOptions } from '@angular/http';
import{SecurityProvider}from'../../providers/security/security'  
import { TimerObservable } from 'rxjs/observable/TimerObservable';   

import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser'; 
import { FileOpener } from '@ionic-native/file-opener'; 

import { FilePath } from '@ionic-native/file-path';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { TaskallPage } from '../taskall/taskall';       


/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage { 
  @ViewChild(Content) content: Content;     
  chats = [];
  tasklistArr=[]; 
  taskID:any;   
  PostTitle 
  replyarea
  chattimes:any;  
  count:number =0;
  profilepic:any;     
  imgUrl:any;

  imgmetatitle:any ="";
  txtboolean:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController,public loadingCtrl: LoadingController, public toastCtrl:ToastController, public security :SecurityProvider, public http:Http,public filetransfer: FileTransfer,public camera:Camera,public actionSheetCtrl:ActionSheetController,private fileChooser: FileChooser,public file:File,private fileOpener: FileOpener,public events: Events,public filePath: FilePath,public photoViewer:PhotoViewer, public menuCtrl: MenuController, public platform: Platform) {    
    this.menuCtrl.enable(true, 'menu2'); 
    
    let backAction =  platform.registerBackButtonAction(() => {
      this.navCtrl.pop();       
      this.navCtrl.setRoot(TaskallPage);
     backAction();    
    },1)  

    this.imgUrl=this.security.ImageUrlLink();  
    this.taskID=this.navParams.get("taskID");          
    this.PostTitle = this.navParams.get("PostTitle");
      localStorage["taskID"]=this.taskID;     
      this.events.publish('taskid:tskid',this.taskID, Date.now());  
      //this.ChatRefresh();  
      this.chattimes =TimerObservable.create(0, (3*1000)).subscribe(t => {  this.ChatRefresh();  }); 

    
  }

  ionViewWillLeave() {       
    this.chattimes.unsubscribe();
    this.menuCtrl.enable(false, 'menu2');     
  }
   
  ionViewDidLoad() {    
    this.viewCtrl.showBackButton(false);      
    console.log('ionViewDidLoad TaskPage');
    // this.chats.push(  
    //   {"styleClass": "chat-message left", "msgStr": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.","hands":2 },        
    //   {"styleClass": "chat-message right", "msgStr": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.","hands":1 },
    //   {"styleClass": "chat-message left", "msgStr": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.","hands":2 } 
    // );
  }

  ChatRefresh() {  
       this.security.MyTaskDetail(this.taskID).subscribe(result => {    
          if (result.status === 200) {   
            this.tasklistArr=[];
              this.tasklistArr=result.final_array 
              setTimeout(() => {   this.content.scrollToBottom(300);  }, 1000);           
         } 
         else {
         }
       }, err => {
         console.log("err", err);
       }); 
  }

  uploadpicture()
  {
    let actionsheet = this.actionSheetCtrl.create({
      title: 'Image Upload!',
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
      }]
    })
    actionsheet.present(); 
  }

  uploadFile(){
    this.fileChooser.open()
    .then(uri => { console.log(uri); 

       // get file path
       this.filePath.resolveNativePath(uri)
       .then(file => {
         console.log("file==",file)    
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


  gallery() {
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
      this.filePath.resolveNativePath(imageData)
      .then(file => {
        console.log("file==",file)       

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
    }, (err) => {
    })
  }
  
  
  
  camera1(){
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
   
    this.filePath.resolveNativePath(imageData)  
    .then(file => {
      console.log("file==",file)       
      let filePath: string = file;
      this.profilepic=filePath; 
      
      var url = file;
        var parts = url.split("/");
        this.imgmetatitle=parts[parts.length-1];
        console.log("this.imgmetatitle1==",this.imgmetatitle)   

      //this.imgmetatitle=file.split('file:///storage/emulated/0/Android/data/io.lws.connect/cache/')[1]; 
      console.log("this.imgmetatitle1==",this.imgmetatitle)     
    })
    .catch(err => console.log(err));   

  }, (err) => {
  })
  }

      
ProfileImageUp(imgData,commentID) {
/*
    const filetransfers: FileTransferObject = this.filetransfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'filename.jpg',
      chunkedMode: false,    
      mimeType: "multipart/form-data",
      params: { 'upload_preset' :  'wjnegjnc'  }
    }
*/
    /*
    filetransfers.onProgress((e) => {
      this._zone.run(() => {
      this.loadProgress = (e.lengthComputable) ? Math.round(e.loaded / e.total * 100) : -1;
      })  
    });
    */
  /*
    filetransfers.upload(ImgesP,'https://api.cloudinary.com/v1_1/loginworks/upload', options)
      .then((data) => {
         this.profilepic=JSON.parse(data.response).secure_url
      }, (err) => {
       alert('error'+JSON.stringify(err))  
       alert(err)  
      })
  */
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
        let imgProfile= JSON.parse(data.response).image;
          console.log(data); 
        //alert(JSON.parse(data.response));  
        }, (err) => {      
          //alert('error'+JSON.stringify(err));  
          //alert(err);  
        }) 


  }


  GetData() {
   // let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading1.gif" style="height:100px!important">`, cssClass: 'transparent' })  
   // loading.present();    
       this.security.MyTaskDetail(this.taskID).subscribe(result => {    
          //loading.dismiss();   
          if (result.status === 200) { 
              this.tasklistArr=result.final_array 
              setTimeout(() => {   this.content.scrollToBottom(300);  }, 1000);           
         } 
         else {
           this.toastCtrl.create({ message: `Please Enter Valid credentials!`, duration: 4000, position: 'top' }).present(); return;
         }
       }, err => {
         console.log("err", err);
         //loading.dismiss();  
         //this.toastCtrl.create({ message: `Please Enter valid credentials!!`, duration: 4000, position: 'top' }).present(); return;
       }); 
  }


  SendReply() {
    this.count++
  if(this.count%2==0){
    this.SendServer();
  }

  if(this.count%2==1){
    document.getElementById("clmsg").style.display="block";
  }

 }

 MobCheck(vale) {
   if(vale.length==0) {
    //this.txtboolean=false;
    return; 
   }
   else{
    //this.txtboolean=true;  
   }
 }   

 SendServer() {  
  if(this.replyarea =="" || this.replyarea == undefined){
    //this.txtboolean=false;   
    //this.toastCtrl.create({ message: `Please enter your message.`, duration: 4000, position: 'top' }).present();
    return; 
    }  
      var taskcontent="<p>"+this.replyarea+"</p>";  
     // let loading=this.loadingCtrl.create({ spinner: 'hide', content: `<img src="assets/imgs/loading1.gif" style="height:100px!important">`, cssClass: 'transparent' })  
      //loading.present();      
         this.security.MyTaskDetailBtn(this.taskID,taskcontent).subscribe(result => {    
           // loading.dismiss();   
            if (result.status === 200) { 
              if(this.profilepic !="" || this.profilepic != undefined){ 
                this.ProfileImageUp(this.profilepic,result.commentID);   
              } 
              document.getElementById("clmsg").style.display="none";  
              this.replyarea = "";
              this.profilepic ="";       
              //this.toastCtrl.create({ message: result.message, duration: 4000, position: 'top' }).present(); 
            // this.chattimes =TimerObservable.create(0, (3*1000)).subscribe(t => {  this.ChatRefresh(); }); 
              return;        
           } 
           else {
             this.toastCtrl.create({ message: `Sorry, the app could not connect to our system. Please try in some time.`, duration: 4000, position: 'top' }).present(); return;     
           }
         }, err => {
           console.log("err", err);
           //loading.dismiss();  
           //this.toastCtrl.create({ message: `Please Enter valid credentials!!`, duration: 4000, position: 'top' }).present(); return;
         }); 
 }



  txtextension(text) {
    var index = text.lastIndexOf('.');
    return [text.slice(0, index), text.slice(index + 1)]
}
  
  
  GotoNext1(filepaths,titles,ext){
    console.log("filepaths==",filepaths);   
    var splitByLastDot = this.txtextension(titles);   
    let extensions= "."+splitByLastDot[1];
    // if(extensions ==".jpg" || extensions ==".png" || extensions ==".jpeg" ){
    //   var options = { 
    //     share: true, // default is false 
    //     closeButton: true, // default is true 
    //     copyToReference: true // default is false
    // };
    //   this.photoViewer.show(filepaths, titles,options);  
    // } 

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


    
  NotifyBtn() {     
    this.navCtrl.setRoot(TaskallPage);     
  } 
      



}
