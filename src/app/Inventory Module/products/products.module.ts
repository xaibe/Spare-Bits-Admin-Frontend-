
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddnewproductComponent } from './addnewproduct/addnewproduct.component';
import { IonicModule } from '@ionic/angular';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsPageRoutingModule } from './products-routing.module';
//import { TreeViewModule } from "ionic-tree-view";

import { ProductsPage } from './products.page';

@NgModule({
  imports: [
  //  TreeViewModule.forRoot(),
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, 
    ProductsPageRoutingModule
  ],
  declarations: [ProductsPage,AddnewproductComponent],
  entryComponents: [AddnewproductComponent],
  bootstrap: [AddnewproductComponent],
})
export class ProductsPageModule {}
