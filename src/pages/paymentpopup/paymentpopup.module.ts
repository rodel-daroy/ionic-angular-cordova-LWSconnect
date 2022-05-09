import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentpopupPage } from './paymentpopup';

@NgModule({
  declarations: [
    PaymentpopupPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentpopupPage),
  ],
})
export class PaymentpopupPageModule {}
