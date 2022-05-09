import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskallPage } from './taskall';

@NgModule({
  declarations: [
    TaskallPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskallPage),
  ],
})
export class TaskallPageModule {}
