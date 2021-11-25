import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EasypaisaPagePage } from './easypaisa-page.page';

const routes: Routes = [
  {
    path: '',
    component: EasypaisaPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EasypaisaPagePageRoutingModule {}
