import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomescreenPage } from './welcomescreen';

@NgModule({
  declarations: [
    WelcomescreenPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomescreenPage),
  ],
})
export class WelcomescreenPageModule {}
