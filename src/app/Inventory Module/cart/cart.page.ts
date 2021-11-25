import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/sdk/core/auth.service';
import { cartService } from 'src/sdk/custom/cart.service';
import { ProjectConfig } from 'src/sdk/Project.config';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
cart=[];
baseimageurl  =   ProjectConfig.getPath()+"//uploadproduct//";
constructor(private cartService:cartService,
  private router:Router, private authService:AuthService) { }

  ngOnInit() {
  this.cart=this.cartService.getCart();
  }

  decreaseCartItem(product){
    this.cartService.decreaseCart(product);
  }

  
  increaseCartItem(product){
    this.cartService.addCart(product);
  }

  
  removeCartItem(product){
    this.cartService.removeCart(product);
  }

  getTotal(){
    return this.cart.reduce((i,j)=>i+j.price*j.amount,0);
  }

  checkoutbtn(){
    const total='total';
    const totalamount=this.getTotal()
   // console.log("total amount = " ,totalamount);
    this.authService.saveTokenToStorage(total,totalamount);
 //   console.log("token saved");
    this.router.navigateByUrl('/checkout');

  }
}
