import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class cartService {
  private cart = [];
  //cart: any[] = [];
  private cartItemCount = new BehaviorSubject(0);
  constructor(private router: Router) {}

  getCart() {
    return this.cart;
  }
  resetCart(){
    this.cart.length=0;
    this.cartItemCount.next(this.cartItemCount.value*0);
    //this.cartItemCount=new BehaviorSubject(0);
  }
  getCartItemCount() {
    return this.cartItemCount;
  }
  addCart(cart) {
    let added = false;
    for (let c of this.cart) {
      if (c._id === cart._id) {
        c.amount += 1;
        added = true;
        break;
      }
    }
    if(!added){
cart.amount=1;
this.cart.push(cart);
    }
    this.cartItemCount.next(this.cartItemCount.value+1);
}
decreaseCart(cart){
    for(let[index,c] of this.cart.entries()){
        if(c._id===cart._id){
            c.amount-=1;
            this.cartItemCount.next(this.cartItemCount.value-c.amount);
            if(c.amount==0){
                this.cart.splice(index,1);   
                 this.cartItemCount.next(this.cartItemCount.value*0);
            }
        }
    }
}
removeCart(cart){
    for(let [index,c] of this.cart.entries()){
        if(c._id===cart._id){
        this.cartItemCount.next(this.cartItemCount.value-c.amount);
            this.cart.splice(index,1);
        }
    }
}
readCart(){
this.router.navigate(['cart']);
}
  }

