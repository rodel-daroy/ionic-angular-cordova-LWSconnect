import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskpopupPage } from './taskpopup';

@NgModule({
  declarations: [
    TaskpopupPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskpopupPage),
  ],
})
export class TaskpopupPageModule {}
