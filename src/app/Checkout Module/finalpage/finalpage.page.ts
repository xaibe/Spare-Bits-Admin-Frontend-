import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/sdk/core/auth.service';
import { Router } from '@angular/router';
import { OrdersService } from 'src/sdk/core/orders.service';
import { cartService } from 'src/sdk/custom/cart.service';
@Component({
  selector: 'app-finalpage',
  templateUrl: './finalpage.page.html',
  styleUrls: ['./finalpage.page.scss'],
})
export class FinalpagePage implements OnInit {

Ordid;
Email;
orders: [];
  constructor( private router :Router,
     private authService:AuthService,
     private cartService:cartService,
     private ordersService: OrdersService) { 
  }

  ngOnInit() {
  this.getdatafromstorage();
  this.cartService.resetCart();
  }

  gotohome(){
    this.router.navigateByUrl('/home');
  }
  gotoorders(){
    this.router.navigateByUrl('/orders');
  }

  async getOrders(id) {

    //const observable = await this.productsService.getAllProducts();
    const observable = await this.ordersService.filterOrder(id);
    observable.subscribe(
   async data => {
        this.orders = data.data;
    //    console.log('Data Received', data);

      //  console.log('Filtered Orders ', this.orders);
       
      },
      err => {
        console.log('gett filter err', err);
      }
    );
  }

  getdatafromstorage(){
    const ordid='ordid';
    this.authService.getTokenFromStorage(ordid).then(data => {
 
     this.Ordid = data;
      //  console.log('fetched order id',this.Ordid);
        const ordid='ordid';
      
        this.getOrders(this.Ordid);  

      })
      .catch(error => { console.log('fethching order id error',error) });
  
const semail='email';
  this.authService.getTokenFromStorage(semail).then(data => {
 
    this.Email = data;
      // console.log('fetched email',this.Email);
     })
     .catch(error => { console.log('fethching email error',error) });
 }

}
