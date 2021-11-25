import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorePageRoutingModule } from './store-routing.module';
import { CreatestoreComponent } from './createstore/createstore.component';
import { StorePage } from './store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, 
    StorePageRoutingModule
  ],
  declarations: [StorePage,CreatestoreComponent],
  entryComponents: [CreatestoreComponent],
  bootstrap: [CreatestoreComponent],
})
export class StorePageModule {}



