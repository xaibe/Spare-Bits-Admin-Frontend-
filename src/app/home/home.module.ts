import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    ReactiveFormsModule, 
    HomePageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
