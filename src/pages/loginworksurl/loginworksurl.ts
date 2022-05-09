import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the LoginworksurlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginworksurl',
  templateUrl: 'loginworksurl.html',
})
export class LoginworksurlPage {
  UrlLink     
  constructor(public navCtrl: NavController, public navParams: NavParams,private sanitize: DomSanitizer) {
    this.UrlLink = sanitize.bypassSecurityTrustResourceUrl("http://loginworks.net/portal");    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginworksurlPage');
  }

}
