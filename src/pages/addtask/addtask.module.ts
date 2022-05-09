import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddtaskPage } from './addtask';

@NgModule({
  declarations: [
    AddtaskPage,
  ],
  imports: [
    IonicPageModule.forChild(AddtaskPage),
  ],
})
export class AddtaskPageModule {}
