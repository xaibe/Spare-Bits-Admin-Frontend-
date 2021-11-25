import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/sdk/core/orders.service';
import { AuthService } from 'src/sdk/core/auth.service';
import { Router } from '@angular/router';
import { ProductsService } from 'src/sdk/core/products.service';
import { ProjectConfig } from 'src/sdk/Project.config';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders
  products
  ordersBackup:  [];
  searchArray: [];
  emptyarray;
  loading
proid
totalorders
proname
proimages
baseimageurl  =   ProjectConfig.getPath()+"//uploadproduct//";
  constructor(
    private productsService:ProductsService,
    private router:Router,
private authService:AuthService,
    private ordersService: OrdersService
  ) { }


  ngOnInit() {
    
     // console.log('before gett all');
      this.getproductidfromstorage();
  }

mySearch(ev:any){
  this.orders=this.ordersBackup;
  this.emptyarray="";
  const search=ev.target.value;

if(search&& search.trim() !='')
{
this.searchArray=this.orders.filter((item)=>{
  return(item._id.toLowerCase().indexOf(search.toLowerCase())>-1);
})
if (this.searchArray.length == 0) {
  // console.log("empty array",this.searchArray);
   this.emptyarray="Can't Find Any Match ";
   this.orders=this.searchArray;
     this.loading=false;
   }
   
  else{
     this.orders=this.searchArray;
 //    console.log("order found",this.orders);
   }
}
else{

//  console.log("empty searchbox",search);
this.orders=this.ordersBackup;
  this.loading=false;

}

}
getproductidfromstorage(){
  const productidfororders="showproductorders";
  this.authService.getTokenFromStorage(productidfororders).then(data => {
   this.proid=data;
  // console.log("recieved product id",this.proid);
this.getproduct();     
    })
    .catch(error => { console.log('fethching error',error) });
  }

  async deleteorder(_id){
const observable=await this.ordersService.deleteOrder(_id);
observable.subscribe(
  data => 
 {
this.ngOnInit();
 },
 err=>{
   console.log("deleting order error",err);
 }   
    );

  }
    async getproduct(){
    //  console.log('gettall products entered');
      //this.loading = true;
  
      const observable = await this.productsService.filterProductbyid(this.proid);
      observable.subscribe(
        data => {
          this.products = data.data;
      //    console.log('product data recieved', data);
 // console.log('products', this.products);
this.proimages=this.products.image_url;     
this.proname=this.products.name;     
this.getorders();
},
        err => {
          console.log('gett all err', err);
        }
      );
    }
  
    onChange(event){
      this.orders=this.ordersBackup;
   //   console.log("event value",event.target.value);
      if(event.target.value==="1"){
        this.orders=this.orders.filter(e=>e.confirm===false); 
        this.orders=this.orders.filter(e=>e.cancelled===false); 

      }else
       if(event.target.value==="2"){
        
        this.orders=this.orders.filter(e=>e.confirm===true); 
        this.orders=this.orders.filter(e=>e.Delivered===false); 
        this.orders=this.orders.filter(e=>e.cancelled===false); 

      }
      else
       if(event.target.value==="3"){ 
        this.orders=this.orders.filter(e=>e.cancelled===true); 

      }else
     if(event.target.value==="4"){
       console.log("delivered reached",this.orders);
       
        this.orders=this.orders.filter(e=>e.confirm===true); 
        this.orders=this.orders.filter(e=>e.Delivered===true); 
      }

  
  }

    async getorders(){
     // console.log('gettall orders entered');
      //this.loading = true;
  
      const observable = await this.ordersService.filterOrderbyproid(this.proid)
      observable.subscribe(
        data => {
          this.orders = data.data;
          this.totalorders=this.orders.length;
          this.ordersBackup=this.orders;
       //   console.log('orders data recieved', data);
 // console.log('orders', this.orders);
        },
        err => {
          console.log('gett all err', err);
        }
      );
    }


}
