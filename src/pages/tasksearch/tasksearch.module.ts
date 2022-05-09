import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TasksearchPage } from './tasksearch';

@NgModule({
  declarations: [
    TasksearchPage,
  ],
  imports: [
    IonicPageModule.forChild(TasksearchPage),
  ],
})
export class TasksearchPageModule {}
