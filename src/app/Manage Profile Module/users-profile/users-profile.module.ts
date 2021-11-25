import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersProfilePageRoutingModule } from './users-profile-routing.module';

import { UsersProfilePage } from './users-profile.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    UsersProfilePageRoutingModule
  ],
  declarations: [UsersProfilePage]
})
export class UsersProfilePageModule {}
