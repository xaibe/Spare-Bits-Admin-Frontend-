import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleStorePagePageRoutingModule } from './single-store-page-routing.module';

import { SingleStorePagePage } from './single-store-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleStorePagePageRoutingModule
  ],
  declarations: [SingleStorePagePage]
})
export class SingleStorePagePageModule {}
