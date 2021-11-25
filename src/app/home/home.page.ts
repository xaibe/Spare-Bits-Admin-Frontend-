import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../sdk/core/auth.service';
import { ProductsService } from '../../sdk/core/products.service';
import { OrdersService } from 'src/sdk/core/orders.service';
import { UserService } from 'src/sdk/core/user.service';
import { StoresService } from 'src/sdk/core/stores.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loading = false;
  deleteLoading = false;
  products
productcount
users
userscount
stores
storescount
orders 
orderscount

picture: String[] = [];
  emptyarray;
  productIconPath = 'assets/icon/book.png';
  skeletonlist = [1, 2, 3, 4, 5];
image;

name;
  constructor(
    private router: Router,
    private ordersService:OrdersService,
    private userService:UserService,
    private storesService:StoresService,
    private productsService: ProductsService,
    private modalController: ModalController,
    private alertController: AlertController,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    try{
   //   console.log('before gett all');
      this.getAllproducts();
      this.getAllStores();
      this.getAllOrders();
      this.getAllUsers();
  }
  
    catch ( ERROR)
  {
console.log("error in products fetching", Error);
  }
}
 
showorders(){
this.router.navigateByUrl("/neworder");
}
showstores(){

  this.router.navigateByUrl("/stores");
}
showusers(){

  this.router.navigateByUrl("/users");
}
showproducts(){

  this.router.navigateByUrl("/products");
}

async getAllStores(){

  const observable = await this.storesService.getAllStores();
  observable.subscribe(
    data => {
      this.stores = data.data.docs;
      this.loading = false;
      if(this.stores===null||this.stores===undefined){
        this.storescount=0;
      }
      else{
         this.storescount=this.stores.length;
      
      }
    
    },
    err => {
      console.log('gett all err', err);
    }
  );
}



      async getAllOrders(){

        const observable = await this.ordersService.getAllOrders();
        observable.subscribe(
          data => {
            this.orders = data.data.docs;
            this.loading = false;
            if(this.orders===null||this.orders===undefined){
              this.orderscount=0;
            }
            else{
              this.orderscount=this.orders.length;
            }
        
          },
          err => {
            console.log('gett all err', err);
          }
        );
      }
      
    
      async getAllUsers(){


        const observable = await this.userService.getallUsers();
        observable.subscribe(
          data => {
            this.users = data.data.docs;
            this.loading = false;
            if(this.users===null||this.users===undefined){
              this.userscount=0;
            }
            else{
              this.userscount=this.users.length;
            }
        
          },
          err => {
            console.log('gett all err', err);
          }
        );
      }
      
    
  async getAllproducts() {
    this.loading = true;

    const observable = await this.productsService.getAllProducts();
    observable.subscribe(
      data => {
        this.products = data.data.docs;
        this.loading = false;
        if(this.products===null||this.products===undefined){
          this.productcount=0;
    //      console.log("pro count",this.productcount);
        }
        else{
          this.productcount=this.products.length;
      //    console.log("pro count",this.productcount);
        }
        
      },
      err => {
        console.log('gett all err', err);
      }
    );
  }
  

}
