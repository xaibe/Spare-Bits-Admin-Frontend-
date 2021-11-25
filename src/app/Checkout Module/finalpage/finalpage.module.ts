import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalpagePageRoutingModule } from './finalpage-routing.module';

import { FinalpagePage } from './finalpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalpagePageRoutingModule
  ],
  declarations: [FinalpagePage]
})
export class FinalpagePageModule {}
