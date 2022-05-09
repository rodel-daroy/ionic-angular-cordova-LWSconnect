import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal'; 
import { HttpModule } from '@angular/http';

import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileOpener } from '@ionic-native/file-opener';
import { OneSignal } from '@ionic-native/onesignal';
import { VideoPlayer } from '@ionic-native/video-player';


import { MyApp } from './app.component';

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
import { WlchourpopPage } from '../pages/wlchourpop/wlchourpop'; 

import { TaskapprovePage } from '../pages/taskapprove/taskapprove';   
import { TasksegmentPage } from '../pages/tasksegment/tasksegment'; 

import { SecurityProvider } from '../providers/security/security';   
import { HtmlbypasPipe } from '../pipes/htmlbypas/htmlbypas';
import { TaskpopupPage } from '../pages/taskpopup/taskpopup'; 

import { LoginworksurlPage } from '../pages/loginworksurl/loginworksurl';  
import { FeedbackPage } from '../pages/feedback/feedback';   
import { BuyadditionalPage } from '../pages/buyadditional/buyadditional';  

import { FilePath } from '@ionic-native/file-path';  
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { PaymentpopupPage } from '../pages/paymentpopup/paymentpopup'; 

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    ForgetpassPage,
    AddlogPage,
    DashboardPage,
    NotificationPage,
    AddtaskPage,
    AddtasknewPage,
    DashboardusrPage,
    HourslogPage,
    UpgradeplanPage,
    TaskPage,
    TaskallPage,
    TasksearchPage,
    PaymentPage,
    ProfilePage,
    UpgradeplanmorePage,
    WelcomescreenPage,
    WlchourpopPage,
    HtmlbypasPipe,
    TaskapprovePage,
    TasksegmentPage,
    TaskpopupPage,
    LoginworksurlPage,
    FeedbackPage,
    BuyadditionalPage,
    PaymentpopupPage
  ],
  imports: [
    BrowserModule,
    HttpModule,  
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    ForgetpassPage,
    AddlogPage,
    DashboardPage,
    NotificationPage,
    AddtaskPage,
    AddtasknewPage,
    DashboardusrPage ,
    HourslogPage ,
    UpgradeplanPage ,
    TaskPage ,
    TaskallPage,   
    TasksearchPage , 
    PaymentPage,
    ProfilePage,
    UpgradeplanmorePage,  
    WelcomescreenPage ,
    WlchourpopPage, 
    TaskapprovePage,
    TasksegmentPage ,
    TaskpopupPage  ,
    LoginworksurlPage  ,
    FeedbackPage  ,  
    BuyadditionalPage ,
    PaymentpopupPage      
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PayPal,
    File,  
    FileTransfer,
    FileTransferObject,
    Camera,  
    FileChooser,
    FileOpener, 
    OneSignal, 
    FilePath, 
    PhotoViewer,
    VideoPlayer, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SecurityProvider
  ]
})
export class AppModule {}
