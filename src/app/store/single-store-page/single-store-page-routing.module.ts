import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleStorePagePage } from './single-store-page.page';

const routes: Routes = [
  {
    path: '',
    component: SingleStorePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleStorePagePageRoutingModule {}
