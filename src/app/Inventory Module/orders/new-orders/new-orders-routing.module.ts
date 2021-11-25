import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewOrdersPage } from './new-orders.page';

const routes: Routes = [
  {
    path: '',
    component: NewOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewOrdersPageRoutingModule {}
