import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleproductPage } from './singleproduct.page';

const routes: Routes = [
  {
    path: '',
    component: SingleproductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleproductPageRoutingModule {}
