import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EasypaisaPagePageRoutingModule } from './easypaisa-page-routing.module';

import { EasypaisaPagePage } from './easypaisa-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EasypaisaPagePageRoutingModule
  ],
  declarations: [EasypaisaPagePage]
})
export class EasypaisaPagePageModule {}
