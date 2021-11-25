import { Component, OnInit } from '@angular/core';
import { cartService } from 'src/sdk/custom/cart.service';
import { ProjectConfig } from 'src/sdk/Project.config';
import { AuthService } from 'src/sdk/core/auth.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/sdk/core/user.service';
import { OrdersService } from 'src/sdk/core/orders.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/sdk/custom/toast.service';
import { ProductsService } from 'src/sdk/core/products.service';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cart=[];
  Total;
  public default:boolean= true;
  BuyerEmail;
  baseimageurl;
  radiobtn;
  hid:Boolean;
buyerAddress;
buyerphone;
currentdate;
date;
datetime;
time; 
amOrPm;

CheckoutForm: FormGroup;

 
    constructor(private cartservice:cartService,
    private authService:AuthService,
    private userService:UserService,
    private router:Router,
    private appComponent:AppComponent,
    private toastService:ToastService,
    private ordersService:OrdersService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.formInitializer();
    this.baseimageurl  =   ProjectConfig.getPath()+"//uploadproduct//";
    this.cart=this.cartservice.getCart();
   // console.log("cart=",this.cart);
    this.getdatafromstorage();
  this.hid=true;
  }
  
  formInitializer() {
    this.CheckoutForm = this.formBuilder.group({
       Address: [null, [Validators.required]],
      phone:['', [Validators.required, Validators.minLength(11)]],
      easyphone:['', [Validators.required, Validators.minLength(11)]],
    });
  }
 getDateTime(){
this.currentdate = new Date(); 
 console.log("currentdate = ", this.currentdate)
 this.date =   this.currentdate.getDate() + "/"
               + (this.currentdate.getMonth()+1)  + "/" 
               + this.currentdate.getFullYear();

             
     this.time= this.twelveHours() + ":"  
               + this.currentdate.getMinutes() + ":" 
               + this.currentdate.getSeconds() +" " + this.amOrPm ;

//  console.log("date = ", this.date);
// console.log("time = ", this.time);
}

twelveHours (){
    if(this.currentdate.getHours() > 12)
    {
        this.amOrPm = 'PM';
        let twentyFourHourTime = this.currentdate.getHours();
        let conversion = twentyFourHourTime - 12;
        return `${conversion}`

    }else {
        this.amOrPm = 'AM';
        return `${this.currentdate.getHours()}`}
};

  Paynow(){
//need to check if payment method is cash or easypaisay if easypaisa then deduct the amount from easypaisa account using given number
    this.getDateTime();
    let productname;
    let ordertoemail;
    let orderbyemail;
    let Address;
    let Phonenumber; 
    let TotalAmount;
    let productCount;
    let paymentType ;
    let date ;
    let Time;
let confirm;
    for(let pro of this.cart){

        orderbyemail=this.BuyerEmail;
      

      if (this.default===true)
      {
        Address=this.buyerAddress;
        Phonenumber=this.buyerphone;
   //   console.log("address",Address);
    //  console.log("phone",Phonenumber);
      }
      else{
          Address=this.CheckoutForm.value['Address']; 
       Phonenumber =this.CheckoutForm.value['phone'];   
      //   console.log("address",Address);
        // console.log("phone",Phonenumber);
      }
      ordertoemail=pro.email;  
      productname=pro.name;
      productCount=pro.amount;
      TotalAmount=productCount*pro.price;
   
    var obj = {  orderbyemail: orderbyemail,Address:Address,
                 Phonenumber:Phonenumber,confirm:false,cancelled:false,
                 Delivered:false,mainimage:pro.mainimage,
                 ordertoemail:ordertoemail,
                  productname:productname,TotalAmount:TotalAmount,
                  productCount:productCount,paymentType:this.radiobtn,
                  Date:this.date,Time:this.time

}
if(orderbyemail===ordertoemail){
  const msg = "Failed! Can't order your own product";
  this.toastService.presenterrorToast(msg);       
  this.cartservice.resetCart();
  this.router.navigateByUrl('/home');    
}
else{
// console.log("obj=",obj);
    this.createorder(obj);
}
      };
  
}


async createorder(obj )
{
  const observable = await this.ordersService.CreateOrder(obj);
  observable.subscribe(
    data => {
   //   console.log('data', data);
      const msg = "Success! Product ordered Successfully.";
      this.toastService.presentpositiveToast(msg);       
      
  const Ordid='ordid';
  this.authService.saveTokenToStorage(Ordid,data._id);   
  this.router.navigateByUrl('/finalpage');
    

    },
    err => {
     // console.log('create order err', err);
      this.toastService.presenterrorToast(err.error.messag); 
      this.router.navigateByUrl('/cart');  
    }
  );
 
}

radioGroupChange(event) {
//  console.log("radioGroupChange", event.target.value);
   this.radiobtn = event.target.value;
   if(this.radiobtn==="easypaisa"){
     this.hid=false;
   }
   else{
     this.hid=true;
   }
}

   getdatafromstorage(){
     const total='total';
     this.authService.getTokenFromStorage(total).then(data => {
      this.getemail();
      this.Total = data;
  //       console.log('fetched Total',this.Total);
       })
       .catch(error => { console.log('fethching error',error) });
   }

async getuserdata(){
  const observable = await this.userService.getSingleUser(this.BuyerEmail);
  observable.subscribe(
    data => {
    //  console.log('data', data);
     this.buyerAddress=data.data.address;
    // console.log("address",this.buyerAddress);
     this.buyerphone=data.data.mnumber;
    
    },
    err => {
      console.log('gett all err', err);
    }
  );
 
 
}

 getemail(){
  const semail='email';
  this.authService.getTokenFromStorage(semail).then(data => {
    this.BuyerEmail = data;
// console.log('fetched BuyerEmail',this.BuyerEmail);

this.getuserdata();

})
   .catch(error => { console.log('fethching error',error) });
}

  
  change(){
   if( this.default===false){
    this.CheckoutForm.reset();
    this.default=true;}
    else{
      this.default=false;
    }
  }


}
