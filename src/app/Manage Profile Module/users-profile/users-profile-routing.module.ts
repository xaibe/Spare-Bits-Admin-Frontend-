import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersProfilePage } from './users-profile.page';

const routes: Routes = [
  {
    path: '',
    component: UsersProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersProfilePageRoutingModule {}
